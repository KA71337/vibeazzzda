import type {Product} from '@/data/products';
import {categories,categoryLabel,type CategoryId} from '@/data/categories';

export const SITE_URL='https://vibeaz.org';
export const SITE_NAME='VIBE AZ';
export const SITE_LOCALE='az_AZ';
export const SITE_DESCRIPTION='VIBE AZ Bakı (VIBE AZ Baki / VIBE AZ Baku): Azərbaycanda idman, fitnes, oyun və aktiv həyat məhsulları. Bakı və ölkədaxili çatdırılma üçün seçim və sifariş.';
export const SITE_KEYWORDS=['VIBE AZ','vibe az','vibe az baki','vibe az baku','vibe az bakı','idman məhsulları Bakı','idman mağazası Azərbaycan'];
export const ORGANIZATION_ID=`${SITE_URL}/#organization`;

const categoryDescriptions:Record<CategoryId,string>={
 rolik:'Rolik və konki modellərini aktiv həyat, məşq və şəhər gəzintisi üçün müqayisə edin. VIBE AZ kataloqundan Azərbaycana uyğun seçim edin.',
 skuter:'Şəhər hərəkəti üçün elektrik skuterləri kəşf edin. VIBE AZ-da gündəlik istifadə və rahat idarəetmə üçün seçilmiş modellər var.',
 trenajor:'Evdə və məşq zalında istifadə üçün trenajorlar və idman avadanlıqları. Məqsədinizə uyğun məşq seçimini VIBE AZ kataloqunda tapın.',
 agirliq:'Ağırlıq və fitnes avadanlıqları ilə güc məşqlərinizi qurun. VIBE AZ Azərbaycanda ev və zal məşqləri üçün praktik seçimlər təqdim edir.',
 doyus:'Boks və digər döyüş idmanı üçün geyim və avadanlıqları nəzərdən keçirin. Məşqə uyğun məhsulları VIBE AZ kataloqunda seçin.',
 futbol:'Futbol məşqləri və oyunları üçün toplar, torlar və digər ləvazimatlar. Azərbaycanda futbol məhsullarını VIBE AZ-da müqayisə edin.',
 basketbol:'Basketbol və voleybol üçün oyun, məşq və əyləncə məhsullarını kəşf edin. VIBE AZ-da ailə və komanda üçün seçimlər var.',
 tenis:'Tenis və badminton məşqləri üçün raketka və ləvazimatları seçin. VIBE AZ kataloqunda aktiv oyun üçün real məhsullara baxın.',
 bilyard:'Bilyard çubuqları və oyun aksesuarları ilə ev və klub oyunlarınızı tamamlayın. Uyğun ölçü və model üçün VIBE AZ seçimlərinə baxın.',
 oyun:'Masaüstü oyunlar ailə və dostlarla vaxt keçirmək üçün. VIBE AZ-da ev əyləncəsi üçün müxtəlif oyun məhsullarını kəşf edin.',
 masaj:'Masaj və sağlamlıq məhsulları ilə gündəlik rahatlığınızı dəstəkləyin. VIBE AZ kataloqunda istifadə məqsədinizə uyğun seçimlərə baxın.',
 geyim:'İdman geyimi və ayaqqabıları məşq və gündəlik aktivlik üçün tamamlayın. VIBE AZ-da rahat və funksional modelləri müqayisə edin.',
 usaq:'Uşaqlar üçün hərəkət, oyun və açıq hava məhsulları. VIBE AZ ailələr üçün yaşa uyğun seçimləri bir kataloqda toplayır.',
 kubok:'Kubok və mükafatlarla yarış və tədbirləri qeyd edin. VIBE AZ-da təqdimat üçün fərqli mükafat məhsullarını nəzərdən keçirin.',
 diger:'İdman və asudə vaxt üçün digər faydalı məhsulları kəşf edin. VIBE AZ kataloqunda yeni və praktik seçimlərə baxın.',
};

