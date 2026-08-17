'use client';
import {motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {useMemo,useState} from 'react';
import {Check,Heart,Minus,Plus,ShieldCheck,ShoppingBag,Truck,Zap} from 'lucide-react';
import {Product} from '@/data/products';
import {isInStock} from '@/lib/stock';
import {useStore} from './store';
import {ProductImage} from './product-image';
import {StockOverlay,stockImageClass} from './stock-status';

/**
 * Height budget for a portrait frame. A tall photo trades width for height inside it instead of
 * growing past the fold and pushing the buy box off screen.
 */
const TALL='min(880px, 86vh)';

/**
 * The frame borrows the photo's own ratio, so `object-contain` fills it edge to edge — no grey
 * letterbox bands and no small square adrift in a big box. Portrait shots cap their width from
 * `TALL`, so the frame shrinks with the photo rather than wrapping it in empty space. Ratios are
 * clamped: one panorama or sliver would otherwise flatten the whole gallery. 1:1 is the default —
 * four of five files here are square, and it is the ratio a square photo snaps to on load.
 */
const frame=(r?:number)=>{const a=Math.min(1.6,Math.max(.6,r||1));return{aspectRatio:a,maxWidth:a<1?`calc(${a} * ${TALL})`:undefined}};

/** Zero-width marks ride along with the scraped copy and would show up as stray indents. */
const INVISIBLE=/[\u200b-\u200f\u2060\ufeff]/g;
/** Scraped descriptions are one spec per line, so every line becomes its own paragraph. */
const paragraphs=(text:string)=>text.split('\n').map(l=>l.replace(INVISIBLE,'').trim()).filter(Boolean);

export function ProductDetail({p}:{p:Product}){
 const[img,setImg]=useState(0),[qty,setQty]=useState(1),[ratios,setRatios]=useState<Record<number,number>>({});
 const{add,toggleFav,favorites,t}=useStore(),router=useRouter(),fav=favorites.includes(p.id);
 const available=isInStock(p),addQuantity=()=>available&&add(p,qty);
 const many=p.images.length>1,{aspectRatio,maxWidth}=frame(ratios[img]);
 const lines=useMemo(()=>paragraphs(p.description),[p.description]);
 // Long spec sheets read as two columns on desktop; short blurbs stay a single column.
 const twoCol=p.description.length>700;
 return <section className="container pb-14 pt-4 sm:pb-20 sm:pt-8">
  <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(370px,.82fr)] lg:gap-10 xl:gap-14">
   <div data-gallery className="min-w-0">
    <div className="mx-auto w-full" style={{maxWidth}}>
     <motion.div data-gallery-frame key={img} initial={{opacity:.65}} animate={{opacity:1}} transition={{duration:.2}} style={{aspectRatio}} className="relative w-full overflow-hidden rounded-[1.5rem] border border-black/[.07] bg-white shadow-[0_18px_55px_rgba(0,0,0,.07)] sm:rounded-[2rem]">
      <ProductImage src={p.images[img]} alt={p.name} priority sizes="(max-width:1024px) 100vw, 60vw" className={`object-contain ${stockImageClass(available)}`} onRatio={r=>setRatios(m=>m[img]===r?m:{...m,[img]:r})}/>
      <StockOverlay inStock={available} label={t.outOfStock}/>
      {many&&<span className="absolute bottom-3 right-3 z-20 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur sm:bottom-4 sm:right-4">{img+1} / {p.images.length}</span>}
     </motion.div>
     {/* Scrolls sideways on phones; wraps on desktop so the last thumbnail is never sliced off. */}
     {many&&<div className="nice-scroll -mx-1 mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-2 sm:mt-4 sm:flex-wrap sm:snap-none sm:gap-3 sm:overflow-visible sm:pb-0">{p.images.map((x,i)=><button key={`${x}-${i}`} onClick={()=>setImg(i)} aria-label={`${p.name}, ${t.image.toLocaleLowerCase()} ${i+1}`} aria-pressed={i===img} className={`relative h-[68px] w-[68px] shrink-0 snap-start overflow-hidden rounded-2xl border bg-white transition sm:h-[84px] sm:w-[84px] ${i===img?'border-black ring-1 ring-black':'border-black/10 opacity-60 hover:opacity-100'}`}><ProductImage src={x} alt="" sizes="84px" className={`object-contain p-1 ${stockImageClass(available)}`}/></button>)}</div>}
    </div>
   </div>
   <aside data-info className="min-w-0 lg:sticky lg:top-24">
    <div className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,.08)] sm:rounded-[2rem] sm:p-7 xl:p-8">
     <span className="eyebrow text-gray-400">VIBE AZ · {t.product} #{p.id}</span>
     <h1 className="mt-3 break-words text-2xl font-black leading-[1.08] tracking-[-.035em] sm:text-[2.1rem]">{p.name}</h1>
     <div className="mt-4 flex flex-wrap items-center gap-3">{p.newPrice!==null?<><strong className="text-3xl font-black">{p.newPrice} AZN</strong><s className="text-lg text-gray-400">{p.price} AZN</s></>:<strong className="text-3xl font-black">{p.price} AZN</strong>}{!available&&<span className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700">{t.outOfStock}</span>}</div>
     <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-black/10 py-4"><span className="text-sm font-semibold">{t.qty}</span><div className="flex items-center rounded-full bg-gray-100 p-1"><button disabled={!available} aria-label={t.decrease} onClick={()=>setQty(x=>Math.max(1,x-1))} className="grid h-10 w-10 place-items-center rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-45"><Minus size={15}/></button><b className="w-12 text-center">{qty}</b><button disabled={!available} aria-label={t.increase} onClick={()=>setQty(x=>Math.min(999,x+1))} className="grid h-10 w-10 place-items-center rounded-full bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"><Plus size={15}/></button></div></div>
     <button disabled={!available} onClick={addQuantity} className="btn btn-dark mt-5 w-full py-4 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"><ShoppingBag size={19}/>{available?t.add:t.outOfStock}</button>
     <div className="mt-3 grid grid-cols-[1fr_auto] gap-3"><button disabled={!available} onClick={()=>{addQuantity();router.push('/cart')}} className="btn btn-light disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"><Zap size={18}/>{available?t.buyNow:t.outOfStock}</button><button aria-label={fav?t.removeFav:t.addFav} onClick={()=>toggleFav(p.id)} className={`grid h-12 w-12 place-items-center rounded-full border transition ${fav?'border-black bg-black text-white':'border-gray-200 hover:border-black'}`}><Heart size={19} fill={fav?'currentColor':'none'}/></button></div>
     <div className="mt-6 grid gap-3 text-sm text-gray-600"><p className="flex items-center gap-3"><ShieldCheck size={18} className="shrink-0 text-black"/>{t.productData}</p><p className="flex items-center gap-3"><Truck size={18} className="shrink-0 text-black"/>{t.deliveryAzerbaijan}</p><p className="flex items-center gap-3"><Check size={18} className="shrink-0 text-black"/>{t.simpleOrderLink}</p></div>
    </div>
    {/* Keeps the info column close to the gallery height instead of leaving a white gap beside it. */}
    <div className="mt-3 rounded-[1.5rem] bg-[#f5f5f3] p-5 sm:mt-4 sm:rounded-[2rem] sm:p-6">
     <span className="eyebrow text-gray-400">{t.deliveryTitle}</span>
     <div className="mt-4 grid gap-3 text-sm">{([[t.delivery1,t.delivery1Sub],[t.delivery4,t.delivery4Sub],[t.delivery5,t.delivery5Sub]] as const).map(([a,b])=><div key={a} className="flex gap-3"><span aria-hidden="true" className="mt-[.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-black"/><p className="min-w-0"><b>{a}</b><span className="mt-1 block leading-6 text-gray-500">{b}</span></p></div>)}</div>
    </div>
   </aside>
  </div>
  {/* Full width, under the gallery: a spec sheet squeezed into the buy column reads as a ribbon. */}
  <div data-desc className="mt-11 border-t border-black/10 pt-8 sm:mt-14 sm:pt-11">
   <span className="eyebrow text-gray-400">VIBE AZ · {t.description}</span>
   <h2 className="display mt-3 text-[1.7rem] sm:text-[2.6rem]">{t.details}</h2>
   <div className="mt-5 rounded-[1.5rem] bg-[#f5f5f3] p-5 sm:mt-7 sm:rounded-[2.25rem] sm:p-9 lg:p-11">
    <div data-desc-text className={`w-full max-w-none text-[15px] leading-[1.8] text-gray-700 [&>p:last-child]:mb-0 [&>p]:mb-[.7rem] sm:text-base ${twoCol?'lg:columns-2 lg:gap-x-14 xl:gap-x-20':''}`}>
     {lines.map((l,i)=><p key={i} className={`break-words ${l.length<200?'break-inside-avoid':''}`}>{l}</p>)}
    </div>
   </div>
  </div>
 </section>
}
