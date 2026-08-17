import 'server-only';
import {createHash} from 'node:crypto';
import {cookies} from 'next/headers';
import {NextRequest,NextResponse} from 'next/server';
import {getAuthConfig} from './config';
import {decodeSession,newSession,safeEqual,SESSION_HOURS} from './session-core';

const COOKIE='vibe_admin_session';
const attempts=new Map<string,{count:number;until:number}>();

export {decodeSession,newSession,safeEqual};

export async function currentSession(){
 const config=getAuthConfig();
 if(!config)return null;
 return decodeSession((await cookies()).get(COOKIE)?.value,config.sessionSecret);
}

const cookieOptions={httpOnly:true,sameSite:'strict' as const,secure:process.env.NODE_ENV==='production',path:'/',priority:'high' as const};
export function setSession(response:NextResponse,token:string){response.cookies.set(COOKIE,token,{...cookieOptions,maxAge:SESSION_HOURS*3600})}
export function clearSession(response:NextResponse){response.cookies.set(COOKIE,'',{...cookieOptions,maxAge:0})}

function pruneAttempts(now:number){
 if(attempts.size<5000)return;
 for(const[key,value]of attempts)if(value.until<=now)attempts.delete(key);
 while(attempts.size>7500){const first=attempts.keys().next().value as string|undefined;if(!first)break;attempts.delete(first)}
}

export function throttle(key:string,limit=8,windowMs=60_000){
 const now=Date.now();pruneAttempts(now);
 const value=attempts.get(key);
 if(!value||value.until<=now){attempts.set(key,{count:1,until:now+windowMs});return false}
 value.count++;
 return value.count>limit;
}

export function clientKey(request:NextRequest){
 const forwarded=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||request.headers.get('x-real-ip')||'unknown';
 const address=forwarded.split(',')[0]?.trim().slice(0,128)||'unknown';
 return createHash('sha256').update(address).digest('base64url');
}

export function sameOriginError(request:NextRequest):string|null{
 const origin=request.headers.get('origin');
 const forwardedHost=(request.headers.get('x-forwarded-host')||request.headers.get('host')||'').split(',')[0]?.trim();
 const forwardedProto=(request.headers.get('x-forwarded-proto')||'').split(',')[0]?.trim();
 const protocol=forwardedProto||(process.env.NODE_ENV==='production'?'https':'http');
 if(!origin||!forwardedHost||!/^https?$/.test(protocol))return 'Sorğunun mənbəyi təsdiqlənmədi';
 try{if(new URL(origin).origin!==new URL(`${protocol}://${forwardedHost}`).origin)return 'Başqa mənbədən sorğuya icazə verilmir'}catch{return 'Sorğunun mənbəyi təsdiqlənmədi'}
 return null;
}

export async function protectMutation(request:NextRequest){
 const originError=sameOriginError(request);if(originError)return originError;
 const config=getAuthConfig();if(!config)return 'Server konfiqurasiya edilməyib';
 const session=decodeSession(request.cookies.get(COOKIE)?.value,config.sessionSecret);if(!session)return 'Giriş tələb olunur';
 if(!safeEqual(request.headers.get('x-csrf-token')||'',session.csrf))return 'Yanlış CSRF tokeni';
 return null;
}

export function bodyTooLarge(request:NextRequest,maxBytes:number):boolean{
 const header=request.headers.get('content-length');
 if(!header)return false;
 if(!/^\d{1,12}$/.test(header))return true;
 return Number(header)>maxBytes;
}

export async function readTextLimited(request:NextRequest,maxBytes:number):Promise<string|null>{
 if(bodyTooLarge(request,maxBytes)||!request.body)return null;
 const reader=request.body.getReader(),decoder=new TextDecoder('utf-8',{fatal:true});let total=0,text='';
 try{
  while(true){const{done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();return null}text+=decoder.decode(value,{stream:true})}
  text+=decoder.decode();return text;
 }catch{return null}finally{reader.releaseLock()}
}

export const noStore={'Cache-Control':'no-store, max-age=0, must-revalidate','Pragma':'no-cache','Expires':'0'};
