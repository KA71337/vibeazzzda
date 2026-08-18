import type {NextConfig} from 'next';

const isDevelopment=process.env.NODE_ENV==='development';
const contentSecurityPolicy=[
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment?" 'unsafe-eval'":''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDevelopment?' ws: http: https:':''}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  ...(isDevelopment?[]:['upgrade-insecure-requests']),
].join('; ');

const securityHeaders=[
  {key:'Content-Security-Policy',value:contentSecurityPolicy},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'X-Frame-Options',value:'DENY'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()'},
  {key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains; preload'},
  {key:'Cross-Origin-Opener-Policy',value:'same-origin'},
  {key:'Cross-Origin-Resource-Policy',value:'same-origin'},
  {key:'Origin-Agent-Cluster',value:'?1'},
];

const nextConfig:NextConfig={
  trailingSlash:true,
  poweredByHeader:false,
  reactStrictMode:true,
  productionBrowserSourceMaps:false,
  turbopack:{root:process.cwd()},
  async redirects(){return [
    {source:'/:path*',has:[{type:'host',value:'vibe.az'}],destination:'https://vibeaz.org/:path*',permanent:true},
    {source:'/:path*',has:[{type:'host',value:'vibeaz.vercel.app'}],destination:'https://vibeaz.org/:path*',permanent:true},
    {source:'/:path*',has:[{type:'host',value:'vibeazzz.vercel.app'}],destination:'https://vibeaz.org/:path*',permanent:true},
  ]},
  async headers(){return [
    {source:'/:path*',headers:securityHeaders},
    {source:'/admin/:path*',headers:[{key:'Cache-Control',value:'no-store, max-age=0, must-revalidate'},{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]},
    {source:'/api/admin/:path*',headers:[{key:'Cache-Control',value:'no-store, max-age=0, must-revalidate'},{key:'Vary',value:'Cookie, Origin'},{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]},
  ]},
};

export default nextConfig;
