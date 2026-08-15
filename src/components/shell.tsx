'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {Grid2X2,Heart,Home,Menu,Search,ShoppingBag,X,type LucideIcon} from 'lucide-react';
import {useStore} from './store';
import {CartDrawer} from './cart-drawer';
import {SearchOverlay} from './search-overlay';
import {Toasts} from './toast';
import {INSTAGRAM_URL,InstagramIcon,TIKTOK_URL,TikTokIcon,WHATSAPP_URL,WhatsAppIcon} from './social';

export function Shell({children}:{children:React.ReactNode}){
 const pathname=usePathname();
 const{cart,t,lang,setLang,setDrawer,setSearchOpen}=useStore();
 const[menu,setMenu]=useState(false),[compact,setCompact]=useState(false);
 useEffect(()=>{const onScroll=()=>setCompact(window.scrollY>28);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 if(pathname.startsWith('/admin'))return <>{children}</>;
 const count=cart.reduce((s,x)=>s+x.qty,0);
 const nav=[['/',t.home],['/catalog',t.catalog],['/#about',t.about],['/#contact',t.contact]];
 const iconButton='grid h-11 w-11 place-items-center rounded-full transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2';
 return <>
  <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${compact?'pt-2':'pt-4 md:pt-6'}`}>
   <div className={`container transition-all duration-300 ${compact?'max-w-[1240px]':''}`}>
    <div className={`flex items-center justify-between gap-4 border border-black/10 bg-white/95 px-3 shadow-[0_12px_45px_rgba(0,0,0,.08)] backdrop-blur-xl transition-all duration-300 ${compact?'h-16 rounded-[1.25rem]':'h-[4.75rem] rounded-[1.5rem] md:px-5'}`}>
     <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="VIBE AZ — Ana səhifə"><Image src="/logo.jpeg" alt="VIBE AZ" width={48} height={48} className={`rounded-full object-cover transition-all ${compact?'h-10 w-10':'h-11 w-11'}`}/><span className="hidden text-sm font-black tracking-[.2em] sm:block">VIBE AZ</span></Link>
     <nav className="hidden items-center gap-1 rounded-full bg-gray-50 p-1 md:flex">{nav.map(([h,n])=><Link key={h} href={h} className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white hover:shadow-sm ${pathname===h?'bg-white shadow-sm':''}`}>{n}</Link>)}</nav>
     <div className="flex min-w-0 items-center gap-0.5">
      <button aria-label={t.searchTitle} onClick={()=>setSearchOpen(true)} className={`${iconButton} hidden min-[370px]:grid`}><Search size={19}/></button>
      <Link aria-label={t.favorites} href="/favorites" className={`${iconButton} hidden sm:grid`}><Heart size={19}/></Link>
      <button aria-label={t.cart} onClick={()=>setDrawer(true)} className={`${iconButton} relative shrink-0`}><ShoppingBag size={19}/>{count>0&&<span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] text-white ring-2 ring-white">{count}</span>}</button>
      <div className="ml-1 flex shrink-0 items-center rounded-full border border-black/10 bg-gray-50 p-0.5" role="group" aria-label="Dil / Язык / Language">
       {(['az','ru','en'] as const).map(x=><button key={x} type="button" onClick={()=>setLang(x)} aria-pressed={lang===x} aria-label={{az:'Azərbaycan dili',ru:'Русский язык',en:'English'}[x]} className={`grid h-8 min-w-7 place-items-center rounded-full px-1 text-[10px] font-extrabold uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 sm:min-w-8 sm:text-[11px] ${lang===x?'bg-black text-white shadow-sm':'text-gray-500 hover:bg-white hover:text-black'}`}>{x}</button>)}
      </div>
      <button onClick={()=>setMenu(!menu)} aria-label={t.menu} aria-expanded={menu} className={`${iconButton} md:hidden`}>{menu?<X size={20}/>:<Menu size={20}/>}</button>
     </div>
    </div>
    {menu&&<div className="mt-2 rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-xl md:hidden"><nav className="grid gap-1">{nav.map(([h,n])=><Link onClick={()=>setMenu(false)} key={h} href={h} className="rounded-xl px-3 py-3 font-semibold hover:bg-gray-50">{n}</Link>)}</nav><div className="mt-4 flex items-center justify-end border-t pt-4"><div className="flex"><a aria-label="WhatsApp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={iconButton}><WhatsAppIcon size={18}/></a><a aria-label="TikTok" href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className={iconButton}><TikTokIcon size={18}/></a><a aria-label="Instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={iconButton}><InstagramIcon size={18}/></a></div></div></div>}
   </div>
  </header>
  <main className="pt-24 md:pt-28">{children}</main>
  <footer id="contact" className="mt-24 bg-black text-white"><div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_.8fr_.8fr]"><div><Image src="/logo.jpeg" alt="VIBE AZ" width={72} height={72} className="h-16 w-16 rounded-full object-cover"/><p className="mt-6 max-w-sm text-2xl font-semibold leading-tight">{t.footerClaim}</p><p className="mt-4 text-sm text-white/50">{t.tagline}</p></div><div className="grid content-start gap-3 text-sm"><b className="mb-3 text-xs uppercase tracking-[.24em] text-white/40">{t.navigation}</b>{nav.map(([h,n])=><Link key={h} href={h} className="w-fit transition hover:text-white/55">{n}</Link>)}</div><div className="grid content-start gap-3"><b className="mb-3 text-xs uppercase tracking-[.24em] text-white/40">{t.contactUs}</b><a className="w-fit text-lg font-semibold" href="tel:+994998083080">(099) 808-30-80</a><a className="w-fit text-lg font-semibold" href="tel:+994771152775">(077) 115-27-75</a><div className="mt-3 flex gap-2"><a aria-label="WhatsApp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black"><WhatsAppIcon size={19}/></a><a aria-label="TikTok" href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black"><TikTokIcon size={19}/></a><a aria-label="Instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black"><InstagramIcon size={19}/></a></div></div></div><div className="container flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 VIBE AZ</span><span>{t.location}</span></div></footer>
  <nav aria-label={t.navigation} className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-black/10 bg-white/95 px-2 pt-2 shadow-[0_-12px_35px_rgba(0,0,0,.1)] backdrop-blur md:hidden" style={{paddingBottom:'max(.5rem, env(safe-area-inset-bottom))'}}>{([[Home,t.home,'/'],[Grid2X2,t.catalog,'/catalog'],[Heart,t.favorites,'/favorites'],[ShoppingBag,t.cart,'/cart']] as [LucideIcon,string,string][]).map(([Icon,n,h])=>{const active=h==='/'?pathname==='/':pathname.startsWith(h);return <Link aria-current={active?'page':undefined} key={h} href={h} className={`relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold transition ${active?'bg-black text-white':'text-gray-500'}`}><Icon size={20}/><span className="max-w-full truncate">{n}</span>{h==='/cart'&&count>0&&<span className={`absolute right-[20%] top-0 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] ${active?'bg-white text-black':'bg-black text-white'}`}>{count}</span>}</Link>})}</nav>
  <SearchOverlay/><CartDrawer/><Toasts/>
 </>;
}
