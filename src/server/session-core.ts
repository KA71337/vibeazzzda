import {createHash,createHmac,randomBytes,timingSafeEqual} from 'node:crypto';

export const SESSION_HOURS=8;
export type Session={exp:number;csrf:string};
const MAX_TOKEN_LENGTH=1024,CSRF_PATTERN=/^[A-Za-z0-9_-]{32}$/;
const b64=(value:Buffer|string)=>Buffer.from(value).toString('base64url');
const sign=(value:string,secret:string)=>b64(createHmac('sha256',secret).update(value).digest());

export function safeEqual(left:string,right:string):boolean{
 const a=createHash('sha256').update(left).digest(),b=createHash('sha256').update(right).digest();
 return timingSafeEqual(a,b);
}

export function newSession(secret:string,now=Date.now()){
 const data:Session={exp:now+SESSION_HOURS*3_600_000,csrf:b64(randomBytes(24))};
 const value=b64(JSON.stringify(data));
 return {token:`${value}.${sign(value,secret)}`,data};
}

export function decodeSession(token:string|undefined,secret:string,now=Date.now()):Session|null{
 if(!token||token.length>MAX_TOKEN_LENGTH)return null;
 const parts=token.split('.');
 if(parts.length!==2||!parts[0]||!parts[1]||!safeEqual(parts[1],sign(parts[0],secret)))return null;
 try{
  const value:unknown=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
  if(!value||typeof value!=='object'||Array.isArray(value))return null;
  const session=value as Record<string,unknown>,keys=Object.keys(session);
  if(keys.length!==2||!keys.includes('exp')||!keys.includes('csrf'))return null;
  if(typeof session.exp!=='number'||!Number.isSafeInteger(session.exp)||session.exp<=now)return null;
  if(typeof session.csrf!=='string'||!CSRF_PATTERN.test(session.csrf))return null;
  return {exp:session.exp,csrf:session.csrf};
 }catch{return null}
}
