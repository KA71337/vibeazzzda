import {NextRequest,NextResponse} from 'next/server';
import {getCatalogConfig} from '@/server/config';
import {atomicCommit,readProducts,readSales} from '@/server/github';
import {cancelSale,completeSale,PosError,type SaleRequestItem} from '@/server/pos-core';
import {SalesValidationError} from '@/server/sales-validation';
import {clientKey,currentSession,noStore,protectMutation,readTextLimited,throttle} from '@/server/security';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const MAX_BODY=32_000;
const out=(value:unknown,status=200)=>NextResponse.json(value,{status,headers:noStore});

function fail(error:unknown){
 const value=error as Error&{status?:number};
 const explicit=Number.isInteger(value.status)&&value.status!>=400&&value.status!<600;
 const status=explicit?value.status!:error instanceof PosError||error instanceof SalesValidationError?400:500;
 if(status>=500)console.error('Admin sales request failed',{status,error:value.name||'Error'});
 return out({error:status>=500?'Satış xidməti müvəqqəti əlçatan deyil':value.message||'Satış yaradıla bilmədi'},status);
}

async function jsonBody(request:NextRequest):Promise<Record<string,unknown>>{
 if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))throw new PosError('Yanlış sorğu formatı',415);
 const text=await readTextLimited(request,MAX_BODY);if(text===null)throw new PosError('Sorğu həcmi çox böyükdür',413);
 let value:unknown;try{value=JSON.parse(text)}catch{throw new PosError('Yanlış sorğu məlumatı')}
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.getPrototypeOf(value)!==Object.prototype)throw new PosError('Yanlış sorğu məlumatı');
 return value as Record<string,unknown>;
}

function createItems(value:Record<string,unknown>):SaleRequestItem[]{
 if(Object.keys(value).length!==1||!Array.isArray(value.items))throw new PosError('Yanlış satış məlumatı');
 return value.items.map(item=>{
  if(!item||typeof item!=='object'||Array.isArray(item)||Object.getPrototypeOf(item)!==Object.prototype)throw new PosError('Məhsul miqdarını yoxlayın');
  const input=item as Record<string,unknown>,keys=Object.keys(input);if(keys.length!==2||!keys.includes('productId')||!keys.includes('quantity'))throw new PosError('Məhsul miqdarını yoxlayın');
  return {productId:input.productId as number,quantity:input.quantity as number};
 });
}

export async function GET(request:NextRequest){
 if(!await currentSession())return out({error:'Giriş tələb olunur'},401);
 if(throttle(`sales-read:${clientKey(request)}`,120,60_000))return out({error:'Həddindən çox sorğu'},429);
 try{
  const current=await readProducts(),sales=await readSales(current.revision);
  return out({sales:sales.store.sales,stockHistory:sales.store.stockHistory,revision:current.revision});
 }catch(error){return fail(error)}
}

export async function POST(request:NextRequest){
 const denied=await protectMutation(request);if(denied)return out({error:denied},403);
 if(throttle(`sales-create:${clientKey(request)}`,30,60_000))return out({error:'Həddindən çox sorğu'},429);
 try{
  const items=createItems(await jsonBody(request)),current=await readProducts(),sales=await readSales(current.revision),result=completeSale(current.products,sales.store,items),config=getCatalogConfig();
  if(!config)throw new PosError('Kataloq serverdə konfiqurasiya edilməyib',503);
  const revision=await atomicCommit(current.revision,result.products,[{path:config.salesPath,content:JSON.stringify(result.store,null,2)+'\n'}],`admin: POS sale #${result.sale.id}`);
  return out({ok:true,sale:result.sale,revision});
 }catch(error){return fail(error)}
}

export async function PATCH(request:NextRequest){
 const denied=await protectMutation(request);if(denied)return out({error:denied},403);
 if(throttle(`sales-cancel:${clientKey(request)}`,20,60_000))return out({error:'Həddindən çox sorğu'},429);
 try{
  const value=await jsonBody(request);if(Object.keys(value).length!==1||!Object.hasOwn(value,'saleId'))throw new PosError('Yanlış satış məlumatı');
  const current=await readProducts(),sales=await readSales(current.revision),result=cancelSale(current.products,sales.store,value.saleId as number),config=getCatalogConfig();
  if(!config)throw new PosError('Kataloq serverdə konfiqurasiya edilməyib',503);
  const revision=await atomicCommit(current.revision,result.products,[{path:config.salesPath,content:JSON.stringify(result.store,null,2)+'\n'}],`admin: cancel POS sale #${result.sale.id}`);
  return out({ok:true,sale:result.sale,revision});
 }catch(error){return fail(error)}
}
