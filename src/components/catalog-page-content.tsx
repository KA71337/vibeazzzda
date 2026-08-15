'use client';
import {Catalog} from './catalog';
import {useStore} from './store';
export function CatalogPageContent(){const{t}=useStore();return <section className="container py-10 md:py-16"><header className="mb-12 grid gap-6 border-b border-black/10 pb-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-gray-400">VIBE AZ · 2026</p><h1 className="display mt-5 text-5xl sm:text-7xl">{t.catalog}</h1></div><p className="max-w-sm text-sm leading-relaxed text-gray-500">{t.catalogIntro}</p></header><Catalog/></section>}
