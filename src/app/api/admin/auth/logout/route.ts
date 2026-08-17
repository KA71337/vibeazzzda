import {NextRequest,NextResponse} from 'next/server';
import {clearSession,noStore,protectMutation} from '@/server/security';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function POST(request:NextRequest){
 const denied=await protectMutation(request);
 if(denied)return NextResponse.json({error:denied},{status:403,headers:noStore});
 const response=NextResponse.json({ok:true},{headers:noStore});
 clearSession(response);
 return response;
}
