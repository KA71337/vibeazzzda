'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {Check,Copy,FileWarning} from 'lucide-react';
import {products} from '@/data/products';
import snapshot from '../../../data/order-products.json';
import type {Product} from '@/data/products';

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

export default function Page(){const[cart,setCart]=useState<Item[]>([]),[valid,setValid]=useState(true),[copied,setCopied]=useState(false);useEffect(()=>{try{setCart(decodeLegacyOrder(location.hash.slice(1)))}catch{setValid(false)}},[]);const items=cart.map(c=>({c,p:productById.get(c.id)})).filter((x):x is {c:Item;p:Product}=>!!x.p),total=items.reduce((s,x)=>s+x.p.price*x.c.qty,0);const text=()=>`VIBE AZ — SİFARİŞ\n\n${items.map((x,i)=>`${i+1}. ${x.p.name}\n${x.p.price} AZN × ${x.c.qty} = ${x.p.price*x.c.qty} AZN`).join('\n\n')}\n\nÜMUMİ: ${total} AZN`;async function copy(){await navigator.clipboard.writeText(text());setCopied(true)}return <section className="container max-w-4xl py-12"><div className="mb-10 flex items-center gap-4"><Image src="/logo.jpeg" width={62} height={62} className="rounded-full" alt="VIBE AZ"/><div><p className="text-xs font-bold tracking-widest text-gray-500">VIBE AZ</p><h1 className="text-4xl font-black sm:text-6xl">Sifariş</h1></div></div>{!valid||!items.length?<div className="rounded-3xl bg-gray-50 p-16 text-center"><FileWarning className="mx-auto"/><p className="mt-4">Sifariş linki etibarsızdır.</p></div>:<><div className="grid gap-4">{items.map(({p,c})=><div key={p.id} className="flex items-center gap-4 rounded-3xl border p-4"><div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><Image src={p.images[0]} alt={p.name} fill className="object-cover"/></div><div className="min-w-0 flex-1"><b className="line-clamp-2">{p.name}</b><p className="mt-1 text-gray-500">{p.price} AZN × {c.qty}</p></div><b>{p.price*c.qty} AZN</b></div>)}</div><div className="mt-6 rounded-3xl bg-black p-6 text-white"><div className="flex justify-between text-2xl"><span>Ümumi</span><b>{total} AZN</b></div><button onClick={copy} className="btn mt-6 w-full bg-white text-black">{copied?<Check/>:<Copy/>}{copied?'Sifariş kopyalandı ✓':'Sifarişi kopyala'}</button></div></>}</section>}
