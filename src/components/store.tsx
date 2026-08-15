'use client';
import {createContext,useCallback,useContext,useEffect,useRef,useState} from 'react';
import {Product} from '@/data/products';

export type Lang='az'|'ru'|'en';
type CartItem={id:number;qty:number};
type Toast={id:number;text:string};

const isLang=(value:unknown):value is Lang=>value==='az'||value==='ru'||value==='en';
const readNumberArray=(key:string)=>{
 try{
  const value:unknown=JSON.parse(localStorage.getItem(key)||'[]');
  return Array.isArray(value)?value.filter((id):id is number=>Number.isSafeInteger(id)&&id>0).slice(0,1000):[];
 }catch{return []}
};
const readCart=()=>{
 try{
  const value:unknown=JSON.parse(localStorage.getItem('vibe-cart')||'[]');
  if(!Array.isArray(value))return [];
  const seen=new Set<number>();
  return value.filter((item):item is CartItem=>{
   if(!item||typeof item!=='object')return false;
   const {id,qty}=item as Record<string,unknown>;
   if(!Number.isSafeInteger(id)||!Number.isSafeInteger(qty)||(id as number)<=0||(qty as number)<=0||(qty as number)>999||seen.has(id as number))return false;
   seen.add(id as number);return true;
  }).slice(0,200);
 }catch{return []}
};

