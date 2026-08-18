import type {Metadata} from 'next';
import Link from 'next/link';
import {SITE_URL} from '@/lib/seo';

export const metadata:Metadata={
 title:'Səhifə tapılmadı',
 description:'Axtardığınız VIBE AZ səhifəsi mövcud deyil.',
 alternates:{canonical:SITE_URL},
 robots:{index:false,follow:false},
};

export default function NotFound(){
 return <section className="container grid min-h-[60vh] place-items-center py-20 text-center"><div><p className="eyebrow text-gray-400">VIBE AZ · 404</p><h1 className="display mt-4 text-4xl sm:text-6xl">Səhifə tapılmadı</h1><p className="mx-auto mt-4 max-w-md text-gray-500">Axtardığınız ünvan mövcud deyil və ya artıq dəyişib.</p><Link href="/" className="btn btn-dark mt-7">Ana səhifəyə qayıt</Link></div></section>;
}
