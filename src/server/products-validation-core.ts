import {randomUUID} from 'node:crypto';

export const MAX_FILES=8,MAX_FILE=3_145_728,MAX_TOTAL=4_194_304,MAX_IMAGES=20;
const PRODUCT_KEYS=new Set(['id','name','price','newPrice','description','link','images','category','inStock','stock']);
const UNSAFE_CONTROL=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export class ValidationError extends Error {
 name='ValidationError';
}

export type ValidatedProduct={
 id:number;name:string;price:number;newPrice:number|null;description:string;link:string;images:string[];category?:string;inStock:boolean;stock?:number;
};

type ProductOptions={allowLegacyStock?:boolean};

function isSafeHttpsUrl(value:string):boolean{
 try{const url=new URL(value);return url.protocol==='https:'&&!!url.hostname&&!url.username&&!url.password}catch{return false}
}

function isSafeLocalPath(value:string,prefix?:string):boolean{
 if(!value.startsWith('/')||value.startsWith('//')||value.includes('\\')||value.includes('..')||UNSAFE_CONTROL.test(value))return false;
 if(prefix&&!value.startsWith(prefix))return false;
 return /^\/[A-Za-z0-9][A-Za-z0-9._~!$&'()*+,;=:@%/-]*$/.test(value);
}

function isSafeLink(value:string):boolean{
 return value===''||isSafeHttpsUrl(value)||isSafeLocalPath(value);
}

function isSafeImage(value:string):boolean{
 return isSafeHttpsUrl(value)||isSafeLocalPath(value,'/products/');
}

export function validateProductInput(value:unknown,categoryIds:readonly string[],options:ProductOptions={}):ValidatedProduct{
 if(!value||typeof value!=='object'||Array.isArray(value))throw new ValidationError('Yanlış məlumat');
 const prototype=Object.getPrototypeOf(value);if(prototype!==Object.prototype&&prototype!==null)throw new ValidationError('Yanlış məlumat');
 const input=value as Record<string,unknown>;
 if(Object.keys(input).some(key=>!PRODUCT_KEYS.has(key)))throw new ValidationError('Gözlənilməz məhsul sahəsi');
 if(!Number.isSafeInteger(input.id)||(input.id as number)<=0)throw new ValidationError('ID müsbət tam ədəd olmalıdır');
 if(typeof input.name!=='string'||input.name.trim().length<1||input.name.length>160||UNSAFE_CONTROL.test(input.name))throw new ValidationError('Adı yoxlayın');
 if(typeof input.price!=='number'||!Number.isFinite(input.price)||input.price<0||input.price>1e9)throw new ValidationError('Qiyməti yoxlayın');
 if(input.newPrice!==null&&(typeof input.newPrice!=='number'||!Number.isFinite(input.newPrice)||input.newPrice<0||input.newPrice>1e9))throw new ValidationError('Qiyməti yoxlayın');
 if(typeof input.description!=='string'||input.description.length>10000||UNSAFE_CONTROL.test(input.description))throw new ValidationError('Təsviri yoxlayın');
 if(typeof input.link!=='string'||input.link.length>2048||input.link!==input.link.trim()||!isSafeLink(input.link))throw new ValidationError('Yolverilməz keçid');
 if(!Array.isArray(input.images)||input.images.length>MAX_IMAGES||input.images.some(image=>typeof image!=='string'||image.length>2048||image!==image.trim()||!isSafeImage(image)))throw new ValidationError('Yolverilməz şəkillər');
  const category=input.category===undefined||input.category===null||input.category===''?undefined:input.category;
  if(category!==undefined&&(typeof category!=='string'||!categoryIds.includes(category)))throw new ValidationError('Yolverilməz kateqoriya');
  const rawStock=input.stock;
  if(rawStock!==undefined&&(!Number.isSafeInteger(rawStock)||typeof rawStock!=='number'||rawStock<0||rawStock>1e9))throw new ValidationError('Stok sayı müsbət tam ədəd olmalıdır');
  const stock=rawStock===undefined?undefined:rawStock as number;
  const inStock=stock===undefined?(input.inStock===undefined&&options.allowLegacyStock?true:input.inStock):stock>0;
  if(typeof inStock!=='boolean')throw new ValidationError('Stok statusunu yoxlayın');
  return {id:input.id as number,name:input.name.trim(),price:input.price,newPrice:input.newPrice as number|null,description:input.description,link:input.link,images:[...input.images] as string[],...(category?{category}:{}),...(stock===undefined?{}:{stock}),inStock};
}

export function validateCatalogInput(value:unknown,categoryIds:readonly string[]):ValidatedProduct[]{
 if(!Array.isArray(value)||value.length>5000)throw new ValidationError('Kataloq məlumatı yanlışdır');
 const seen=new Set<number>();
 return value.map(entry=>{const product=validateProductInput(entry,categoryIds,{allowLegacyStock:true});if(seen.has(product.id))throw new ValidationError('Təkrarlanan məhsul ID-si');seen.add(product.id);return product});
}

function has(bytes:Uint8Array,offset:number,signature:readonly number[]):boolean{return signature.every((byte,index)=>bytes[offset+index]===byte)}
function ascii(bytes:Uint8Array,offset:number,length:number):string{return String.fromCharCode(...bytes.slice(offset,offset+length))}
function validJpeg(bytes:Uint8Array):boolean{return bytes.length>=4&&has(bytes,0,[0xff,0xd8,0xff])&&has(bytes,bytes.length-2,[0xff,0xd9])}
function validPng(bytes:Uint8Array):boolean{return bytes.length>=33&&has(bytes,0,[0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])&&ascii(bytes,12,4)==='IHDR'&&ascii(bytes,bytes.length-8,4)==='IEND'}
function validWebp(bytes:Uint8Array):boolean{
 if(bytes.length<20||ascii(bytes,0,4)!=='RIFF'||ascii(bytes,8,4)!=='WEBP')return false;
 const declared=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength).getUint32(4,true)+8;
 return declared===bytes.length&&['VP8 ','VP8L','VP8X'].includes(ascii(bytes,12,4));
}

