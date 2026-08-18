import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProductDetail} from '@/components/product-detail';
import {products} from '@/data/products';
import {categoryLabel} from '@/data/categories';
import {isInStock} from '@/lib/stock';
import {absoluteUrl,categoryPath,ORGANIZATION_ID,productBrand,productLongDescription,productMetaDescription,productPath,productTitle,safeJsonLd,SITE_NAME} from '@/lib/seo';

const isProductId=(id:string)=>/^\d{1,10}$/.test(id);

export const dynamicParams=false;

export function generateStaticParams(){
 return products.map(product=>({id:String(product.id)}));
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;
 if(!isProductId(id))return {robots:{index:false,follow:false}};
 const product=products.find(item=>item.id===Number(id));
 if(!product)return {robots:{index:false,follow:false}};
 const categoryName=categoryLabel(product.category,'az')||'Digər';
 const duplicateName=products.filter(item=>item.name===product.name).length>1;
 const title=productTitle(product,categoryName,duplicateName?`#${product.id}`:'');
 const description=productMetaDescription(product,categoryName);
 const url=absoluteUrl(productPath(product.id));
 const image=product.images[0]||'/logo.jpeg';
 return {
  title,
  description,
  alternates:{canonical:url},
  openGraph:{type:'website',url,siteName:SITE_NAME,title:`${title} | VIBE AZ`,description,images:[{url:absoluteUrl(image),alt:product.name}]},
  twitter:{card:'summary_large_image',title:`${title} | VIBE AZ`,description,images:[absoluteUrl(image)]},
  robots:{index:true,follow:true},
 };
}

export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 if(!isProductId(id))notFound();
 const product=products.find(item=>item.id===Number(id));
 if(!product)notFound();
 const categoryName=categoryLabel(product.category,'az')||'Digər';
 const url=absoluteUrl(productPath(product.id));
 const description=productLongDescription(product,categoryName);
 const brand=productBrand(product.description);
 const imageUrls=product.images.map(image=>absoluteUrl(image));
 const jsonLd={
  '@context':'https://schema.org',
  '@graph':[
   {
    '@type':'Product',
    '@id':`${url}#product`,
    name:product.name,
    description,
    image:imageUrls,
    sku:String(product.id),
    category:categoryName,
    ...(brand?{brand:{'@type':'Brand',name:brand}}:{}),
    mainEntityOfPage:{'@type':'WebPage','@id':url},
    offers:{
     '@type':'Offer',
     priceCurrency:'AZN',
     price:product.newPrice??product.price,
     availability:isInStock(product)?'https://schema.org/InStock':'https://schema.org/OutOfStock',
     itemCondition:'https://schema.org/NewCondition',
     url,
     seller:{'@id':ORGANIZATION_ID},
    },
   },
   {
    '@type':'BreadcrumbList',
    itemListElement:[
     {'@type':'ListItem',position:1,name:'Ana səhifə',item:absoluteUrl('/')},
     {'@type':'ListItem',position:2,name:'Kataloq',item:absoluteUrl('/catalog/')},
     {'@type':'ListItem',position:3,name:categoryName,item:absoluteUrl(categoryPath(product.category||'diger'))},
     {'@type':'ListItem',position:4,name:product.name,item:url},
    ],
   },
  ],
 };
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/><ProductDetail p={{...product,description}} categoryId={product.category}/></>;
}
