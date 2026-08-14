// Brand glyphs. lucide-react ships no brand icons, and public/_headers sets a
// strict CSP without remote img-src, so these must be inline SVG.
export const WHATSAPP_URL = 'https://wa.me/994998083080';
export const TIKTOK_URL = 'https://www.tiktok.com/@vibe.az.official8';

type IconProps = {size?: number; className?: string};

export function WhatsAppIcon({size = 20, className}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 1.84c2.14 0 4.16.84 5.68 2.36a7.99 7.99 0 0 1 2.35 5.67c0 4.43-3.6 8.02-8.03 8.02a8 8 0 0 1-4.08-1.12l-.29-.17-3.03.79.81-2.95-.19-.3a8 8 0 0 1-1.22-4.27c0-4.43 3.6-8.03 8-8.03z" />
    </svg>
  );
}

export function TikTokIcon({size = 20, className}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12v-3.2a5.7 5.7 0 0 0-.77-.05A5.72 5.72 0 0 0 4.14 15.3 5.72 5.72 0 0 0 9.86 21a5.72 5.72 0 0 0 5.72-5.72V9.01a7.35 7.35 0 0 0 4.28 1.37V7.29a4.29 4.29 0 0 1-3.26-1.47z" />
    </svg>
  );
}
