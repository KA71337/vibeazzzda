import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root=process.cwd();
const site='https://vibeaz.org';
const products=JSON.parse(fs.readFileSync(path.join(root,'data','products.json'),'utf8'));
const categorySource=fs.readFileSync(path.join(root,'src','data','categories.ts'),'utf8');
const categories=[...categorySource.matchAll(/\{id:\s*'([^']+)'/g)].map(match=>match[1]);
const usedCategories=categories.filter(id=>products.some(product=>product.category===id));
const publicPaths=['/','/catalog/',...usedCategories.map(id=>`/catalog/${id}/`),...products.map(product=>`/product/${product.id}/`)];
const errors=[];
const fail=(message)=>errors.push(message);
const unique=new Set(publicPaths);

if(unique.size!==publicPaths.length)fail(`duplicate public paths: ${publicPaths.length-unique.size}`);
for(const url of publicPaths){
 const parsed=new URL(url,site);
 if(parsed.origin!==site)fail(`wrong origin: ${url}`);
 if(parsed.search)fail(`query string in sitemap candidate: ${url}`);
 if(/\/(admin|api)(\/|$)/.test(parsed.pathname))fail(`private path in sitemap candidate: ${url}`);
}
for(const product of products){
 if(!Number.isSafeInteger(product.id)||product.id<1)fail(`invalid product id: ${product.id}`);
 if(typeof product.name!=='string'||!product.name.trim())fail(`missing product name: ${product.id}`);
 if(!usedCategories.includes(product.category))fail(`invalid product category: ${product.id}/${product.category}`);
 if(!Array.isArray(product.images)||product.images.length===0)fail(`missing product image: ${product.id}`);
 for(const image of product.images||[]){
  if(!/^\/products\//.test(image))fail(`non-public product image: ${product.id}/${image}`);
  const file=path.join(root,'public',image.replace(/^\//,''));
  if(!fs.existsSync(file))fail(`missing product image file: ${product.id}/${image}`);
 }
}

const arg=process.argv.find(value=>value.startsWith('--http='));
const base=arg?arg.slice('--http='.length).replace(/\/$/,''):null;
const htmlValue=(html,pattern)=>html.match(pattern)?.[1]?.trim()||'';
const meta=(html,name)=>htmlValue(html,new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`,'i'));
const canonical=(html)=>htmlValue(html,/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)||htmlValue(html,/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
const headingCount=(html)=>[...html.matchAll(/<h1\b/gi)].length;
const jsonLdBlocks=(html)=>[...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(match=>{try{return [JSON.parse(match[1])]}catch{return []}});

async function fetchText(url){
 const response=await fetch(url,{redirect:'manual',headers:{'user-agent':'VIBE-AZ-SEO-Audit/1.0'},signal:AbortSignal.timeout(20000)});
 return {response,text:await response.text()};
}

async function mapLimit(values,limit,worker){
 const results=[];let cursor=0;
 const runners=Array.from({length:Math.min(limit,values.length)},async()=>{
  while(cursor<values.length){const index=cursor++;results[index]=await worker(values[index],index);}
 });
 await Promise.all(runners);return results;
}

if(base){
 try{
  const robots=await fetchText(`${base}/robots.txt`);
  if(robots.response.status!==200)fail(`robots status ${robots.response.status}`);
  const robotsText=robots.text.replace(/\r/g,'').trim();
  const expected=['User-Agent: *','Allow: /','Disallow: /admin/','Disallow: /api/','','Sitemap: https://vibeaz.org/sitemap.xml'].join('\n');
  if(robotsText!==expected)fail('robots.txt does not match the required directives');
  if(/vibe\.az|vercel\.app|localhost/i.test(robotsText))fail('robots.txt contains a legacy host');

  const sitemap=await fetchText(`${base}/sitemap.xml`);
  if(sitemap.response.status!==200)fail(`sitemap status ${sitemap.response.status}`);
  const sitemapUrls=[...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(match=>match[1].trim());
  if(sitemapUrls.length!==publicPaths.length)fail(`sitemap count ${sitemapUrls.length}; expected ${publicPaths.length}`);
  const expectedUrls=publicPaths.map(item=>new URL(item,site).toString());
  if(sitemapUrls.some(url=>!expectedUrls.includes(url)))fail('sitemap contains an unexpected URL');
  if(new Set(sitemapUrls).size!==sitemapUrls.length)fail('sitemap contains duplicate URLs');
  if(sitemapUrls.some(url=>new URL(url).origin!==site||/vibe\.az|vercel\.app|localhost/i.test(url)))fail('sitemap contains a legacy or invalid host');

  const pageResults=await mapLimit(publicPaths,12,async page=>{
   const target=`${base}${page}`;
   try{
    const {response,text}=await fetchText(target);
    if(response.status!==200)return {error:`${page}: HTTP ${response.status}`};
    if(response.url!==target)return {error:`${page}: redirect to ${response.url}`};
    const pageCanonical=canonical(text);
    if(pageCanonical!==new URL(page,site).toString())return {error:`${page}: canonical ${pageCanonical}`};
    const description=meta(text,'description');
    const title=htmlValue(text,/<title[^>]*>([^<]*)<\/title>/i);
    if(!description)return {error:`${page}: missing description`};
    if(!title)return {error:`${page}: missing title`};
    if(title.length>70)return {error:`${page}: title is ${title.length} characters`};
    if(description.length>165)return {error:`${page}: description is ${description.length} characters`};
    if(headingCount(text)!==1)return {error:`${page}: expected one H1, found ${headingCount(text)}`};
    if(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(text))return {error:`${page}: public page is noindex`};
    if(/https?:\/\/(?:www\.)?vibe\.az(?:\/|["'<])|https?:\/\/[^\s"']*\.vercel\.app/i.test(text))return {error:`${page}: legacy host in HTML`};
    if(page.startsWith('/product/')){
     const blocks=jsonLdBlocks(text);const productSchema=blocks.find(block=>block['@type']==='Product'||Array.isArray(block['@graph'])&&block['@graph'].some(item=>item['@type']==='Product'));const breadcrumb=blocks.find(block=>block['@type']==='BreadcrumbList'||Array.isArray(block['@graph'])&&block['@graph'].some(item=>item['@type']==='BreadcrumbList'));if(!productSchema)return {error:`${page}: Product JSON-LD missing`};if(!breadcrumb)return {error:`${page}: BreadcrumbList JSON-LD missing`};
    }
    return {page,title,description};
   }catch(error){return {error:`${page}: ${error.message}`};}
  });
  pageResults.filter(result=>result.error).forEach(result=>fail(result.error));
  const passed=pageResults.filter(result=>!result.error);
  for(const field of ['title','description']){
   const groups=Map.groupBy(passed,result=>result[field]);
   for(const [value,items] of groups){if(value&&items.length>1)fail(`duplicate ${field}: ${items.map(item=>item.page).join(', ')}`);}
  }
  console.log(`HTTP audit: ${passed.length}/${publicPaths.length} public URLs passed`);
 }catch(error){fail(`HTTP audit failed: ${error.message}`);}
}

if(errors.length){
 console.error(errors.map(error=>`FAIL: ${error}`).join('\n'));
 process.exitCode=1;
}else{
 console.log(`SEO contract passed: ${products.length} products, ${usedCategories.length} categories, ${publicPaths.length} sitemap URLs`);
}
