import {NextRequest,NextResponse} from 'next/server';
import {atomicCommit,readProducts} from '@/server/github';
import {getCatalogConfig} from '@/server/config';
import {MAX_IMAGES,ValidationError,validateFiles,validateProduct} from '@/server/products-validation';
import {bodyTooLarge,clientKey,currentSession,noStore,protectMutation,throttle} from '@/server/security';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const MAX_BODY=6_000_000,MAX_PRODUCT_JSON=30_000,SHA=/^[0-9a-f]{40}$/;
const out=(value:unknown,status=200)=>NextResponse.json(value,{status,headers:noStore});

function requestError(message:string,status=400){return Object.assign(new Error(message),{status})}
function fail(error:unknown){
 const value=error as Error&{status?:number};
 const explicitStatus=Number.isInteger(value.status)&&value.status!>=400&&value.status!<600;
 const status=explicitStatus?value.status!:error instanceof ValidationError?400:500;
 const publicMessage=status>=500?'Xidmət müvəqqəti əlçatan deyil':value.message||'Sorğunu yerinə yetirmək mümkün olmadı';
 if(status>=500)console.error('Admin products request failed',{status,error:value.name||'Error'});
 return out({error:publicMessage},status);
}

async function limitedFormData(request:NextRequest):Promise<FormData>{
 if(bodyTooLarge(request,MAX_BODY))throw requestError('Sorğu həcmi çox böyükdür',413);
 const contentType=request.headers.get('content-type')||'';
 if(!/^multipart\/form-data;\s*boundary=/i.test(contentType))throw requestError('Yanlış sorğu formatı',415);
 if(!request.body)throw requestError('Boş sorğu');
 const reader=request.body.getReader(),chunks:Uint8Array[]=[];let total=0;
 try{
  while(true){const{done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>MAX_BODY){await reader.cancel();throw requestError('Sorğu həcmi çox böyükdür',413)}chunks.push(value)}
 }finally{reader.releaseLock()}
 const body=new Uint8Array(total);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.byteLength}
 return new Request(request.url,{method:'POST',headers:{'content-type':contentType},body}).formData();
}

function parsePayload(form:FormData):unknown{
 const allowed=new Set(['revision','product','images']);
 for(const key of form.keys())if(!allowed.has(key))throw requestError('Gözlənilməz sorğu sahəsi');
 const text=form.get('product');
 if(typeof text!=='string'||text.length<2||text.length>MAX_PRODUCT_JSON)throw requestError('Məhsul məlumatı yanlışdır');
 try{return JSON.parse(text)}catch{throw requestError('Məhsul məlumatı yanlışdır')}
}

function parseDeleteId(value:unknown):number{
 if(!value||typeof value!=='object'||Array.isArray(value))throw requestError('Yanlış ID');
 const input=value as Record<string,unknown>,keys=Object.keys(input);
 if(keys.length!==1||keys[0]!=='id'||!Number.isSafeInteger(input.id)||(input.id as number)<=0)throw requestError('Yanlış ID');
 return input.id as number;
}

function managedPath(url:string,prefix:string):string|null{
 if(!url.startsWith('/products/admin/'))return null;
 const path=`public${url}`;
 return path.startsWith(prefix)&&!path.includes('..')&&!path.includes('\\')&&/^[A-Za-z0-9._/-]+$/.test(path)?path:null;
}

export async function GET(request:NextRequest){
 if(!await currentSession())return out({error:'Giriş tələb olunur'},401);
 if(throttle(`read:${clientKey(request)}`,120,60_000))return out({error:'Həddindən çox sorğu'},429);
 try{return out(await readProducts())}catch(error){return fail(error)}
}

export async function POST(request:NextRequest){return mutate(request,'create')}
export async function PATCH(request:NextRequest){return mutate(request,'update')}
export async function DELETE(request:NextRequest){return mutate(request,'delete')}

async function mutate(request:NextRequest,operation:'create'|'update'|'delete'){
 const denied=await protectMutation(request);if(denied)return out({error:denied},403);
 if(throttle(`mut:${clientKey(request)}`,30,60_000))return out({error:'Həddindən çox sorğu'},429);
 try{
  const form=await limitedFormData(request),expected=String(form.get('revision')||''),raw=parsePayload(form);
  if(!SHA.test(expected))throw requestError('Yanlış reviziya');
  const imageEntries=form.getAll('images');
  if(imageEntries.some(entry=>!(entry instanceof File)))throw requestError('Yanlış şəkil məlumatı');
  const files=imageEntries as File[];
  if(operation==='delete'&&files.length)throw requestError('Silinmə sorğusunda şəkil qəbul edilmir');
  const current=await readProducts(),config=getCatalogConfig();
  if(!config)throw requestError('Kataloq serverdə konfiqurasiya edilməyib',503);
  if(current.revision!==expected)throw requestError('Kataloq dəyişdirilib. Səhifəni yeniləyin.',409);
  let list=[...current.products];const extra:{path:string;content?:Uint8Array;delete?:boolean}[]=[];
  if(operation==='delete'){
   const id=parseDeleteId(raw),removed=list.find(product=>product.id===id);
   if(!removed)throw requestError('Məhsul tapılmadı',404);
   list=list.filter(product=>product.id!==id);
   const used=new Set(list.flatMap(product=>product.images));
   for(const url of removed.images){const path=managedPath(url,config.managedPrefix);if(path&&!used.has(url))extra.push({path,delete:true})}
  }else{
   const product=validateProduct(raw),index=list.findIndex(item=>item.id===product.id);
   if(operation==='create'&&index!==-1)throw requestError('Bu ID artıq mövcuddur',409);
   if(operation==='update'&&index===-1)throw requestError('Məhsul tapılmadı',404);
   const uploads=await validateFiles(files);
   if(product.images.length+uploads.length>MAX_IMAGES)throw requestError(`Maksimum ${MAX_IMAGES} şəkil`);
   for(const upload of uploads){product.images.push(upload.url);extra.push({path:upload.path,content:upload.bytes})}
   const previous=index===-1?null:list[index];
   list=operation==='create'?[...list,product]:list.map(item=>item.id===product.id?product:item);
   if(previous){const used=new Set(list.flatMap(item=>item.images));for(const url of previous.images){const path=managedPath(url,config.managedPrefix);if(path&&!used.has(url))extra.push({path,delete:true})}}
  }
  list.sort((left,right)=>left.id-right.id);
  const revision=await atomicCommit(expected,list,extra,`admin: ${operation} product ${operation==='delete'?parseDeleteId(raw):validateProduct(raw).id}`);
  return out({ok:true,revision});
 }catch(error){return fail(error)}
}
