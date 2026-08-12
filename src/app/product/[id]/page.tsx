import {notFound} from 'next/navigation';import {products} from '@/data/products';import {ProductDetail} from '@/components/product-detail';
export function generateStaticParams(){return products.map(p=>({id:String(p.id)}))}
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params,p=products.find(x=>x.id===+id);if(!p)return notFound();return <ProductDetail p={p}/>}
