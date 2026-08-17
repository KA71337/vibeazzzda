'use client';
import Link from 'next/link';
import {Heart,ArrowRight} from 'lucide-react';
import {products} from '@/data/products';
import {ProductCard} from '@/components/product-card';
import {useStore} from '@/components/store';
export default function Page(){const{favorites,t}=useStore(),list=products.filter(p=>favorites.includes(p.id));return <section className="container py-8 sm:py-14"><header className="mb-10 flex flex-col justify-between gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end"><div><p className="eyebrow text-gray-400">VIBE AZ · {t.curated}</p><h1 className="display mt-3 text-4xl sm:text-6xl">{t.favorites}</h1></div><p className="text-sm font-semibold text-gray-400">{list.length} {t.results}</p></header>{list.length?<div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<div className="grid min-h-[420px] place-items-center rounded-[2rem] bg-[#f5f5f3] p-8 text-center"><div><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white"><Heart size={30}/></span><h2 className="mt-6 text-2xl font-black">{t.empty}</h2><p className="mx-auto mt-2 max-w-sm text-gray-500">{t.favoriteHint}</p><Link href="/catalog" className="btn btn-dark mt-6">{t.goCatalog}<ArrowRight size={17}/></Link></div></div>}</section>}
