import type {Metadata} from 'next';
import {SITE_URL} from '@/lib/seo';

export const metadata:Metadata={
 title:'Sifariş',
 description:'VIBE AZ paylaşılmış sifariş linkinin məzmununu göstərir.',
 alternates:{canonical:`${SITE_URL}/order/`},
 robots:{index:false,follow:false},
};

export default function OrderLayout({children}:{children:React.ReactNode}){return children;}
