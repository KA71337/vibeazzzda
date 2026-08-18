import type {MetadataRoute} from 'next';
import {SITE_DESCRIPTION,SITE_NAME,SITE_URL} from '@/lib/seo';

export default function manifest():MetadataRoute.Manifest{
 return {
  name:'VIBE AZ — İdman və Əyləncə Məhsulları Azərbaycanda',
  short_name:SITE_NAME,
  description:SITE_DESCRIPTION,
  id:'/',
  start_url:SITE_URL+'/',
  scope:'/',
  lang:'az-AZ',
  display:'standalone',
  background_color:'#ffffff',
  theme_color:'#111111',
  icons:[
   {src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},
   {src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'},
  ],
 };
}
