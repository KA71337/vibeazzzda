import type {Metadata} from 'next';
import './globals.css';
import {StoreProvider} from '@/components/store';
import {Shell} from '@/components/shell';
import {INSTAGRAM_URL,TIKTOK_URL,WHATSAPP_URL} from '@/components/social';
import {absoluteUrl,ORGANIZATION_ID,SITE_LOCALE,SITE_NAME,SITE_URL,safeJsonLd} from '@/lib/seo';

const siteTitle='VIBE AZ — İdman və Əyləncə Məhsulları Azərbaycanda';
const siteDescription='VIBE AZ-da Azərbaycanda idman, fitnes, oyun və aktiv həyat üçün seçilmiş məhsullara baxın. Bakı və ölkədaxili çatdırılma üçün sifariş linki yaradın.';

export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:siteTitle,template:'%s | VIBE AZ'},
 description:siteDescription,
 alternates:{canonical:SITE_URL},
 icons:{icon:'/logo.jpeg',apple:'/logo.jpeg'},
 openGraph:{
  type:'website',
  locale:SITE_LOCALE,
  url:SITE_URL,
  siteName:SITE_NAME,
  title:siteTitle,
  description:siteDescription,
  images:[{url:absoluteUrl('/logo.jpeg'),width:800,height:800,alt:'VIBE AZ loqosu'}],
 },
 twitter:{card:'summary_large_image',title:siteTitle,description:siteDescription,images:[absoluteUrl('/logo.jpeg')]},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true}},
};

const organizationJsonLd={
 '@context':'https://schema.org',
 '@type':'Organization',
 '@id':ORGANIZATION_ID,
 name:SITE_NAME,
 url:SITE_URL,
 logo:absoluteUrl('/logo.jpeg'),
 description:siteDescription,
 areaServed:{'@type':'Country',name:'Azerbaijan'},
 contactPoint:[
  {
   '@type':'ContactPoint',
   telephone:'+994998083080',
   contactType:'customer service',
   areaServed:'AZ',
   availableLanguage:['az','ru','en'],
  },
 ],
 sameAs:[WHATSAPP_URL,TIKTOK_URL,INSTAGRAM_URL],
};

const websiteJsonLd={
 '@context':'https://schema.org',
 '@type':'WebSite',
 '@id':`${SITE_URL}/#website`,
 url:SITE_URL,
 name:SITE_NAME,
 inLanguage:SITE_LOCALE,
 publisher:{'@id':ORGANIZATION_ID},
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="az">
  <body>
   <StoreProvider><Shell>{children}</Shell></StoreProvider>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(organizationJsonLd)}}/>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(websiteJsonLd)}}/>
  </body>
 </html>;
}
