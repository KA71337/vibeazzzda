import type {Metadata} from 'next';
import {SITE_URL} from '@/lib/seo';

export const metadata:Metadata={
 title:'Seçilmişlər',
 description:'VIBE AZ-da yadda saxladığınız məhsullara baxın.',
 alternates:{canonical:`${SITE_URL}/favorites/`},
 robots:{index:false,follow:false},
};

export default function FavoritesLayout({children}:{children:React.ReactNode}){return children;}