const INVISIBLE=/[\u200b-\u200f\u2060\ufeff]/g;
const legacyBrand=/\bvibe\.az(?:\.official\d*)?\b/gi;

export function absoluteUrl(path:string):string{
 try{return new URL(path,SITE_URL).toString();}
 catch{return SITE_URL;}
}

export function categoryPath(id:CategoryId|string):string{return `/catalog/${id}/`;}
export function productPath(id:number):string{return `/product/${id}/`;}

export function getCategory(id:string|undefined){
 return id?categories.find(category=>category.id===id):undefined;
}

export function categorySeoDescription(id:string|undefined):string{
 return id&&id in categoryDescriptions
  ? categoryDescriptions[id as CategoryId]
  : 'İdman, sağlamlıq və əyləncə üçün seçilmiş məhsulları VIBE AZ kataloqunda kəşf edin.';
}

export function cleanProductDescription(raw:string|undefined):string{
 const lines=(raw||'')
  .replace(INVISIBLE,'')
  .split(/\r?\n/)
  .map(line=>line.replace(legacyBrand,SITE_NAME).trim())
  .filter(line=>line.length>0)
  .filter(line=>!/^bəli$/i.test(line))
  .filter(line=>!/^davamını oxu$/i.test(line))
  .filter(line=>!/^№\s*\d+/i.test(line))
  .filter(line=>!/^(dünən|bu gün)\b/i.test(line))
  .filter(line=>!/^\d{1,2}\s+[\p{L}.-]+\s+\d{4}$/iu.test(line))
  .filter(line=>line!=='.'&&line!=='..'&&line!=='...')
  .filter(line=>{
   const commas=(line.match(/,/g)||[]).length;
   const sentencePunctuation=(line.match(/[.!?]/g)||[]).length;
   return !(commas>=7&&sentencePunctuation<=1&&line.length>120);
  });
 return lines.join('\n').trim();
}

export function truncateText(value:string,maxLength:number):string{
 const text=value.trim();
 if(text.length<=maxLength)return text;
 const clipped=text.slice(0,Math.max(1,maxLength-1));
 const boundary=clipped.lastIndexOf(' ');
 return `${(boundary>40?clipped.slice(0,boundary):clipped).trim()}…`;
}

export function productTitle(product:Product,categoryName:string,uniqueSuffix=''):string{
 const suffix=`${uniqueSuffix?` ${uniqueSuffix}`:''} — ${categoryName}`;
 const available=Math.max(20,54-suffix.length);
 return `${truncateText(product.name,available)}${suffix}`;
}

export function productLongDescription(product:Product,categoryName:string):string{
 const cleaned=cleanProductDescription(product.description);
 if(cleaned.length>=24)return cleaned;
 return `${product.name} — ${categoryName}. Bu məhsul VIBE AZ kataloqunda ${categoryName.toLocaleLowerCase()} seçimi kimi təqdim olunur.`;
}

export function productMetaDescription(product:Product,categoryName:string):string{
 const cleaned=cleanProductDescription(product.description).replace(/\s+/g,' ').trim();
 if(cleaned.length>=40)return truncateText(cleaned,155);
 return truncateText(`${product.name} — ${categoryName}. VIBE AZ kataloqunda məhsulun xüsusiyyətlərinə və aktual qiymətinə baxın.`,155);
}

export function productBrand(raw:string|undefined):string|undefined{
 const text=(raw||'').replace(INVISIBLE,'');
 const value=text.match(/^\s*(?:brend|brand)\s*:\s*([^\r\n]+)/im)?.[1]?.trim();
 return value?truncateText(value,80):undefined;
}

export function safeJsonLd(value:unknown):string{
 return JSON.stringify(value)
  .replace(/</g,'\\u003c')
  .replace(/\u2028/g,'\\u2028')
  .replace(/\u2029/g,'\\u2029');
}

export function categoryName(id:string|undefined,lang:'az'|'ru'|'en'='az'):string{
 return categoryLabel(id,lang)||'Digər';
}
