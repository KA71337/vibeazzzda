import {NextResponse} from 'next/server';
import {currentSession, noStore} from '@/server/security';
import {AUTH_ENV, CATALOG_ENV, missingEnv} from '@/server/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await currentSession();
  const missingAuth = missingEnv(AUTH_ENV), missingCatalog = missingEnv(CATALOG_ENV);
  return NextResponse.json({
    authenticated: !!session,
    // Login only needs the auth variables; the catalog credentials are reported
    // separately so a missing GitHub token no longer blocks sign-in.
    configured: missingAuth.length === 0,
    catalogConfigured: missingCatalog.length === 0,
    missing: [...missingAuth, ...missingCatalog],
    csrf: session?.csrf,
  }, {headers: noStore});
}
