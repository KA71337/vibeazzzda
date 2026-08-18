import 'server-only';

export type AuthConfig = {adminPassword: string; sessionSecret: string};
export type CatalogConfig = {githubToken: string; owner: string; repo: string; branch: string; productsPath: string; salesPath: string; managedPrefix: string};

const read = (name: string) => {
  const v = process.env[name];
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
};

/**
 * Credentials needed to sign in. Deliberately independent of the GitHub
 * catalog credentials so a missing token cannot lock the operator out.
 */
export function getAuthConfig(): AuthConfig | null {
  const adminPassword = read('ADMIN_PASSWORD'), sessionSecret = read('SESSION_SECRET');
  if (!adminPassword || !sessionSecret || adminPassword.length < 12 || Buffer.byteLength(sessionSecret, 'utf8') < 32 || adminPassword === sessionSecret) return null;
  return {adminPassword, sessionSecret};
}

/** Credentials needed to read and commit the catalog. */
export function getCatalogConfig(): CatalogConfig | null {
  const githubToken = read('GITHUB_TOKEN'), owner = read('GITHUB_OWNER'), repo = read('GITHUB_REPO');
  if (!githubToken || !owner || !repo) return null;
  const branch = read('GITHUB_BRANCH') || 'main', productsPath = read('GITHUB_PRODUCTS_PATH') || 'data/products.json', salesPath = read('GITHUB_SALES_PATH') || 'data/sales.json';
  const namePattern = /^[A-Za-z0-9_.-]{1,100}$/;
  const pathPattern = /^[A-Za-z0-9._/-]{1,240}$/;
  if (githubToken.length < 20 || !namePattern.test(owner) || !namePattern.test(repo) || !pathPattern.test(branch) || branch.includes('..') || !pathPattern.test(productsPath) || productsPath.startsWith('/') || productsPath.includes('..') || !productsPath.endsWith('.json') || !pathPattern.test(salesPath) || salesPath.startsWith('/') || salesPath.includes('..') || !salesPath.endsWith('.json') || salesPath===productsPath) return null;
  return {
    githubToken, owner, repo,
    branch,
    productsPath,
    salesPath,
    managedPrefix: 'public/products/admin/',
  };
}
