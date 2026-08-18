import type {Metadata} from 'next';
import {permanentRedirect} from 'next/navigation';
import {CatalogPageContent} from '@/components/catalog-page-content';
import {products} from '@/data/products';
import {absoluteUrl,SITE_NAME,SITE_URL} from '@/lib/seo';

const title='İdman və əyləncə məhsulları kataloqu';
const description='VIBE AZ kataloqunda idman, fitnes, oyun və aktiv həyat üçün seçilmiş məhsullara baxın. Kateqoriyaya, qiymətə və məhsul adına görə seçim edin.';

export const metadata:Metadata={
 title,
 description,
 alternates:{canonical:`${SITE_URL}/catalog/`},
 openGraph:{type:'website',url:`${SITE_URL}/catalog/`,siteName:SITE_NAME,title:`${title} | VIBE AZ`,description,images:[{url:absoluteUrl('/logo.jpeg'),width:800,height:800,alt:'VIBE AZ kataloqu'}]},
 twitter:{card:'summary_large_image',title:`${title} | VIBE AZ`,description,images:[absoluteUrl('/logo.jpeg')]},
 robots:{index:true,follow:true},
};

const usedCategories=new Set(products.map(product=>product.category).filter((id):id is string=>Boolean(id)));

export default async function Page({searchParams}:{searchParams:Promise<{category?:string|string[]}>}){
 const query=await searchParams;
 const category=Array.isArray(query.category)?query.category[0]:query.category;
 if(category&&usedCategories.has(category))permanentRedirect(`/catalog/${category}/`);
 return <CatalogPageContent/>;
}
