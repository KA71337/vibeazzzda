import 'server-only';

export type AuthConfig = {adminPassword: string; sessionSecret: string};
export type CatalogConfig = {githubToken: string; owner: string; repo: string; branch: string; productsPath: string; managedPrefix: string};
export type ServerConfig = AuthConfig & CatalogConfig;

export const AUTH_ENV = ['ADMIN_PASSWORD', 'SESSION_SECRET'] as const;
export const CATALOG_ENV = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO'] as const;

const read = (name: string) => {
  const v = process.env[name];
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
};

/** Names of the required variables that are absent or empty. */
export function missingEnv(names: readonly string[] = [...AUTH_ENV, ...CATALOG_ENV]): string[] {
  return names.filter(n => !read(n));
}

/**
 * Credentials needed to sign in. Deliberately independent of the GitHub
 * catalog credentials so a missing token cannot lock the operator out.
 */
export function getAuthConfig(): AuthConfig | null {
  const adminPassword = read('ADMIN_PASSWORD'), sessionSecret = read('SESSION_SECRET');
  if (!adminPassword || !sessionSecret) return null;
  return {adminPassword, sessionSecret};
}

/** Credentials needed to read and commit the catalog. */
export function getCatalogConfig(): CatalogConfig | null {
  const githubToken = read('GITHUB_TOKEN'), owner = read('GITHUB_OWNER'), repo = read('GITHUB_REPO');
  if (!githubToken || !owner || !repo) return null;
  return {
    githubToken, owner, repo,
    branch: read('GITHUB_BRANCH') || 'main',
    productsPath: read('GITHUB_PRODUCTS_PATH') || 'data/products.json',
    managedPrefix: 'public/products/admin/',
  };
}

export function getConfig(): ServerConfig | null {
  const auth = getAuthConfig(), catalog = getCatalogConfig();
  return auth && catalog ? {...auth, ...catalog} : null;
}
