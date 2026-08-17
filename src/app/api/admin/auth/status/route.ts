import {NextResponse} from 'next/server';
import {getAuthConfig,getCatalogConfig} from '@/server/config';
import {currentSession,noStore} from '@/server/security';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function GET(){
 const session=await currentSession();
 return NextResponse.json({authenticated:!!session,configured:!!getAuthConfig(),catalogConfigured:!!getCatalogConfig(),csrf:session?.csrf},{headers:noStore});
}
