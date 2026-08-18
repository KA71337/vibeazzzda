import type {Metadata} from 'next';
import {SITE_URL} from '@/lib/seo';

export const metadata:Metadata={
 title:'Səbət',
 description:'VIBE AZ səbətinizdə seçdiyiniz məhsulları nəzərdən keçirin və sifariş linki yaradın.',
 alternates:{canonical:`${SITE_URL}/cart/`},
 robots:{index:false,follow:false},
};

export default function CartLayout({children}:{children:React.ReactNode}){return children;}
