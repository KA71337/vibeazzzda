'use client';
import Link from 'next/link';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowUpRight,Command,Search,X} from 'lucide-react';
import {useEffect,useMemo,useRef,useState} from 'react';
import {products} from '@/data/products';
import {isInStock} from '@/lib/stock';
import {priceOf,useStore} from './store';
import {ProductImageFrame} from './product-image-frame';

export function SearchOverlay(){
 const{searchOpen,setSearchOpen,t}=useStore(),[q,setQ]=useState(''),input=useRef<HTMLInputElement>(null);
 useEffect(()=>{if(!searchOpen)return;setQ('');const id=setTimeout(()=>input.current?.focus(),100);return()=>clearTimeout(id)},[searchOpen]);
 useEffect(()=>{if(!searchOpen)return;const onKey=(e:KeyboardEvent)=>e.key==='Escape'&&setSearchOpen(false);window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[searchOpen,setSearchOpen]);
 const results=useMemo(()=>{const needle=q.trim().toLowerCase();return needle?products.filter(p=>(p.name+' '+p.description).toLowerCase().includes(needle)).slice(0,10):[]},[q]);
 return <AnimatePresence>{searchOpen&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.16}} className="fixed inset-0 z-[60] bg-black/45 p-0 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label={t.searchTitle}>
  <motion.div initial={{y:18,scale:.985}} animate={{y:0,scale:1}} exit={{y:10,opacity:0}} transition={{duration:.24,ease:'easeOut'}} className="mx-auto flex h-dvh w-full max-w-4xl flex-col overflow-hidden bg-white sm:h-[min(780px,calc(100dvh-3rem))] sm:rounded-[2rem] sm:shadow-2xl">
   <header className="border-b border-black/10 p-4 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-black text-white"><Search size={20}/></span><input ref={input} value={q} onChange={e=>setQ(e.target.value)} placeholder={t.searchHint} aria-label={t.searchTitle} className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none placeholder:text-gray-400 sm:text-2xl"/><span className="hidden items-center gap-1 rounded-lg border px-2 py-1 text-xs text-gray-400 sm:flex"><Command size={12}/> K</span><button aria-label={t.close} onClick={()=>setSearchOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-gray-100"><X size={20}/></button></div></header>
   <div className="nice-scroll flex-1 overflow-y-auto p-3 sm:p-6">{!q.trim()?<div className="grid h-full place-items-center text-center"><div><Search className="mx-auto text-gray-300" size={42}/><p className="mt-4 font-semibold">{t.searchHint}</p><p className="mt-1 text-sm text-gray-400">{t.searchHelper}</p></div></div>:results.length===0?<p className="py-20 text-center text-gray-400">{t.notFound}</p>:<><div className="mb-3 flex justify-between px-2 text-xs font-bold uppercase tracking-widest text-gray-400"><span>{results.length} {t.results}</span><span>ESC · {t.close}</span></div><ul className="grid gap-2 sm:grid-cols-2">{results.map((p,i)=><motion.li key={p.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:i*.02}}><Link href={`/product/${p.id}/`} onClick={()=>setSearchOpen(false)} className="group flex gap-3 rounded-2xl border border-transparent p-3 transition hover:border-black/10 hover:bg-[#f5f5f3]"><ProductImageFrame src={p.images[0]} alt={p.name} sizes="80px" variant="compact" inStock={isInStock(p)} statusLabel={t.outOfStock} className="h-20 w-20"/><span className="min-w-0 flex-1 py-1"><span className="line-clamp-2 text-sm font-semibold">{p.name}</span><span className="mt-2 flex items-baseline gap-2 text-sm"><b>{priceOf(p)} AZN</b>{p.newPrice!==null&&<s className="text-gray-400">{p.price} AZN</s>}</span>{!isInStock(p)&&<span className="mt-1 block text-[11px] font-bold text-gray-500">{t.outOfStock}</span>}</span><ArrowUpRight size={17} className="shrink-0 text-gray-300 transition group-hover:text-black"/></Link></motion.li>)}</ul></>}</div>
  </motion.div>
 </motion.div>}</AnimatePresence>
}
