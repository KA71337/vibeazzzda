import type {Metadata} from 'next';
import {CatalogPageContent} from '@/components/catalog-page-content';

export const metadata:Metadata={
 title:'Kataloq',
 description:'VIBE AZ idman, aktiv həyat, sağlamlıq və əyləncə məhsulları kataloqu.',
 alternates:{canonical:'/catalog/'},
 openGraph:{url:'/catalog/',title:'Kataloq | VIBE AZ',description:'İdman, aktiv həyat, sağlamlıq və əyləncə üçün seçilmiş məhsullar.'},
 twitter:{card:'summary_large_image',title:'Kataloq | VIBE AZ',description:'İdman, aktiv həyat, sağlamlıq və əyləncə üçün seçilmiş məhsullar.'},
};

export default function Page(){return <CatalogPageContent/>}
