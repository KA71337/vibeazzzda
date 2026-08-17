import {NextRequest,NextResponse} from 'next/server';
import {getAuthConfig} from '@/server/config';
import {clientKey,newSession,noStore,readTextLimited,safeEqual,sameOriginError,setSession,throttle} from '@/server/security';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function POST(request:NextRequest){
 const originError=sameOriginError(request);if(originError)return NextResponse.json({error:originError},{status:403,headers:noStore});
 if(throttle(`login:${clientKey(request)}`,6,300_000))return NextResponse.json({error:'Həddindən çox cəhd'},{status:429,headers:noStore});
 if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))return NextResponse.json({error:'Yanlış sorğu formatı'},{status:415,headers:noStore});
 const text=await readTextLimited(request,4096);
 if(text===null)return NextResponse.json({error:'Sorğu həcmi çox böyükdür'},{status:413,headers:noStore});
 let value:unknown;try{value=JSON.parse(text)}catch{return NextResponse.json({error:'Yanlış giriş məlumatı'},{status:400,headers:noStore})}
 if(!value||typeof value!=='object'||Array.isArray(value))return NextResponse.json({error:'Yanlış giriş məlumatı'},{status:400,headers:noStore});
 const input=value as Record<string,unknown>,keys=Object.keys(input);
 if(keys.length!==1||keys[0]!=='password'||typeof input.password!=='string'||input.password.length>1024)return NextResponse.json({error:'Yanlış giriş məlumatı'},{status:400,headers:noStore});
 const config=getAuthConfig();
 if(!config)return NextResponse.json({error:'Admin girişi serverdə konfiqurasiya edilməyib'},{status:503,headers:noStore});
 if(!safeEqual(input.password,config.adminPassword))return NextResponse.json({error:'Yanlış şifrə'},{status:401,headers:noStore});
 const{token,data}=newSession(config.sessionSecret),response=NextResponse.json({authenticated:true,csrf:data.csrf},{headers:noStore});
 setSession(response,token);return response;
}