const dict={
 az:{
  home:'Ana səhifə',catalog:'Kataloq',about:'Haqqımızda',contact:'Əlaqə',favorites:'Seçilmişlər',cart:'Səbət',
  add:'Səbətə əlavə et',added:'Səbətə əlavə olundu',search:'Məhsul axtar...',empty:'Burada hələ məhsul yoxdur',
  category:'Kateqoriya',allCategories:'Bütün kateqoriyalar',priceMin:'Qiymət min',priceMax:'Qiymət max',
  sort:'Sıralama',sortNew:'Yeni məhsullar',sortLow:'Əvvəl ucuz',sortHigh:'Əvvəl baha',notFound:'Heç nə tapılmadı',
  filters:'Filtrlər',apply:'Tətbiq et',reset:'Sıfırla',results:'nəticə',
  heroTitle:'Müasir seçim. Real keyfiyyət.',heroSub:'Sizin üçün seçilmiş məhsullar.',heroCta:'Məhsullara bax',
  newCollection:'Yeni kolleksiya · 2026',picked:'Sizin üçün seçdik',pickedEyebrow:'Seçilmiş məhsullar',
  viewAll:'Hamısına bax',viewAllProducts:'Bütün məhsullara bax',
  searchTitle:'Axtarış',searchHint:'Ad və ya təsvir üzrə axtarın',close:'Bağla',
  qty:'Say',total:'Cəmi',grandTotal:'Ümumi',clearCart:'Səbəti təmizlə',emptyCart:'Səbətiniz boşdur',
  goCatalog:'Kataloqa bax',getLink:'Linki əldə et',linkReady:'Sifariş linkiniz hazırdır',
  copyLink:'Linki kopyala',copied:'Kopyalandı ✓',sendWhatsApp:'WhatsApp ilə göndər',
  order:'Sifariş',invalidOrder:'Sifariş linki etibarsızdır.',copyOrder:'Sifarişi kopyala',orderCopied:'Sifariş kopyalandı ✓',
  buyNow:'İndi seç',addFav:'Seçilmişlərə əlavə et',removeFav:'Seçilmişlərdən sil',
  description:'Təsvir',product:'Məhsul',price:'Qiymət',oldPrice:'köhnə qiymət',
  continueShopping:'Alış-verişə davam et',checkout:'Sifarişi rəsmiləşdir',remove:'Sil',
  navigation:'Naviqasiya',contactUs:'Bizimlə əlaqə',tagline:'Keyfiyyətli məhsullar. Sadə seçim. Bir link.',
  howTitle:'Necə işləyir?',howSub:'Sifariş üçün sadəcə bir link.',
  deliveryTitle:'Çatdırılma şərtləri',deliverySub:'Sürətli və sərfəli çatdırılma.',
  heroAccent:'Real keyfiyyət.',featuredSelection:'Seçilmiş məhsul',collectionDiscover:'Kolleksiyanı kəşf et',rhythmTitle:'Hər ritm üçün doğru seçim.',
  movement:'Hərəkət',movementSub:'Rolik, skuter və aktiv həyat',strength:'Güc',strengthSub:'Fitnes və məşq alətləri',game:'Oyun',gameSub:'Ev və dostlarla əyləncə',
  stepChoose:'Məhsulu seç',stepChooseSub:'Bəyəndiyiniz məhsulları səbətə əlavə edin.',stepLink:'Linki əldə et',stepLinkSub:'Səbətiniz bütün məlumatları linkə çevirir.',stepSend:'Satıcıya göndər',stepSendSub:'Linki WhatsApp ilə paylaşın.',
  delivery1:'2 iş günü',delivery1Sub:'Sifarişlər 2 iş günü ərzində çatdırılır.',delivery2:'Növbəti günə qeyd',delivery2Sub:'Sifarişlər növbəti günə qeyd olunur.',delivery3:'Ölkədaxili çatdırılma',delivery3Sub:'Ölkədaxili ərazilərə çatdırılma mövcuddur.',delivery4:'Metrolara pulsuz',delivery4Sub:'Metrolara çatdırılma ödənişsizdir.',delivery5:'100 ₼-dan yuxarı pulsuz',delivery5Sub:'100 manatdan yuxarı sifarişlərə çatdırılma ödənişsizdir.',
  catalogIntro:'Hərəkət, sağlamlıq və gündəlik həyat üçün diqqətlə seçilmiş məhsullar.',favoriteHint:'Bəyəndiyiniz məhsulları ürək işarəsi ilə burada toplayın.',newPrice:'Yeni qiymət',
  productData:'Yoxlanılmış məhsul məlumatları',deliveryAzerbaijan:'Azərbaycan üzrə çatdırılma',simpleOrderLink:'Sifariş üçün sadə link',details:'Təsvir və xüsusiyyətlər',decrease:'Azalt',increase:'Artır',
  searchHelper:'Məhsulun adını və ya təsvirini yazın',items:'məhsul',productPlural:'Məhsullar',orderSummary:'Sifariş xülasəsi',privacyNote:'Şəxsi məlumat tələb olunmur. Səbət təhlükəsiz linkə çevrilir.',secureOrderNote:'Sifariş məlumatları paylaşılmış linkdən təhlükəsiz oxunub.',requestNewLink:'Linki göndərən şəxsdən yeni link istəyin.',removedFromCart:'Məhsul səbətdən silindi',cartCleared:'Səbət təmizləndi',linkCopied:'Link kopyalandı ✓',
  footerClaim:'Müasir seçim. Real keyfiyyət.',location:'Bakı, Azərbaycan',menu:'Menyu',
 },
 ru:{
  home:'Главная',catalog:'Каталог',about:'О нас',contact:'Контакты',favorites:'Избранное',cart:'Корзина',
  add:'Добавить в корзину',added:'Добавлено в корзину',search:'Поиск товаров...',empty:'Здесь пока нет товаров',
  category:'Категория',allCategories:'Все категории',priceMin:'Цена от',priceMax:'Цена до',
  sort:'Сортировка',sortNew:'Новинки',sortLow:'Сначала дешёвые',sortHigh:'Сначала дорогие',notFound:'Ничего не найдено',
  filters:'Фильтры',apply:'Применить',reset:'Сбросить',results:'результатов',
  heroTitle:'Современный выбор. Настоящее качество.',heroSub:'Товары, отобранные для вас.',heroCta:'Смотреть товары',
  newCollection:'Новая коллекция · 2026',picked:'Выбрали для вас',pickedEyebrow:'Избранные товары',
  viewAll:'Смотреть все',viewAllProducts:'Все товары',
  searchTitle:'Поиск',searchHint:'Поиск по названию или описанию',close:'Закрыть',
  qty:'Кол-во',total:'Итого',grandTotal:'Всего',clearCart:'Очистить корзину',emptyCart:'Ваша корзина пуста',
  goCatalog:'В каталог',getLink:'Получить ссылку',linkReady:'Ссылка на заказ готова',
  copyLink:'Скопировать ссылку',copied:'Скопировано ✓',sendWhatsApp:'Отправить в WhatsApp',
  order:'Заказ',invalidOrder:'Ссылка на заказ недействительна.',copyOrder:'Скопировать заказ',orderCopied:'Заказ скопирован ✓',
  buyNow:'Выбрать сейчас',addFav:'В избранное',removeFav:'Убрать из избранного',
  description:'Описание',product:'Товар',price:'Цена',oldPrice:'старая цена',
  continueShopping:'Продолжить покупки',checkout:'Оформить заказ',remove:'Удалить',
  navigation:'Навигация',contactUs:'Связаться с нами',tagline:'Качественные товары. Простой выбор. Одна ссылка.',
  howTitle:'Как это работает?',howSub:'Для заказа нужна всего одна ссылка.',
  deliveryTitle:'Условия доставки',deliverySub:'Быстрая и выгодная доставка.',
  heroAccent:'Настоящее качество.',featuredSelection:'Избранный товар',collectionDiscover:'Откройте коллекцию',rhythmTitle:'Правильный выбор для любого ритма.',
  movement:'Движение',movementSub:'Ролики, самокаты и активная жизнь',strength:'Сила',strengthSub:'Фитнес и тренажёры',game:'Игра',gameSub:'Развлечения дома и с друзьями',
  stepChoose:'Выберите товар',stepChooseSub:'Добавьте понравившиеся товары в корзину.',stepLink:'Получите ссылку',stepLinkSub:'Корзина превратит все данные в ссылку.',stepSend:'Отправьте продавцу',stepSendSub:'Поделитесь ссылкой в WhatsApp.',
  delivery1:'2 рабочих дня',delivery1Sub:'Заказы доставляются в течение 2 рабочих дней.',delivery2:'Запись на следующий день',delivery2Sub:'Заказы записываются на следующий день.',delivery3:'Доставка по стране',delivery3Sub:'Доставка доступна по регионам страны.',delivery4:'Бесплатно к метро',delivery4Sub:'Доставка к станциям метро бесплатна.',delivery5:'Бесплатно от 100 ₼',delivery5Sub:'Доставка заказов свыше 100 манатов бесплатна.',
  catalogIntro:'Тщательно отобранные товары для движения, здоровья и повседневной жизни.',favoriteHint:'Сохраняйте понравившиеся товары здесь с помощью значка сердца.',newPrice:'Новая цена',
  productData:'Проверенная информация о товаре',deliveryAzerbaijan:'Доставка по Азербайджану',simpleOrderLink:'Простая ссылка для заказа',details:'Описание и характеристики',decrease:'Уменьшить',increase:'Увеличить',
  searchHelper:'Введите название или описание товара',items:'товаров',productPlural:'Товары',orderSummary:'Сводка заказа',privacyNote:'Личные данные не требуются. Корзина превращается в безопасную ссылку.',secureOrderNote:'Данные заказа безопасно прочитаны из общей ссылки.',requestNewLink:'Попросите отправителя создать новую ссылку.',removedFromCart:'Товар удалён из корзины',cartCleared:'Корзина очищена',linkCopied:'Ссылка скопирована ✓',
  footerClaim:'Современный выбор. Настоящее качество.',location:'Баку, Азербайджан',menu:'Меню',
 },
 en:{
  home:'Home',catalog:'Catalog',about:'About',contact:'Contact',favorites:'Favorites',cart:'Cart',
  add:'Add to cart',added:'Added to cart',search:'Search products...',empty:'No products here yet',
  category:'Category',allCategories:'All categories',priceMin:'Price min',priceMax:'Price max',
  sort:'Sort',sortNew:'Newest',sortLow:'Cheapest first',sortHigh:'Most expensive first',notFound:'Nothing found',
  filters:'Filters',apply:'Apply',reset:'Reset',results:'results',
  heroTitle:'Modern choice. Real quality.',heroSub:'Products selected for you.',heroCta:'Browse products',
  newCollection:'New collection · 2026',picked:'Picked for you',pickedEyebrow:'Featured products',
  viewAll:'View all',viewAllProducts:'View all products',
  searchTitle:'Search',searchHint:'Search by name or description',close:'Close',
  qty:'Qty',total:'Total',grandTotal:'Grand total',clearCart:'Clear cart',emptyCart:'Your cart is empty',
  goCatalog:'Browse catalog',getLink:'Get the link',linkReady:'Your order link is ready',
  copyLink:'Copy link',copied:'Copied ✓',sendWhatsApp:'Send via WhatsApp',
  order:'Order',invalidOrder:'This order link is invalid.',copyOrder:'Copy order',orderCopied:'Order copied ✓',
  buyNow:'Buy now',addFav:'Add to favorites',removeFav:'Remove from favorites',
  description:'Description',product:'Product',price:'Price',oldPrice:'old price',
  continueShopping:'Continue shopping',checkout:'Checkout',remove:'Remove',
  navigation:'Navigation',contactUs:'Contact us',tagline:'Quality products. Simple choice. One link.',
  howTitle:'How it works?',howSub:'One link is all it takes to order.',
  deliveryTitle:'Delivery terms',deliverySub:'Fast and affordable delivery.',
  heroAccent:'Real quality.',featuredSelection:'Featured selection',collectionDiscover:'Discover the collection',rhythmTitle:'The right choice for every rhythm.',
  movement:'Movement',movementSub:'Skates, scooters and active living',strength:'Strength',strengthSub:'Fitness and training gear',game:'Play',gameSub:'Fun at home and with friends',
  stepChoose:'Choose a product',stepChooseSub:'Add the products you like to your cart.',stepLink:'Get the link',stepLinkSub:'Your cart turns all details into a link.',stepSend:'Send to the seller',stepSendSub:'Share the link via WhatsApp.',
  delivery1:'2 business days',delivery1Sub:'Orders are delivered within 2 business days.',delivery2:'Next-day booking',delivery2Sub:'Orders are booked for the next day.',delivery3:'Nationwide delivery',delivery3Sub:'Delivery is available across the country.',delivery4:'Free to metro stations',delivery4Sub:'Delivery to metro stations is free.',delivery5:'Free over 100 ₼',delivery5Sub:'Delivery is free for orders over 100 manats.',
  catalogIntro:'Carefully selected products for movement, wellbeing and everyday life.',favoriteHint:'Save products you love here using the heart icon.',newPrice:'New price',
  productData:'Verified product information',deliveryAzerbaijan:'Delivery across Azerbaijan',simpleOrderLink:'Simple order link',details:'Description and specifications',decrease:'Decrease',increase:'Increase',
  searchHelper:'Enter a product name or description',items:'items',productPlural:'Products',orderSummary:'Order summary',privacyNote:'No personal information is required. Your cart becomes a secure link.',secureOrderNote:'Order details were securely read from the shared link.',requestNewLink:'Ask the sender to create a new link.',removedFromCart:'Product removed from cart',cartCleared:'Cart cleared',linkCopied:'Link copied ✓',
  footerClaim:'Modern choice. Real quality.',location:'Baku, Azerbaijan',menu:'Menu',
 },
};

