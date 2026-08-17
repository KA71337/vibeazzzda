'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {Check,Copy,FileWarning} from 'lucide-react';
import {ProductImageFrame} from '@/components/product-image-frame';
import {priceOf,useStore} from '@/components/store';
import {products,type Product} from '@/data/products';
import {decodeOrderHash,type OrderItem} from '@/lib/order-link';
import {isInStock} from '@/lib/stock';
import snapshot from '../../../data/order-products.json';

const productById=new Map<number,Product>();
for(const product of snapshot as Product[])productById.set(product.id,product);
for(const product of products)productById.set(product.id,product);

export default function Page(){
 const{t}=useStore(),[cart,setCart]=useState<OrderItem[]>([]),[valid,setValid]=useState(true),[loaded,setLoaded]=useState(false),[copied,setCopied]=useState(false);
 useEffect(()=>{try{setCart(decodeOrderHash(location.hash.slice(1)))}catch{setValid(false)}finally{setLoaded(true)}},[]);
 const resolved=cart.map(c=>({c,p:productById.get(c.id)})),items=resolved.filter((item):item is {c:OrderItem;p:Product}=>!!item.p);
 const complete=valid&&items.length===cart.length,hasUnavailable=items.some(({p})=>!isInStock(p));
 const total=items.reduce((sum,{p,c})=>sum+priceOf(p)*c.qty,0);
 const orderText=()=>`VIBE AZ — ${t.order.toLocaleUpperCase()}\n\n${items.map(({p,c},index)=>`${index+1}. ${p.name}\n${priceOf(p)} AZN × ${c.qty} = ${priceOf(p)*c.qty} AZN`).join('\n\n')}\n\n${t.grandTotal.toLocaleUpperCase()}: ${total} AZN`;
 async function copy(){if(hasUnavailable)return;await navigator.clipboard.writeText(orderText());setCopied(true)}

 return <section className="container max-w-5xl py-8 sm:py-14"><header className="mb-10 flex items-center gap-4 border-b border-black/10 pb-8"><Image src="/logo.jpeg" width={70} height={70} className="h-14 w-14 rounded-full object-cover sm:h-[70px] sm:w-[70px]" alt="VIBE AZ"/><div><p className="eyebrow text-gray-400">VIBE AZ · {t.sharedOrder}</p><h1 className="display mt-2 text-4xl sm:text-6xl">{t.order}</h1></div></header>{loaded&&(!complete||!items.length)?<div className="grid min-h-[420px] place-items-center rounded-[2rem] bg-[#f5f5f3] p-8 text-center"><div><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white"><FileWarning/></span><h2 className="mt-6 text-2xl font-black">{t.invalidOrder}</h2><p className="mt-2 text-gray-500">{t.requestNewLink}</p></div></div>:<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="grid gap-3">{items.map(({p,c},index)=>{const available=isInStock(p);return <article key={p.id} className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.5rem] border border-black/10 p-3 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:gap-5 sm:p-4"><ProductImageFrame src={p.images[0]} alt={p.name} sizes="96px" variant="compact" inStock={available} statusLabel={t.outOfStock}/><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{String(index+1).padStart(2,'0')} · {t.product} #{p.id}</p><b className="mt-1 line-clamp-2 text-sm sm:text-base">{p.name}</b><p className="mt-2 text-xs text-gray-500 sm:text-sm">{priceOf(p)} AZN × {c.qty}</p>{!available&&<p className="mt-1 text-xs font-bold text-gray-600">{t.outOfStock}</p>}</div><b className="text-sm sm:text-lg">{priceOf(p)*c.qty} AZN</b></article>})}</div><aside className="rounded-[2rem] bg-black p-6 text-white lg:sticky lg:top-24"><p className="eyebrow text-white/45">{t.orderSummary}</p><div className="mt-6 flex justify-between text-sm text-white/60"><span>{t.productPlural}</span><span>{items.length}</span></div><div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5"><span className="text-lg">{t.grandTotal}</span><b className="text-3xl">{total} AZN</b></div>{hasUnavailable&&<p className="mt-5 rounded-xl border border-white/15 bg-white/10 p-3 text-sm leading-5 text-white/75">{t.unavailableOrderHint}</p>}<button disabled={hasUnavailable} onClick={copy} className="btn mt-7 w-full bg-white py-4 text-black disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45">{copied?<Check/>:<Copy/>}{hasUnavailable?t.outOfStock:copied?t.orderCopied:t.copyOrder}</button><p className="mt-4 text-center text-xs leading-5 text-white/45">{t.secureOrderNote}</p></aside></div>}</section>;
}
