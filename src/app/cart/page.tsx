'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowRight,Copy,Link2,Minus,Plus,Send,ShoppingBag,Trash2} from 'lucide-react';
import {ProductImageFrame} from '@/components/product-image-frame';
import {priceOf,useStore} from '@/components/store';
import {products} from '@/data/products';
import {encodeOrderItems} from '@/lib/order-link';
import {isInStock} from '@/lib/stock';

export default function Page(){
 const{cart,setQty,remove,clear,notify,t}=useStore(),[url,setUrl]=useState(''),[copied,setCopied]=useState(false);
 const items=cart.map(c=>({c,p:products.find(p=>p.id===c.id)!})).filter(x=>x.p);
 const unavailable=items.filter(({p})=>!isInStock(p)),hasUnavailable=unavailable.length>0;
 const total=items.reduce((sum,{p,c})=>sum+priceOf(p)*c.qty,0);
 useEffect(()=>{setUrl('');setCopied(false)},[cart]);

 function generate(){
  if(hasUnavailable){notify(t.unavailableOrderHint);return}
  const data=encodeOrderItems(items.map(({c})=>c));
  setUrl(`${location.origin}/order/#${data}`);setCopied(false);notify(t.linkReady);
 }
 async function copy(){await navigator.clipboard.writeText(url);setCopied(true);notify(t.linkCopied)}

 return <section className="container py-8 sm:py-14">
  <header className="flex flex-col justify-between gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end"><div><p className="eyebrow text-gray-400">VIBE AZ · {t.orderBuilder}</p><h1 className="display mt-3 text-4xl sm:text-6xl">{t.cart}</h1></div><p className="text-sm font-semibold text-gray-400">{cart.reduce((sum,item)=>sum+item.qty,0)} {t.items}</p></header>
  {!items.length?<div className="mt-8 grid min-h-[420px] place-items-center rounded-[2rem] bg-[#f5f5f3] p-8 text-center"><div><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white"><ShoppingBag size={30}/></span><h2 className="mt-6 text-2xl font-black">{t.emptyCart}</h2><Link className="btn btn-dark mt-6" href="/catalog">{t.goCatalog}<ArrowRight size={17}/></Link></div></div>:
  <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
   <div><div className="grid gap-3">{items.map(({p,c})=>{const available=isInStock(p);return <article key={p.id} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-[1.75rem] border border-black/10 p-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:p-4"><Link href={`/product/${p.id}`}><ProductImageFrame src={p.images[0]} alt={p.name} sizes="140px" variant="compact" inStock={available} statusLabel={t.outOfStock}/></Link><div className="flex min-w-0 flex-col py-1"><div className="flex gap-3"><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-gray-400">{t.product} #{p.id}</p><Link href={`/product/${p.id}`} className="mt-1 line-clamp-2 font-bold sm:text-lg">{p.name}</Link>{!available&&<p className="mt-2 text-xs font-bold text-gray-600">{t.outOfStock}</p>}</div><button aria-label={t.remove} onClick={()=>{remove(p.id);notify(t.removedFromCart)}} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-black"><Trash2 size={18}/></button></div><div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4"><div className="flex items-center rounded-full bg-gray-100 p-1"><button aria-label={t.decrease} className="grid h-9 w-9 place-items-center rounded-full bg-white" onClick={()=>setQty(p.id,c.qty-1)}><Minus size={14}/></button><span className="w-10 text-center text-sm font-bold">{c.qty}</span><button disabled={!available} aria-label={t.increase} className="grid h-9 w-9 place-items-center rounded-full bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-300" onClick={()=>setQty(p.id,c.qty+1)}><Plus size={14}/></button></div><div className="text-right"><p className="text-xs text-gray-400">{priceOf(p)} AZN × {c.qty}</p><b className="text-lg">{priceOf(p)*c.qty} AZN</b></div></div></div></article>})}</div><button onClick={()=>{clear();notify(t.cartCleared)}} className="mt-5 text-sm font-bold underline underline-offset-4">{t.clearCart}</button></div>
   <aside className="h-fit rounded-[2rem] bg-black p-6 text-white lg:sticky lg:top-24 sm:p-8"><p className="eyebrow text-white/45">{t.orderSummary}</p><div className="mt-6 flex justify-between text-sm text-white/65"><span>{t.productPlural}</span><span>{items.length}</span></div><div className="mt-4 flex items-end justify-between border-t border-white/15 pt-5"><span className="text-lg">{t.grandTotal}</span><b className="text-3xl">{total} AZN</b></div>{hasUnavailable&&<p className="mt-5 rounded-xl border border-white/15 bg-white/10 p-3 text-sm leading-5 text-white/75">{t.unavailableOrderHint}</p>}<button disabled={hasUnavailable} onClick={generate} className="btn mt-7 w-full bg-white py-4 text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45"><Link2 size={19}/>{hasUnavailable?t.outOfStock:t.getLink}</button><p className="mt-3 text-center text-xs leading-5 text-white/45">{t.privacyNote}</p>{url&&<div className="mt-6 border-t border-white/15 pt-6"><b>{t.linkReady}</b><p className="nice-scroll mt-3 max-h-24 overflow-auto break-all rounded-2xl bg-white/10 p-3 text-xs text-white/65">{url}</p><button onClick={copy} className="btn mt-3 w-full bg-white/10 text-white hover:bg-white/15"><Copy size={18}/>{copied?t.copied:t.copyLink}</button><a href={`https://wa.me/994998083080?text=${encodeURIComponent(t.whatsAppOrderIntro+'\n\n'+url)}`} className="btn mt-3 w-full border border-white/20 text-white hover:bg-white/10"><Send size={18}/>{t.sendWhatsApp}</a></div>}</aside>
  </div>}
 </section>;
}
