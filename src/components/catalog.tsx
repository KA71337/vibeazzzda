'use client';
import {AnimatePresence,motion} from 'framer-motion';
import {useEffect,useMemo,useState} from 'react';
import {useRouter} from 'next/navigation';
import {LayoutGrid,Search,SlidersHorizontal,X} from 'lucide-react';
import {products} from '@/data/products';
import {categories} from '@/data/categories';
import {ProductCard} from './product-card';
import {Select} from './select';
import {useStore} from './store';
import {categoryPath} from '@/lib/seo';

export function Catalog({limit,initialCategory}:{limit?:number;initialCategory?:string}){
 const{t,lang}=useStore(),router=useRouter();
 const[q,setQ]=useState(''),[min,setMin]=useState(''),[max,setMax]=useState(''),[sort,setSort]=useState('new'),[cat,setCat]=useState(initialCategory||''),[sheet,setSheet]=useState(false);
 useEffect(()=>{if(initialCategory)return;const category=new URLSearchParams(location.search).get('category')||'';if(categories.some(c=>c.id===category))setCat(category)},[initialCategory]);
 useEffect(()=>{document.body.classList.toggle('overlay-open',sheet);return()=>document.body.classList.remove('overlay-open')},[sheet]);
 const catOptions=useMemo(()=>{const used=new Set(products.map(p=>p.category).filter(Boolean));return [{value:'',label:t.allCategories},...categories.filter(c=>used.has(c.id)).map(c=>({value:c.id,label:c[lang]}))]},[t,lang]);
 const sortOptions=useMemo(()=>[{value:'new',label:t.sortNew},{value:'low',label:t.sortLow},{value:'high',label:t.sortHigh}],[t]);
 const list=useMemo(()=>{const x=products.filter(p=>(p.name+' '+p.description).toLowerCase().includes(q.toLowerCase())&&(!min||p.price>=+min)&&(!max||p.price<=+max)&&(!cat||p.category===cat));if(sort==='low')x.sort((a,b)=>a.price-b.price);if(sort==='high')x.sort((a,b)=>b.price-a.price);if(sort==='new')x.sort((a,b)=>b.id-a.id);return limit?x.slice(0,limit):x},[q,min,max,sort,cat,limit]);
 const changeCategory=(value:string)=>{setCat(value);if(initialCategory!==undefined)router.push(value?categoryPath(value):'/catalog/')};
 const reset=()=>{setMin('');setMax('');setSort('new');changeCategory('')};
 const controls=<><Select value={cat} onChange={changeCategory} options={catOptions} label={t.category} placeholder={t.allCategories} icon={<LayoutGrid size={17}/>}/><Select value={sort} onChange={setSort} options={sortOptions} label={t.sort} icon={<SlidersHorizontal size={17}/>}/><div className="grid grid-cols-2 gap-2"><label className="rounded-[1.15rem] bg-white px-4 py-2 shadow-sm"><span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.priceMin} · AZN</span><input value={min} onChange={e=>setMin(e.target.value)} type="number" inputMode="numeric" placeholder="0" aria-label={t.priceMin} className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"/></label><label className="rounded-[1.15rem] bg-white px-4 py-2 shadow-sm"><span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">{t.priceMax} · AZN</span><input value={max} onChange={e=>setMax(e.target.value)} type="number" inputMode="numeric" placeholder="∞" aria-label={t.priceMax} className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"/></label></div></>;
 return <>
  <div className="mb-8 rounded-[2rem] border border-black/5 bg-[#f5f5f3] p-3 sm:p-4">
   <div className="flex gap-2"><label className="flex min-h-14 flex-1 items-center gap-3 rounded-[1.15rem] bg-white px-4 shadow-sm"><Search size={18} className="shrink-0 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search} className="h-12 w-full min-w-0 bg-transparent text-sm outline-none"/>{q&&<button aria-label={t.reset} onClick={()=>setQ('')}><X size={16}/></button>}</label>{!limit&&<button onClick={()=>setSheet(true)} className="flex min-h-14 items-center gap-2 rounded-[1.15rem] bg-black px-4 text-sm font-bold text-white md:hidden"><SlidersHorizontal size={17}/>{t.filters}</button>}</div>
   {!limit&&<div className="mt-2 hidden grid-cols-[1.15fr_1fr_1.3fr] gap-2 md:grid">{controls}</div>}
   {!limit&&<div className="flex items-center justify-between px-2 pb-1 pt-4 text-xs font-semibold text-gray-500"><span>{list.length} {t.results}</span><button onClick={reset} className="underline underline-offset-4">{t.reset}</button></div>}
  </div>
  <AnimatePresence>{sheet&&<div className="fixed inset-0 z-[65] md:hidden"><motion.button aria-label={t.close} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSheet(false)} className="absolute inset-0 w-full bg-black/50"/><motion.div role="dialog" aria-modal="true" aria-label={t.filters} initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'tween',duration:.28}} className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-[#f5f5f3] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"><div className="mb-6 flex items-center justify-between"><div><p className="eyebrow text-gray-400">VIBE AZ</p><h2 className="mt-1 text-2xl font-black">{t.filters}</h2></div><button onClick={()=>setSheet(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white"><X/></button></div><div className="grid gap-3">{controls}</div><div className="mt-6 grid grid-cols-2 gap-2"><button onClick={reset} className="btn btn-light">{t.reset}</button><button onClick={()=>setSheet(false)} className="btn btn-dark">{t.apply} · {list.length}</button></div></motion.div></div>}</AnimatePresence>
  {list.length===0?<div className="grid place-items-center rounded-[2rem] bg-gray-50 py-24 text-center text-gray-500">{t.notFound}</div>:<div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">{list.map(p=><ProductCard p={p} key={p.id}/>)}</div>}
 </>
}
