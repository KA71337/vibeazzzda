import 'server-only';
import {createHmac,randomBytes,timingSafeEqual,createHash} from 'node:crypto';
import {cookies} from 'next/headers';
import {NextRequest,NextResponse} from 'next/server';
import {getAuthConfig} from './config';
const COOKIE='vibe_admin_session', HOURS=8;
type Session={exp:number;csrf:string};
const b64=(v:Buffer|string)=>Buffer.from(v).toString('base64url');
const sign=(v:string,s:string)=>b64(createHmac('sha256',s).update(v).digest());
export function safeEqual(a:string,b:string){const x=createHash('sha256').update(a).digest(),y=createHash('sha256').update(b).digest();return timingSafeEqual(x,y)}
export function newSession(secret:string){const value=b64(JSON.stringify({exp:Date.now()+HOURS*3600_000,csrf:b64(randomBytes(24))}));return {token:value+'.'+sign(value,secret),data:JSON.parse(Buffer.from(value,'base64url').toString()) as Session}}
export function decodeSession(token:string|undefined,secret:string){if(!token)return null;const [v,s]=token.split('.');if(!v||!s||!safeEqual(s,sign(v,secret)))return null;try{const d=JSON.parse(Buffer.from(v,'base64url').toString()) as Session;return d.exp>Date.now()?d:null}catch{return null}}
export async function currentSession(){const c=getAuthConfig();if(!c)return null;return decodeSession((await cookies()).get(COOKIE)?.value,c.sessionSecret)}
export function setSession(res:NextResponse,token:string){res.cookies.set(COOKIE,token,{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:HOURS*3600})}
export function clearSession(res:NextResponse){res.cookies.set(COOKIE,'',{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:0})}
const attempts=new Map<string,{n:number;until:number}>();
export function throttle(key:string,limit=8,windowMs=60_000){const now=Date.now(),v=attempts.get(key);if(!v||v.until<now){attempts.set(key,{n:1,until:now+windowMs});return false}v.n++;return v.n>limit}
export function clientKey(req:NextRequest){return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown'}
export async function protectMutation(req:NextRequest){const cfg=getAuthConfig();if(!cfg)return 'Сервер не настроен';const origin=req.headers.get('origin'),host=req.headers.get('host'),forwardedProto=req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim(),expectedProtocol=forwardedProto||(process.env.NODE_ENV==='production'?'https':'http');let parsed:URL;try{parsed=new URL(origin||'')}catch{return 'Запрос с другого источника запрещён'}if(!host||parsed.host!==host||parsed.protocol!==expectedProtocol+':')return 'Запрос с другого источника запрещён';const session=decodeSession(req.cookies.get(COOKIE)?.value,cfg.sessionSecret);if(!session)return 'Требуется вход';if(!safeEqual(req.headers.get('x-csrf-token')||'',session.csrf))return 'Неверный CSRF-токен';return null}
export const noStore={'Cache-Control':'no-store, max-age=0','Pragma':'no-cache'};
