'use client';
import Link from 'next/link';
import {Heart,Plus} from 'lucide-react';
import {motion} from 'framer-motion';
import {Product} from '@/data/products';
import {useStore} from './store';
import {ProductImageFrame} from './product-image-frame';

export function ProductCard({p}:{p:Product}){
 const{add,t,toggleFav,favorites}=useStore();
 const fav=favorites.includes(p.id),sale=p.newPrice!==null;
 return <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.42,ease:[.22,1,.36,1]}} whileHover={{y:-6}} className={'group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-black/[.08] bg-white shadow-[0_12px_35px_rgba(0,0,0,.04)]'}>
  <div className={'relative p-2 pb-0 sm:p-3 sm:pb-0'}>
   <Link href={`/product/${p.id}`} className={'block'} aria-label={p.name}><ProductImageFrame src={p.images[0]} alt={p.name} imageClassName={'transition duration-700 ease-out group-hover:scale-[1.035]'} sizes={'(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw'}/></Link>
   {sale&&<span className={'absolute left-4 top-4 rounded-full bg-[#ff4d2e] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white sm:left-5 sm:top-5'}>SALE</span>}
   <button aria-label={fav?t.removeFav:t.addFav} onClick={()=>toggleFav(p.id)} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-sm ring-1 ring-black/5 transition hover:scale-105 sm:right-5 sm:top-5 ${fav?'text-black':'text-gray-500'}`}><Heart size={18} fill={fav?'currentColor':'none'}/></button>
  </div>
  <div className={'flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4'}>
   <Link href={`/product/${p.id}`}><h3 className={'line-clamp-2 min-h-11 text-sm font-semibold leading-snug sm:text-base'}>{p.name}</h3></Link>
   <div className={'mt-auto flex min-h-14 items-end justify-between gap-2 pt-3'}>
    <div className={'min-w-0'}>{sale&&<div className={'text-xs text-gray-400 line-through'}>{p.price} AZN</div>}<div className={'text-base font-black sm:text-lg'}>{sale?p.newPrice:p.price} AZN</div></div>
    <button onClick={()=>add(p)} aria-label={t.add} className={'grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-white shadow-lg transition hover:scale-105'}><Plus size={19}/></button>
   </div>
  </div>
 </motion.article>;
}
