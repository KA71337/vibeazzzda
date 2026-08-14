export type CategoryId =
  | 'rolik' | 'skuter' | 'trenajor' | 'agirliq' | 'doyus' | 'futbol' | 'basketbol'
  | 'tenis' | 'bilyard' | 'oyun' | 'masaj' | 'geyim' | 'usaq' | 'kubok' | 'diger';

export type Category = {id: CategoryId; az: string; ru: string; en: string};

/** Display order in the catalog filter and the admin form. */
export const categories: Category[] = [
  {id: 'rolik',     az: 'Rolik və konki',        ru: 'Ролики и коньки',      en: 'Skates & rollers'},
  {id: 'skuter',    az: 'Elektrik skuter',       ru: 'Электросамокаты',      en: 'Electric scooters'},
  {id: 'trenajor',  az: 'Trenajorlar',           ru: 'Тренажёры',            en: 'Exercise machines'},
  {id: 'agirliq',   az: 'Ağırlıq və fitnes',     ru: 'Силовые и фитнес',     en: 'Strength & fitness'},
  {id: 'doyus',     az: 'Döyüş idmanı',          ru: 'Единоборства',         en: 'Combat sports'},
  {id: 'futbol',    az: 'Futbol',                ru: 'Футбол',               en: 'Football'},
  {id: 'basketbol', az: 'Basketbol və voleybol', ru: 'Баскетбол и волейбол', en: 'Basketball & volleyball'},
  {id: 'tenis',     az: 'Tenis və badminton',    ru: 'Теннис и бадминтон',   en: 'Tennis & badminton'},
  {id: 'bilyard',   az: 'Bilyard',               ru: 'Бильярд',              en: 'Billiards'},
  {id: 'oyun',      az: 'Masaüstü oyunlar',      ru: 'Настольные игры',      en: 'Table games'},
  {id: 'masaj',     az: 'Masaj və sağlamlıq',    ru: 'Массаж и здоровье',    en: 'Massage & health'},
  {id: 'geyim',     az: 'Geyim və ayaqqabı',     ru: 'Одежда и обувь',       en: 'Apparel & footwear'},
  {id: 'usaq',      az: 'Uşaqlar üçün',          ru: 'Для детей',            en: 'For kids'},
  {id: 'kubok',     az: 'Kubok və mükafatlar',   ru: 'Кубки и награды',      en: 'Cups & awards'},
  {id: 'diger',     az: 'Digər',                 ru: 'Прочее',               en: 'Other'},
];

export const categoryIds: string[] = categories.map(c => c.id);

const byId = new Map(categories.map(c => [c.id, c]));

/** Localised label, falling back to the raw value for unknown ids. */
export function categoryLabel(id: string | undefined, lang: 'az' | 'ru' | 'en'): string {
  if (!id) return '';
  return byId.get(id as CategoryId)?.[lang] ?? id;
}
