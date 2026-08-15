'use client';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight,BadgePercent,CalendarClock,Link2,MapPin,MessageCircle,ShieldCheck,TrainFront,Truck} from 'lucide-react';
import {Catalog} from './catalog';
import {useStore} from './store';

export function HomeContent(){
 const{t}=useStore();
 const steps=[[ShieldCheck,t.stepChoose,t.stepChooseSub],[Link2,t.stepLink,t.stepLinkSub],[MessageCircle,t.stepSend,t.stepSendSub]] as const;
 const delivery=[[Truck,t.delivery1,t.delivery1Sub],[CalendarClock,t.delivery2,t.delivery2Sub],[MapPin,t.delivery3,t.delivery3Sub],[TrainFront,t.delivery4,t.delivery4Sub],[BadgePercent,t.delivery5,t.delivery5Sub]] as const;
 const categoryTiles=[{title:t.movement,subtitle:t.movementSub,image:"/products/image_00001.jpg",imageClass:"p-8 sm:p-10"},{title:t.strength,subtitle:t.strengthSub,image:"/products/image_00014.jpg",imageClass:"p-4 sm:p-5"},{title:t.game,subtitle:t.gameSub,image:"/products/image_00012.jpg",imageClass:"p-11 sm:p-14"}] as const;
 return <>
  <section className="hero-wrap container py-4 md:py-8">
   <div className="hero-panel">
    <div className="hero-copy">
     <span className="hero-kicker">VIBE AZ - CURATED GOODS</span>
     <div className="hero-main">
      <h1 className="hero-title">{t.heroTitle}</h1>
      <p className="hero-subtitle">{t.heroSub}</p>
      <Link href="/catalog" className="hero-button">{t.heroCta}<ArrowRight size={17}/></Link>
     </div>
     <div className="hero-meta"><span>01</span><span className="hero-meta-line"/><span>{t.newCollection}</span></div>
    </div>
    <div className="hero-art" aria-hidden="true">
     <span className="hero-orbit hero-orbit-one"/><span className="hero-orbit hero-orbit-two"/>
     <span className="hero-glow"/><span className="hero-dot hero-dot-one"/><span className="hero-dot hero-dot-two"/>
     <span className="hero-year">vibeaz</span>
    </div>
   </div>
  </section>
  <section className="container py-20"><div className="mb-10 max-w-2xl"><span className="eyebrow text-gray-400">{t.collectionDiscover}</span><h2 className="display mt-5 text-4xl sm:text-6xl">{t.rhythmTitle}</h2></div><div className="grid gap-4 md:grid-cols-3">{categoryTiles.map(({title,subtitle,image,imageClass},i)=><Link href="/catalog" key={title} className="group flex flex-col rounded-[2rem] bg-gray-100 p-3 transition-shadow duration-300 hover:shadow-lg"><div className="relative h-[340px] overflow-hidden rounded-[1.35rem] bg-white sm:h-[400px] md:h-[360px] lg:h-[420px]"><Image src={image} alt="" fill sizes="(max-width:768px) 100vw,33vw" className={`object-contain ${imageClass} transition-transform duration-500 group-hover:scale-[1.015]`}/></div><div className="flex h-[156px] flex-col justify-center px-3 py-5 sm:px-4"><span className="eyebrow text-gray-400">0{i+1}</span><h3 className="mt-2 text-2xl font-bold">{title}</h3><p className="mt-1 line-clamp-2 text-sm text-gray-500">{subtitle}</p></div></Link>)}</div></section>
  <section className="container py-20"><div className="mb-12 flex items-end justify-between gap-6"><div><span className="eyebrow text-gray-400">{t.pickedEyebrow}</span><h2 className="display mt-5 text-4xl sm:text-6xl">{t.picked}</h2></div><Link href="/catalog" className="hidden items-center gap-2 text-sm font-bold sm:flex">{t.viewAll} <ArrowRight size={16}/></Link></div><Catalog limit={8}/><div className="mt-14 flex justify-center"><Link href="/catalog" className="btn btn-dark w-full sm:w-auto">{t.viewAllProducts} <ArrowRight size={18}/></Link></div></section>
  <section id="about" className="container py-20"><div className="rounded-[2.5rem] bg-[#f2f2f0] p-7 sm:p-14"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow text-gray-400">{t.howTitle}</span><h2 className="display mt-5 text-4xl sm:text-6xl">{t.howSub}</h2></div><div className="grid gap-3">{steps.map(([I,a,b],i)=><div key={a} className="flex items-center gap-5 rounded-3xl bg-white p-5 sm:p-6"><span className="text-xs font-bold text-gray-300">0{i+1}</span><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-white"><I size={19}/></span><div><b className="text-lg">{a}</b><p className="mt-1 text-sm text-gray-500">{b}</p></div></div>)}</div></div><div className="mt-14 border-t border-black/10 pt-12"><span className="eyebrow text-gray-400">{t.deliveryTitle}</span><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{delivery.map(([I,a,b])=><div key={a} className="rounded-3xl bg-white p-5"><I size={20}/><b className="mt-8 block">{a}</b><p className="mt-2 text-xs leading-relaxed text-gray-500">{b}</p></div>)}</div></div></div></section>
 </>;
}
