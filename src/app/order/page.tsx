'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {Check,Copy,FileWarning} from 'lucide-react';
import {products} from '@/data/products';
import snapshot from '../../../data/order-products.json';
import type {Product} from '@/data/products';
import {useStore} from '@/components/store';

type Item={id:number;qty:number};
const MAX_HASH_LENGTH=16_384,MAX_ITEMS=200;
const productById=new Map<number,Product>();
for(const product of snapshot as Product[])productById.set(product.id,product);
for(const product of products)productById.set(product.id,product); // Active catalog wins.

function decodeLegacyOrder(hash:string):Item[]{
 if(!hash||hash.length>MAX_HASH_LENGTH||!/^[A-Za-z0-9_-]+$/.test(hash))throw new Error('invalid payload');
 let encoded=hash.replace(/-/g,'+').replace(/_/g,'/');
 if(encoded.length%4===1)throw new Error('invalid base64');
 while(encoded.length%4)encoded+='=';
 const binary=atob(encoded);
 if(binary.length>12_288)throw new Error('payload too large');
 const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const value:unknown=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 if(!Array.isArray(value)||value.length<1||value.length>MAX_ITEMS)throw new Error('invalid order');
 const seen=new Set<number>();
 return value.map(entry=>{
  if(!entry||typeof entry!=='object'||Array.isArray(entry))throw new Error('invalid item');
  const item=entry as Record<string,unknown>,keys=Object.keys(item);
  if(keys.length!==2||!keys.includes('id')||!keys.includes('qty')||!Number.isSafeInteger(item.id)||!Number.isSafeInteger(item.qty)||(item.id as number)<=0||(item.qty as number)<=0||seen.has(item.id as number))throw new Error('invalid item');
  seen.add(item.id as number);return {id:item.id as number,qty:item.qty as number};
 });
}

export default function Page(){const{t}=useStore(),[cart,setCart]=useState<Item[]>([]),[valid,setValid]=useState(true),[copied,setCopied]=useState(false);useEffect(()=>{try{setCart(decodeLegacyOrder(location.hash.slice(1)))}catch{setValid(false)}},[]);const items=cart.map(c=>({c,p:productById.get(c.id)})).filter((x):x is {c:Item;p:Product}=>!!x.p),total=items.reduce((s,x)=>s+x.p.price*x.c.qty,0);const text=()=>`VIBE AZ — SİFARİŞ\n\n${items.map((x,i)=>`${i+1}. ${x.p.name}\n${x.p.price} AZN × ${x.c.qty} = ${x.p.price*x.c.qty} AZN`).join('\n\n')}\n\nÜMUMİ: ${total} AZN`;async function copy(){await navigator.clipboard.writeText(text());setCopied(true)}return <section className="container max-w-5xl py-8 sm:py-14"><header className="mb-10 flex items-center gap-4 border-b border-black/10 pb-8"><Image src="/logo.jpeg" width={70} height={70} className="h-14 w-14 rounded-full object-cover sm:h-[70px] sm:w-[70px]" alt="VIBE AZ"/><div><p className="eyebrow text-gray-400">VIBE AZ · SHARED ORDER</p><h1 className="display mt-2 text-4xl sm:text-6xl">{t.order}</h1></div></header>{!valid||!items.length?<div className="grid min-h-[420px] place-items-center rounded-[2rem] bg-[#f5f5f3] p-8 text-center"><div><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white"><FileWarning/></span><h2 className="mt-6 text-2xl font-black">{t.invalidOrder}</h2><p className="mt-2 text-gray-500">{t.requestNewLink}</p></div></div>:<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="grid gap-3">{items.map(({p,c},i)=><article key={p.id} className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.5rem] border border-black/10 p-3 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:gap-5 sm:p-4"><div className="relative aspect-square overflow-hidden rounded-[1.15rem] bg-[#f5f5f3]"><Image src={p.images[0]} alt={p.name} fill className="object-contain p-1"/></div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{String(i+1).padStart(2,'0')} · {t.product} #{p.id}</p><b className="mt-1 line-clamp-2 text-sm sm:text-base">{p.name}</b><p className="mt-2 text-xs text-gray-500 sm:text-sm">{p.price} AZN × {c.qty}</p></div><b className="text-sm sm:text-lg">{p.price*c.qty} AZN</b></article>)}</div><aside className="rounded-[2rem] bg-black p-6 text-white lg:sticky lg:top-24"><p className="eyebrow text-white/45">{t.orderSummary}</p><div className="mt-6 flex justify-between text-sm text-white/60"><span>{t.productPlural}</span><span>{items.length}</span></div><div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5"><span className="text-lg">{t.grandTotal}</span><b className="text-3xl">{total} AZN</b></div><button onClick={copy} className="btn mt-7 w-full bg-white py-4 text-black">{copied?<Check/>:<Copy/>}{copied?t.orderCopied:t.copyOrder}</button><p className="mt-4 text-center text-xs leading-5 text-white/45">{t.secureOrderNote}</p></aside></div>}</section>}
