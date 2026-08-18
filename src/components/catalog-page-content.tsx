'use client';

import Link from 'next/link';
import {Catalog} from './catalog';
import {useStore} from './store';
import {categories} from '@/data/categories';
import {categoryPath,categorySeoDescription} from '@/lib/seo';
import {products} from '@/data/products';

const catalogTitles={
 az:'İdman və əyləncə məhsulları kataloqu',
 ru:'Каталог товаров для спорта и отдыха',
 en:'Sports and leisure products catalog',
} as const;

export function CatalogPageContent({categoryId}:{categoryId?:string}){
 const{t,lang}=useStore();
 const category=categoryId?categories.find(item=>item.id===categoryId):undefined;
 const heading=category?category[lang]:catalogTitles[lang];
 const intro=category
  ? lang==='az'?categorySeoDescription(category.id):`${heading}. ${t.catalogIntro}`
  : t.catalogIntro;
 const usedCategories=categories.filter(item=>products.some(product=>product.category===item.id));
 return <section className="container py-10 md:py-16">
  <header className="mb-8 grid gap-6 border-b border-black/10 pb-10 md:grid-cols-[1fr_auto] md:items-end">
   <div>
    <p className="eyebrow text-gray-400">VIBE AZ · {category?category[lang]:'2026'}</p>
    <h1 className="display mt-5 text-4xl sm:text-6xl">{heading}</h1>
   </div>
   <p className="max-w-xl text-sm leading-relaxed text-gray-500">{intro}</p>
  </header>
  <nav aria-label={t.category} className="mb-8 flex flex-wrap gap-2">
   <Link href="/catalog/" className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-black ${!category?'border-black bg-black text-white':'border-black/10 bg-white'}`}>{t.allCategories}</Link>
   {usedCategories.map(item=><Link key={item.id} href={categoryPath(item.id)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-black ${category?.id===item.id?'border-black bg-black text-white':'border-black/10 bg-white'}`}>{item[lang]}</Link>)}
  </nav>
  <Catalog initialCategory={category?.id}/>
 </section>;
}
