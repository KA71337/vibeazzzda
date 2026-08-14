import {NextRequest, NextResponse} from 'next/server';
import {AUTH_ENV, getAuthConfig, missingEnv} from '@/server/config';
import {clientKey, newSession, noStore, safeEqual, setSession, throttle} from '@/server/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const key = clientKey(req);
  if (throttle('login:' + key, 6, 300000)) return NextResponse.json({error: 'Həddindən çox cəhd'}, {status: 429, headers: noStore});
  // Sign-in requires only ADMIN_PASSWORD and SESSION_SECRET.
  const c = getAuthConfig();
  if (!c) return NextResponse.json({error: 'Admin girişi konfiqurasiya edilməyib: ' + missingEnv(AUTH_ENV).join(', ')}, {status: 503, headers: noStore});
  const {password} = await req.json().catch(() => ({}));
  if (typeof password !== 'string' || !safeEqual(password, c.adminPassword)) return NextResponse.json({error: 'Yanlış şifrə'}, {status: 401, headers: noStore});
  const {token, data} = newSession(c.sessionSecret);
  const res = NextResponse.json({authenticated: true, csrf: data.csrf}, {headers: noStore});
  setSession(res, token);
  return res;
}