export type Dict=typeof dict.az;

type Ctx={
 cart:CartItem[];favorites:number[];lang:Lang;t:Dict;
 add:(p:Product)=>void;remove:(id:number)=>void;setQty:(id:number,q:number)=>void;clear:()=>void;
 toggleFav:(id:number)=>void;setLang:(l:Lang)=>void;
 drawer:boolean;setDrawer:(v:boolean)=>void;
 searchOpen:boolean;setSearchOpen:(v:boolean)=>void;
 toasts:Toast[];notify:(text:string)=>void;
};

const C=createContext<Ctx|null>(null);

/** Sale price wins when present. Single source of truth for money math. */
export const priceOf=(p:Product)=>p.newPrice??p.price;

export function StoreProvider({children}:{children:React.ReactNode}){
 const[cart,setCart]=useState<CartItem[]>([]),[favorites,setFavorites]=useState<number[]>([]),[lang,setLang]=useState<Lang>('az');
 const[ready,setReady]=useState(false);
 const[drawer,setDrawer]=useState(false),[searchOpen,setSearchOpen]=useState(false);
 const[toasts,setToasts]=useState<Toast[]>([]);
 const toastSeq=useRef(0);

 useEffect(()=>{
  setCart(readCart());
  setFavorites(readNumberArray('vibe-favs'));
  const saved=localStorage.getItem('vibe-lang');
  if(isLang(saved))setLang(saved);
  setReady(true);
 },[]);

 useEffect(()=>{
  document.documentElement.lang=lang;
  if(ready){
   try{
    localStorage.setItem('vibe-cart',JSON.stringify(cart));
    localStorage.setItem('vibe-favs',JSON.stringify(favorites));
    localStorage.setItem('vibe-lang',lang);
   }catch{/* Storage can be unavailable in privacy mode; state still works for this visit. */}
  }
 },[cart,favorites,lang,ready]);

 // Overlays lock body scroll; header/drawers read this class too.
 useEffect(()=>{
  document.body.classList.toggle('overlay-open',drawer||searchOpen);
  return()=>document.body.classList.remove('overlay-open');
 },[drawer,searchOpen]);

 const notify=useCallback((text:string)=>{
  const id=++toastSeq.current;
  setToasts(x=>[...x.slice(-2),{id,text}]);
  setTimeout(()=>setToasts(x=>x.filter(t=>t.id!==id)),2600);
 },[]);

 const add=useCallback((p:Product)=>{
  setCart(c=>c.some(x=>x.id===p.id)?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{id:p.id,qty:1}]);
  notify(dict[lang].added);
 },[lang,notify]);

 return <C.Provider value={{
  cart,favorites,lang,t:dict[lang],add,
  remove:id=>setCart(c=>c.filter(x=>x.id!==id)),
  setQty:(id,q)=>setCart(c=>q<1?c.filter(x=>x.id!==id):c.map(x=>x.id===id?{...x,qty:q}:x)),
  clear:()=>setCart([]),
  toggleFav:id=>setFavorites(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]),
  setLang,drawer,setDrawer,searchOpen,setSearchOpen,toasts,notify,
 }}>{children}</C.Provider>;
}

export const useStore=()=>{const c=useContext(C);if(!c)throw new Error('Store');return c};
