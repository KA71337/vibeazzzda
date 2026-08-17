import 'server-only';
import type {Product} from '@/data/products';
import {getCatalogConfig} from './config';
import {validateCatalog} from './products-validation';

type Change={path:string;content?:Uint8Array|string;delete?:boolean};
type JsonRecord=Record<string,unknown>;
const SHA=/^[0-9a-f]{40}$/;
const MAX_CATALOG_BYTES=1_500_000;

function serviceError(message='Kataloq xidməti müvəqqəti əlçatan deyil',status=502){return Object.assign(new Error(message),{status})}
function record(value:unknown):JsonRecord{if(!value||typeof value!=='object'||Array.isArray(value))throw serviceError();return value as JsonRecord}
function property(value:unknown,key:string):unknown{return record(value)[key]}
function safeRepoPath(path:string):boolean{return !path.startsWith('/')&&!path.includes('..')&&!path.includes('\\')&&/^[A-Za-z0-9._/-]{1,260}$/.test(path)}

async function github(path:string,init:RequestInit={}):Promise<unknown>{
 const config=getCatalogConfig();if(!config)throw serviceError('Kataloq serverdə konfiqurasiya edilməyib',503);
 let response:Response;
 try{
  response=await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}${path}`,{...init,headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${config.githubToken}`,'X-GitHub-Api-Version':'2022-11-28',...init.headers},cache:'no-store'});
 }catch(error){console.error('GitHub catalog request failed',{path,error:error instanceof Error?error.name:'unknown'});throw serviceError()}
 if(!response.ok){console.error('GitHub catalog response failed',{path,status:response.status});if(response.status===409||response.status===422)throw serviceError('Kataloq dəyişdirilib. Səhifəni yeniləyin.',409);throw serviceError()}
 try{return await response.json()}catch{console.error('GitHub catalog returned invalid JSON',{path,status:response.status});throw serviceError()}
}

export async function readProducts(){
 const config=getCatalogConfig();if(!config)throw serviceError('Kataloq serverdə konfiqurasiya edilməyib',503);
 const ref=await github(`/git/ref/heads/${encodeURIComponent(config.branch)}`);
 const revision=property(property(ref,'object'),'sha');
 if(typeof revision!=='string'||!SHA.test(revision))throw serviceError();
 const file=record(await github(`/contents/${config.productsPath}?ref=${encodeURIComponent(config.branch)}`));
 if(file.encoding!=='base64'||typeof file.content!=='string'||file.content.length>MAX_CATALOG_BYTES*2)throw serviceError();
 const buffer=Buffer.from(file.content.replace(/\n/g,''),'base64');
 if(buffer.length>MAX_CATALOG_BYTES)throw serviceError();
 try{return {products:validateCatalog(JSON.parse(buffer.toString('utf8'))),revision}}
 catch(error){console.error('GitHub catalog validation failed',{error:error instanceof Error?error.message:'unknown'});throw serviceError()}
}

export async function atomicCommit(expected:string,products:Product[],extra:Change[],message:string){
 const config=getCatalogConfig();if(!config)throw serviceError('Kataloq serverdə konfiqurasiya edilməyib',503);
 if(!SHA.test(expected)||!safeRepoPath(config.productsPath)||extra.some(change=>!safeRepoPath(change.path)))throw serviceError('Yanlış kataloq sorğusu',400);
 const normalized=validateCatalog(products);
 const ref=await github(`/git/ref/heads/${encodeURIComponent(config.branch)}`);
 const current=property(property(ref,'object'),'sha');
 if(current!==expected)throw serviceError('Kataloq dəyişdirilib. Səhifəni yeniləyin.',409);
 const parent=await github(`/git/commits/${expected}`),baseTree=property(property(parent,'tree'),'sha');
 if(typeof baseTree!=='string'||!SHA.test(baseTree))throw serviceError();
 const changes:Change[]=[{path:config.productsPath,content:JSON.stringify(normalized,null,2)+'\n'},...extra];
 const tree=[];
 for(const change of changes){
  if(change.delete){tree.push({path:change.path,mode:'100644',type:'blob',sha:null});continue}
  if(change.content===undefined)throw serviceError('Yanlış kataloq sorğusu',400);
  const blob=await github('/git/blobs',{method:'POST',body:JSON.stringify({content:Buffer.from(change.content).toString('base64'),encoding:'base64'}),headers:{'Content-Type':'application/json'}});
  const sha=property(blob,'sha');if(typeof sha!=='string'||!SHA.test(sha))throw serviceError();
  tree.push({path:change.path,mode:'100644',type:'blob',sha});
 }
 const treeResult=await github('/git/trees',{method:'POST',body:JSON.stringify({base_tree:baseTree,tree}),headers:{'Content-Type':'application/json'}}),treeSha=property(treeResult,'sha');
 if(typeof treeSha!=='string'||!SHA.test(treeSha))throw serviceError();
 const commitResult=await github('/git/commits',{method:'POST',body:JSON.stringify({message:message.slice(0,160),tree:treeSha,parents:[expected]}),headers:{'Content-Type':'application/json'}}),commitSha=property(commitResult,'sha');
 if(typeof commitSha!=='string'||!SHA.test(commitSha))throw serviceError();
 await github(`/git/refs/heads/${encodeURIComponent(config.branch)}`,{method:'PATCH',body:JSON.stringify({sha:commitSha,force:false}),headers:{'Content-Type':'application/json'}});
 return commitSha;
}
