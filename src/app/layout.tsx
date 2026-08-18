import type {Metadata} from 'next';
import './globals.css';
import {StoreProvider} from '@/components/store';
import {Shell} from '@/components/shell';
import {INSTAGRAM_URL,TIKTOK_URL,WHATSAPP_URL} from '@/components/social';
import {absoluteUrl,ORGANIZATION_ID,SITE_DESCRIPTION,SITE_KEYWORDS,SITE_LOCALE,SITE_NAME,SITE_URL,safeJsonLd} from '@/lib/seo';

const siteTitle='VIBE AZ — İdman və Əyləncə Məhsulları Azərbaycanda';

export const metadata:Metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:siteTitle,template:'%s | VIBE AZ'},
 description:SITE_DESCRIPTION,
 keywords:SITE_KEYWORDS,
 alternates:{canonical:SITE_URL},
 icons:{
  icon:[
   {url:'/favicon.ico',type:'image/x-icon',sizes:'any'},
   {url:'/favicon-48.png',type:'image/png',sizes:'48x48'},
   {url:'/favicon-96.png',type:'image/png',sizes:'96x96'},
   {url:'/favicon-144.png',type:'image/png',sizes:'144x144'},
  ],
  shortcut:{url:'/favicon-48.png',type:'image/png',sizes:'48x48'},
  apple:{url:'/apple-touch-icon.png',type:'image/png',sizes:'180x180'},
 },
 manifest:'/manifest.webmanifest',
 openGraph:{
  type:'website',
  locale:SITE_LOCALE,
  url:SITE_URL,
  siteName:SITE_NAME,
  title:siteTitle,
  description:SITE_DESCRIPTION,
  images:[{url:absoluteUrl('/logo.jpeg'),width:800,height:800,alt:'VIBE AZ loqosu'}],
 },
 twitter:{card:'summary_large_image',title:siteTitle,description:SITE_DESCRIPTION,images:[absoluteUrl('/logo.jpeg')]},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true}},
};

const organizationJsonLd={
 '@context':'https://schema.org',
 '@type':'Organization',
 '@id':ORGANIZATION_ID,
 name:SITE_NAME,
 url:SITE_URL,
 logo:absoluteUrl('/logo.jpeg'),
 description:SITE_DESCRIPTION,
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
