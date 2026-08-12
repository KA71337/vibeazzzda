import 'server-only';

export type ServerConfig={adminPassword:string;sessionSecret:string;githubToken:string;owner:string;repo:string;branch:string;productsPath:string;managedPrefix:string};
export function getConfig():ServerConfig|null{
 const e=process.env; const required=[e.ADMIN_PASSWORD,e.SESSION_SECRET,e.GITHUB_TOKEN,e.GITHUB_OWNER,e.GITHUB_REPO];
 if(required.some(v=>!v)) return null;
 return {adminPassword:e.ADMIN_PASSWORD!,sessionSecret:e.SESSION_SECRET!,githubToken:e.GITHUB_TOKEN!,owner:e.GITHUB_OWNER!,repo:e.GITHUB_REPO!,branch:e.GITHUB_BRANCH||'main',productsPath:e.GITHUB_PRODUCTS_PATH||'data/products.json',managedPrefix:'public/products/admin/'};
}
