import type { Config } from 'tailwindcss';
export default { content:['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme:{extend:{fontFamily:{sans:['var(--font-inter)','Arial','sans-serif']}}}, plugins:[] } satisfies Config;
