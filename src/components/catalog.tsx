'use client';
import {useMemo,useState} from 'react';import {LayoutGrid,Search,SlidersHorizontal} from 'lucide-react';import {products} from '@/data/products';import {categories} from '@/data/categories';import {ProductCard} from './product-card';import {useStore} from './store';
export function Catalog({limit}:{limit?:number}){
 const{t,lang}=useStore();
 const[q,setQ]=useState(''),[min,setMin]=useState(''),[max,setMax]=useState(''),[sort,setSort]=useState('new'),[cat,setCat]=useState('');
 // Only offer categories that actually have products behind them.
 const available=useMemo(()=>{const used=new Set(products.map(p=>p.category).filter(Boolean));return categories.filter(c=>used.has(c.id))},[]);
 const list=useMemo(()=>{
  const x=products.filter(p=>(p.name+' '+p.description).toLowerCase().includes(q.toLowerCase())&&(!min||p.price>=+min)&&(!max||p.price<=+max)&&(!cat||p.category===cat));
  if(sort==='low')x.sort((a,b)=>a.price-b.price);
  if(sort==='high')x.sort((a,b)=>b.price-a.price);
  if(sort==='new')x.sort((a,b)=>b.id-a.id);
  return limit?x.slice(0,limit):x;
 },[q,min,max,sort,cat,limit]);
 return <>
  <div className="mb-8 grid gap-3 rounded-3xl bg-gray-50 p-4 md:grid-cols-[1fr_120px_120px_minmax(150px,1fr)_minmax(150px,1fr)]">
   <label className="flex items-center gap-2 rounded-2xl bg-white px-4"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search} className="h-12 w-full min-w-0 bg-transparent outline-none"/></label>
   <input value={min} onChange={e=>setMin(e.target.value)} type="number" inputMode="numeric" placeholder={t.priceMin} aria-label={t.priceMin} className="h-12 w-full rounded-2xl bg-white px-4 outline-none"/>
   <input value={max} onChange={e=>setMax(e.target.value)} type="number" inputMode="numeric" placeholder={t.priceMax} aria-label={t.priceMax} className="h-12 w-full rounded-2xl bg-white px-4 outline-none"/>
   <label className="flex items-center gap-2 rounded-2xl bg-white px-4"><SlidersHorizontal size={17} className="shrink-0"/><select value={sort} onChange={e=>setSort(e.target.value)} aria-label={t.sortNew} className="h-12 w-full min-w-0 bg-transparent outline-none"><option value="new">{t.sortNew}</option><option value="low">{t.sortLow}</option><option value="high">{t.sortHigh}</option></select></label>
   <label className="flex items-center gap-2 rounded-2xl bg-white px-4"><LayoutGrid size={17} className="shrink-0"/><select value={cat} onChange={e=>setCat(e.target.value)} aria-label={t.category} className="h-12 w-full min-w-0 bg-transparent outline-none"><option value="">{t.allCategories}</option>{available.map(c=><option key={c.id} value={c.id}>{c[lang]}</option>)}</select></label>
  </div>
  {list.length===0
   ?<div className="grid place-items-center rounded-3xl bg-gray-50 py-24 text-center text-gray-500">{t.notFound}</div>
   :<div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">{list.map(p=><ProductCard p={p} key={p.id}/>)}</div>}
 </>;
}
