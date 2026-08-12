import 'server-only';
import {randomUUID} from 'node:crypto';
import type {Product} from '@/data/products';
export const MAX_FILES=8,MAX_FILE=3145728,MAX_TOTAL=4194304;
export function validateProduct(v:unknown):Product {
 if(!v||typeof v!=='object') throw new Error('╨Э╨╡╨▓╨╡╤А╨╜╤Л╨╡ ╨┤╨░╨╜╨╜╤Л╨╡');
 const x=v as Record<string,unknown>; const id=Number(x.id),price=Number(x.price),np=x.newPrice===null||x.newPrice===''?null:Number(x.newPrice);
 if(!Number.isSafeInteger(id)||id<=0) throw new Error('ID ╨┤╨╛╨╗╨╢╨╡╨╜ ╨▒╤Л╤В╤М ╨┐╨╛╨╗╨╛╨╢╨╕╤В╨╡╨╗╤М╨╜╤Л╨╝ ╤Ж╨╡╨╗╤Л╨╝ ╤З╨╕╤Б╨╗╨╛╨╝');
 if(typeof x.name!=='string'||!x.name.trim()||x.name.length>160) throw new Error('╨Я╤А╨╛╨▓╨╡╤А╤М╤В╨╡ ╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡');
 if(!Number.isFinite(price)||price<0||price>1e9||np!==null&&(!Number.isFinite(np)||np<0||np>1e9)) throw new Error('╨Я╤А╨╛╨▓╨╡╤А╤М╤В╨╡ ╤Ж╨╡╨╜╤Г');
 if(typeof x.description!=='string'||x.description.length>10000) throw new Error('╨Ю╨┐╨╕╤Б╨░╨╜╨╕╨╡ ╤Б╨╗╨╕╤И╨║╨╛╨╝ ╨┤╨╗╨╕╨╜╨╜╨╛╨╡');
 if(typeof x.link!=='string'||x.link.length>2048||(x.link&&!x.link.startsWith('/')&&!/^https:\/\//.test(x.link))) throw new Error('╨Э╨╡╨┤╨╛╨┐╤Г╤Б╤В╨╕╨╝╨░╤П ╤Б╤Б╤Л╨╗╨║╨░');
 if(!Array.isArray(x.images)||x.images.some(i=>typeof i!=='string'||i.length>2048||(!i.startsWith('/')&&!/^https:\/\//.test(i)))) throw new Error('╨Э╨╡╨┤╨╛╨┐╤Г╤Б╤В╨╕╨╝╤Л╨╡ ╨╕╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╨╕╤П');
 return {id,name:x.name.trim(),price,newPrice:np,description:x.description,link:x.link,images:x.images as string[]};
}
const signatures=[['image/jpeg',[0xff,0xd8,0xff]],['image/png',[0x89,0x50,0x4e,0x47]],['image/webp',[0x52,0x49,0x46,0x46]]] as const;
export async function validateFiles(files:File[]){if(files.length>MAX_FILES)throw new Error('Максимум 8 файлов');if(files.reduce((n,f)=>n+f.size,0)>MAX_TOTAL)throw new Error('Общий размер больше 4 МБ');return Promise.all(files.map(async(f,i)=>{if(f.size>MAX_FILE)throw new Error('Файл больше 3 МБ');const bytes=new Uint8Array(await f.arrayBuffer());const hit=signatures.find(([mime,s])=>f.type===mime&&s.every((b,j)=>bytes[j]===b));if(!hit||(f.type==='image/webp'&&String.fromCharCode(...bytes.slice(8,12))!=='WEBP'))throw new Error('Разрешены только настоящие JPG, PNG и WEBP');const ext=f.type==='image/jpeg'?'jpg':f.type.split('/')[1],name=Date.now()+'-'+i+'-'+randomUUID()+'.'+ext;return {bytes,path:'public/products/admin/'+name,url:'/products/admin/'+name}}))}
