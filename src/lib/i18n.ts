export type Lang='az'|'ru'|'en';
export const DEFAULT_LANG:Lang='az';
export const isLang=(value:unknown):value is Lang=>value==='az'||value==='ru'||value==='en';
