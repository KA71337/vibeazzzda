import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {CatalogPageContent} from '@/components/catalog-page-content';
import {categories} from '@/data/categories';
import {products} from '@/data/products';
import {absoluteUrl,categoryPath,categorySeoDescription,SITE_NAME,SITE_URL,safeJsonLd} from '@/lib/seo';

const usedCategoryIds=new Set(products.map(product=>product.category).filter((id):id is string=>Boolean(id)));

export const dynamicParams=false;

export function generateStaticParams(){
 return categories.filter(category=>usedCategoryIds.has(category.id)).map(category=>({category:category.id}));
}

export async function generateMetadata({params}:{params:Promise<{category:string}>}):Promise<Metadata>{
 const {category:categoryId}=await params;
 const category=categories.find(item=>item.id===categoryId);
 if(!category||!usedCategoryIds.has(category.id))return {robots:{index:false,follow:false}};
 const url=absoluteUrl(categoryPath(category.id));
 const image=products.find(product=>product.category===category.id)?.images[0]||'/logo.jpeg';
 const description=categorySeoDescription(category.id);
 return {
  title:category.az,
  description,
  alternates:{canonical:url},
  openGraph:{type:'website',url,siteName:SITE_NAME,title:`${category.az} | VIBE AZ`,description,images:[{url:absoluteUrl(image),alt:`${category.az} — VIBE AZ`}]},
  twitter:{card:'summary_large_image',title:`${category.az} | VIBE AZ`,description,images:[absoluteUrl(image)]},
  robots:{index:true,follow:true},
 };
}

export default async function Page({params}:{params:Promise<{category:string}>}){
 const {category:categoryId}=await params;
 const category=categories.find(item=>item.id===categoryId);
 if(!category||!usedCategoryIds.has(category.id))notFound();
 const categoryProducts=products.filter(product=>product.category===category.id);
 const url=absoluteUrl(categoryPath(category.id));
 const jsonLd={
  '@context':'https://schema.org',
  '@type':'CollectionPage',
  name:category.az,
  description:categorySeoDescription(category.id),
  url,
  isPartOf:{'@type':'WebSite',url:SITE_URL,name:SITE_NAME},
  mainEntity:{
   '@type':'ItemList',
   numberOfItems:categoryProducts.length,
   itemListElement:categoryProducts.map((product,index)=>({
    '@type':'ListItem',position:index+1,url:absoluteUrl(`/product/${product.id}/`),name:product.name,
   })),
  },
 };
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(jsonLd)}}/><CatalogPageContent categoryId={category.id}/></>;
}
