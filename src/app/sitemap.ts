import type {MetadataRoute} from 'next';
import {products} from '@/data/products';
import {categories} from '@/data/categories';
const base='https://vibe.az';
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return [{url:`${base}/`,lastModified:now,changeFrequency:'weekly',priority:1},{url:`${base}/catalog/`,lastModified:now,changeFrequency:'daily',priority:.9},...categories.map(c=>({url:`${base}/catalog/?category=${encodeURIComponent(c.id)}`,lastModified:now,changeFrequency:'weekly' as const,priority:.7})),...products.map(p=>({url:`${base}/product/${p.id}/`,lastModified:now,changeFrequency:'weekly' as const,priority:.8}))]}