const validators:Record<string,{ext:string;extensions:readonly string[];valid:(bytes:Uint8Array)=>boolean}>={
 'image/jpeg':{ext:'jpg',extensions:['jpg','jpeg'],valid:validJpeg},
 'image/png':{ext:'png',extensions:['png'],valid:validPng},
 'image/webp':{ext:'webp',extensions:['webp'],valid:validWebp},
};

export async function validateFiles(files:File[]){
 if(files.length>MAX_FILES)throw new ValidationError('Maksimum 8 fayl');
 if(files.reduce((total,file)=>total+file.size,0)>MAX_TOTAL)throw new ValidationError('Ümumi həcm 4 MB-dan çoxdur');
 return Promise.all(files.map(async(file,index)=>{
  if(file.size<4||file.size>MAX_FILE)throw new ValidationError('Fayl ölçüsünü yoxlayın');
  const validator=validators[file.type];
  if(!validator)throw new ValidationError('Yalnız JPG, PNG və WEBP fayllarına icazə verilir');
  const extension=/\.([A-Za-z0-9]+)$/.exec(file.name)?.[1].toLowerCase();
  if(!extension||!validator.extensions.includes(extension))throw new ValidationError('Fayl uzantısı və MIME növü uyğun deyil');
  const bytes=new Uint8Array(await file.arrayBuffer());
  if(bytes.length!==file.size||!validator.valid(bytes))throw new ValidationError('Şəkil faylının formatı yanlışdır');
  const name=`${Date.now()}-${index}-${randomUUID()}.${validator.ext}`;
  return {bytes,path:`public/products/admin/${name}`,url:`/products/admin/${name}`};
 }));
}
