# VIBE AZ — аудит перед визуальной переработкой

Дата аудита: 2026-03-31  
Корень проекта: `C:\Users\Kamil\Desktop\Проекты\NET_BOOST_PRO`

## 1. Итог и границы безопасного редизайна

Проект — рабочий storefront на Next.js App Router с локальным статическим каталогом, клиентским состоянием корзины/избранного/языка, ссылками заказа в URL hash и скрытой админкой, которая читает и атомарно обновляет каталог через GitHub API. На этапе аудита исходный код и дизайн не менялись; создан только этот отчёт.

Нельзя ломать или незаметно менять:

- `data/products.json`, ID товаров, категории и соответствия `product -> images`;
- `data/order-products.json`: это совместимый снимок для старых ссылок заказа;
- формат ссылки `/order/#<base64url(JSON cart)>`;
- ключи `localStorage`: `vibe-cart`, `vibe-favs`, `vibe-lang`;
- маршруты `/`, `/catalog`, `/product/[id]`, `/favorites`, `/cart`, `/order`, `/admin` и `/api/admin/*`;
- admin auth/session/CSRF/origin/revision-conflict и GitHub commit-логику;
- AZ/RU/EN и AZ по умолчанию;
- реальный логотип и все текущие ссылки на `/logo.jpeg`.

Фактическая проверка на момент аудита:

- `npm run typecheck` — успешно;
- `npm run build` — успешно, Next.js 16.3.0 / Turbopack, 117 статических страниц;
- 108 товаров, 108 уникальных ID (диапазон 2–109);
- 194 ссылки на изображения, отсутствующих локальных файлов — 0;
- 108/108 товаров имеют категорию, ссылку и минимум одно изображение;
- 108 товаров находятся и в историческом `data/order-products.json`;
- `newPrice` сейчас не заполнен ни у одного товара, но поле и admin UI существуют.

## 2. Стек, версии и ограничения

### Установлено

- Next.js `16.3.0`;
- React / React DOM `19.0.0`;
- TypeScript `^5.7.2`, strict mode;
- Tailwind CSS `^3.4.17` + PostCSS `^8.4.49` + Autoprefixer;
- `lucide-react` `^0.468.0` — установлен и широко используется;
- `framer-motion` `^11.15.0` — установлен, используется в карточках и подготовленных overlay/drawer/toast компонентах.

### Конфигурационные ограничения

`next.config.ts`:

- `images.unoptimized: true` — Next Image не выполняет серверную оптимизацию;
- `trailingSlash: true` — нельзя менять без проверки всех URL, ссылок, hosting и canonical;
- `reactStrictMode: true`;
- сборка Turbopack с `root: process.cwd()`;
- production source maps отключены.

`tsconfig.json`:

- `strict`, `noEmit`, `isolatedModules`, `moduleResolution: bundler`;
- alias `@/* -> ./src/*`;
- target ES2017.

`public/_headers` задаёт строгий CSP:

- изображения только `self`, `data:`, `blob:`;
- `connect-src 'self'`;
- внешние изображения/шрифты/скрипты нельзя добавлять без осознанного изменения CSP;
- поэтому social brand icons сейчас корректно реализованы inline SVG.

Шрифт `Inter` подключён через `next/font/google`; CSS использует `--font-inter`.

## 3. Логотип: фактические файлы и безопасное решение

Обнаружено:

| Путь | Состояние | Размер | SHA-256 |
|---|---:|---:|---|
| `logo.jpg` | есть | 10 727 B | `2FE68C361726EE3F4DBF5EC15B19822A952756AEBDE725F554845699E44F2D62` |
| `public/logo.jpeg` | есть | 10 727 B | тот же hash |
| `logo.jpeg` | отсутствует | — | — |
| `public/logo.jpg` | отсутствует | — | — |

То есть обзор корня верно показывает `logo.jpg`, а реально обслуживаемый сайтом файл — `public/logo.jpeg`. Это две идентичные копии одного изображения с разными расширениями/расположением. Все runtime-ссылки (`Shell`, `/order`, `/admin`, metadata) используют `/logo.jpeg`, следовательно браузер получает `public/logo.jpeg`.

**Безопасное решение:** не генерировать и не заменять логотип. Для редизайна считать каноническим публичным asset `public/logo.jpeg` и сохранять URL `/logo.jpeg`. Корневой `logo.jpg` не подключать в UI и не удалять в рамках визуальной задачи. Если позднее нужна уборка дубликата — отдельный коммит после проверки ссылок и deployment pipeline.

## 4. Карта архитектуры и ответственности

### App Router

| Файл | Роль |
|---|---|
| `src/app/layout.tsx` | Root layout, Inter, глобальные metadata, `StoreProvider`, `Shell`, `<html lang="az">` |
| `src/app/page.tsx` | Главная: hero, 8 товаров через `Catalog`, «как работает», доставка |
| `src/app/catalog/page.tsx` | Полный каталог |
| `src/app/product/[id]/page.tsx` | SSG карточек товара через `generateStaticParams`; неизвестный ID -> `notFound()` |
| `src/app/favorites/page.tsx` | Избранное из store/localStorage |
| `src/app/cart/page.tsx` | Корзина, количество, total, генерация/копирование/order-link, WhatsApp |
| `src/app/order/page.tsx` | Декодирование hash, восстановление товаров, итог, копирование заказа |
| `src/app/admin/layout.tsx` | Admin metadata, `robots: noindex,nofollow` |
| `src/app/admin/page.tsx` | Login и CRUD UI каталога/upload |
| `src/app/globals.css` | Tailwind layers, общие tokens/utilities, responsive/reduced-motion |
| `src/app/admin/admin.css` | Полностью отдельные admin styles |

### Компоненты

| Файл | Текущая роль / статус |
|---|---|
| `src/components/store.tsx` | Единственный client store: cart/favorites/lang, localStorage, overlay flags, toast queue, `priceOf()` |
| `catalog.tsx` | Поиск, min/max, сортировка, категория, grid, home limit |
| `product-card.tsx` | Карточка, favorite, add-to-cart, Framer Motion |
| `product-detail.tsx` | Галерея, add/buy-now/favorite |
| `product-image.tsx` | Next Image + fallback при пустом/сломавшемся src |
| `select.tsx` | Кастомный ARIA combobox/listbox с клавиатурой |
| `shell.tsx` | Public header/footer/mobile nav; исключает shell для `/admin` |
| `social.tsx` | WhatsApp/TikTok/Instagram URLs и inline SVG |
| `cart-drawer.tsx` | Реализованный drawer, но **не смонтирован и не вызывается** |
| `search-overlay.tsx` | Реализованный live-search overlay, но **не смонтирован и не вызывается** |
| `toast.tsx` | Реализованный toast renderer, но **не смонтирован**; store создаёт toast события невидимо |

Критическая находка для редизайна: текущий `Shell` ведёт поиск на `/catalog` и корзину на `/cart`; `setSearchOpen` и `setDrawer` нигде не вызываются. Нельзя считать overlay/drawer/toasts существующим пользовательским поведением только потому, что файлы присутствуют. Их подключение — функциональное UX-изменение и требует отдельной регрессии.

### Данные

| Файл/папка | Назначение |
|---|---|
| `data/products.json` | Канонический активный каталог, 108 товаров |
| `data/order-products.json` | Неизменяемый исторический snapshot для старых order links |
| `src/data/products.ts` | Тип `Product` и typed adapter к JSON |
| `src/data/categories.ts` | 15 фиксированных category IDs и подписи AZ/RU/EN |
| `public/products/` | 194 локальных изображения `image_*.jpg`; mapping сейчас целостен |
| `public/products/admin/` | Зарезервированный managed prefix для будущих uploads |
| `public/fon.webp` | Фактически используемый hero background |
| `fon.png` | Корневой файл, не используется public URL текущей главной |

Категории и количество товаров: `agirliq 17`, `basketbol 7`, `bilyard 4`, `diger 2`, `doyus 12`, `futbol 10`, `geyim 3`, `kubok 4`, `masaj 7`, `oyun 8`, `rolik 15`, `skuter 2`, `tenis 8`, `trenajor 7`, `usaq 2`. Цена: 0.01–950 AZN.

## 5. Точные пользовательские сценарии

### Каталог, поиск, фильтрация и сортировка

1. `/` показывает `Catalog limit={8}`; фильтры применяются до `slice(0,8)`.
2. `/catalog` показывает все товары.
3. Поиск в `Catalog` — case-insensitive substring по `name + description`.
4. Цена фильтруется по `p.price`, не по `newPrice`/`priceOf()`.
5. Сортировка: `new` по ID убыванию, `low/high` по `p.price`.
6. Категории выводятся только если реально представлены в данных.
7. Category и sort используют кастомный `Select`, min/max — native number inputs со стилизованной оболочкой.
8. Фильтры локальные, не пишутся в URL и сбрасываются при уходе/перезагрузке.

Сохранять алгоритмы и значения до осознанного продуктового решения. В частности, смена сортировки с `price` на `newPrice` изменит результаты.

### Избранное

1. Heart вызывает `toggleFav(id)`.
2. Хранятся только числовые ID в `localStorage['vibe-favs']`.
3. `/favorites` фильтрует текущий каталог по этим ID.
4. Удалённые из каталога ID остаются в localStorage, но не отображаются.

### Корзина

1. Add увеличивает qty существующей позиции либо добавляет `{id, qty:1}`.
2. Состояние хранится в `localStorage['vibe-cart']`.
3. Количество меньше 1 удаляет позицию.
4. `/cart` позволяет +/-/delete/clear.
5. Сейчас totals в `/cart`, `/order`, `product-card` и product detail используют `p.price`, несмотря на наличие `newPrice`; `cart-drawer` и `search-overlay` используют `priceOf()`. Это уже существующая внутренняя несогласованность, её нельзя случайно усилить.

### `Linki əldə et` и формат ссылки

Кнопка на `/cart` должна остаться с именем **Linki əldə et**.

Текущий encoder:

1. Берёт весь массив cart вида `[{"id":2,"qty":1}, ...]`.
2. `JSON.stringify(cart)`.
3. UTF-8 через `encodeURIComponent`/`unescape`.
4. Base64 через `btoa`.
5. Base64URL: `+ -> -`, `/ -> _`, удаляются `=`.
6. URL: ``${location.origin}/order/#${data}``.

Payload находится после `#`, поэтому не отправляется серверу. В ссылке нет имени, телефона, адреса, email или оплаты. WhatsApp URL: `https://wa.me/994998083080?text=...`.

**Контракт совместимости:** нельзя менять `/order/`, hash, поля `id/qty`, base64url-нормализацию или очистить snapshot без поддержки старых ссылок.

### Страница полученной ссылки `/order`

- Защита decoder: hash максимум 16 384 символов, base64url charset, decoded binary до 12 288 B, максимум 200 элементов;
- каждый item обязан иметь ровно `id` и `qty`, оба positive safe integers, дубликаты ID запрещены;
- lookup map сначала строится из `data/order-products.json`, затем поверх него пишется текущий каталог — активный товар побеждает, удалённый старый товар остаётся разрешим через snapshot;
- неизвестные ID отбрасываются; если ничего не осталось — invalid state;
- отображаются фото, название, цена, qty, line total, общий итог;
- кнопка **Sifarişi kopyala** пишет текст в clipboard.

### Товар

- все текущие товары статически генерируются при build;
- галерея выбирает изображение по индексу;
- `ProductImage` показывает AZ fallback при ошибке;
- add-to-cart, «buy now» (add + `/cart`), favorite;
- поле `product.link` в публичной карточке сейчас не используется.

### Языки

- Store поддерживает `az | ru | en`, default `az`, persistence `vibe-lang`;
- category labels локализованы;
- часть shell/catalog/favorites/add-to-cart берёт строки из словаря;
- значительная часть UI жёстко написана на AZ: главная, product detail, cart, order, footer headings/tagline, admin;
- `<html lang>` всегда `az` и не синхронизируется со switcher;
- названия/описания товаров не переводятся, что соответствует требованию.

Следовательно, языки технически сохранены, но текущая локализация **частичная**. Визуальный редизайн не должен заявлять полную локализацию без исправления hardcoded строк и `lang` атрибута.

## 6. Admin/API: функционал, который нельзя сломать

### Admin UI `/admin`

- отсутствует в public navigation;
- login по password;
- status различает missing auth config и missing GitHub catalog config;
- поиск по имени/ID и фильтр категории;
- create с новым ID = max ID + 1;
- edit: ID, category, name, regular price, sale price, description, link, images;
- upload multiple JPG/PNG/WEBP;
- удаление товара с confirm;
- logout;
- revision показывается в UI и передаётся при mutation.

### API

- `GET /api/admin/auth/status` — auth/config/catalog status + CSRF при session;
- `POST /api/admin/auth/login` — rate limit 6/5 min in-memory, constant-time password compare, signed session;
- `POST /api/admin/auth/logout` — same-origin/session/CSRF protection;
- `GET /api/admin/products` — требует session, читает каталог и revision;
- `POST|PATCH|DELETE /api/admin/products` — multipart FormData, CSRF, throttle 30/min, optimistic concurrency по 40-char Git SHA.

### Безопасность/хранилище

- cookie `vibe_admin_session`: HttpOnly, SameSite Strict, Secure в production, 8 часов;
- exact same-origin и protocol check;
- CSRF header `x-csrf-token`;
- no-store responses;
- GitHub credentials server-only;
- required env: `ADMIN_PASSWORD`, `SESSION_SECRET`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`;
- optional: `GITHUB_BRANCH=main`, `GITHUB_PRODUCTS_PATH=data/products.json`;
- GitHub update создаёт blobs/tree/commit и non-force ref update; stale revision -> 409;
- удаляются только orphan images под `public/products/admin/`; исходные `public/products/image_*.jpg` admin не удаляет.

### Upload validation

- максимум 8 файлов;
- максимум 3 MB на файл и 4 MB суммарно;
- MIME + magic signature для real JPEG/PNG/WEBP;
- имена генерируются server-side;
- product validation: positive integer ID, name <=160, description <=10000, link/image только `/...` или `https://...`, category только из whitelist.

Редизайн admin допустим только вокруг этих handlers/fields/states. Нельзя заменять FormData JSON-запросом, терять revision/CSRF, менять managed prefix или переписывать immutable order snapshot.

## 7. SEO: текущее состояние

Есть:

- root title: `VIBE AZ — Keyfiyyətli məhsullar`;
- description: `Seçilmiş idman və əyləncə məhsulları`;
- favicon/apple icon `/logo.jpeg`;
- admin `noindex, nofollow`;
- semantic headings присутствуют;
- product pages SSG.

Отсутствует:

- `metadataBase` и canonical;
- Open Graph и Twitter metadata;
- route-specific metadata для catalog/product/order;
- dynamic product title/description/OG image;
- `robots.ts`/`robots.txt`;
- `sitemap.ts`/`sitemap.xml`;
- category routes, хотя будущий prompt требует category URLs в sitemap;
- schema.org structured data;
- синхронизация `<html lang>` с выбранным языком.

Важно: так как каталог импортируется из JSON на build и product routes SSG, новый товар из admin попадёт в public routes/sitemap только после GitHub commit **и нового deployment/build**. README это прямо учитывает. Нельзя обещать мгновенное появление нового URL без смены архитектуры ISR/dynamic rendering.

`/order` содержит персонализированный hash payload и должен быть `noindex`/исключён из sitemap. `/favorites`, `/cart`, `/admin`, `/api/*` также не должны входить в sitemap.

## 8. Текущие стили и адаптивность

- Public UI: Tailwind utility classes + небольшой `globals.css`.
- Container: max 1440px, responsive horizontal padding через `clamp`.
- Основная палитра monochrome, rounded cards/buttons, Inter.
- Mobile breakpoint преимущественно Tailwind `sm=640`, `md=768`, `lg=1024`, `xl=1280`.
- При `<768px` body получает bottom padding под fixed nav.
- `prefers-reduced-motion` глобально сокращает animation/transition.
- Admin CSS mobile-first: grid 1/2/3 columns, editor bottom sheet на phone и centered modal от 640px.
- `overflow-x:hidden` на body может маскировать переполнение; при проверке нужно искать источник, а не полагаться на обрезку.

## 9. Риски регрессии и обнаруженные несогласованности

### Критические

1. **Order-link compatibility.** Любое изменение serializer/path/hash/ID/qty ломает сохранённые ссылки.
2. **Snapshot.** Перезапись `data/order-products.json` лишит старые ссылки удалённых товаров.
3. **Product/image mapping.** Переименование/перемещение `public/products/*` без атомарной правки JSON даст пустые карточки.
4. **Admin mutation contract.** Потеря CSRF/revision/origin/FormData вызывает 403/409 или небезопасное поведение.
5. **Static deployment.** Admin commit сам по себе не меняет уже собранный storefront; нужен deployment.
6. **Logo confusion.** Runtime asset — `/logo.jpeg`, не корневой `logo.jpg`.

### Высокие

1. Sale price применяется неодинаково: `priceOf()` есть, но основные cart/order/product/card используют `price`.
2. Prepared `CartDrawer`, `SearchOverlay`, `Toasts` не смонтированы; их «стилизация» без подключения ничего не меняет, а подключение меняет flow.
3. Localization частичная, многие hardcoded AZ strings; visual-only refactor легко создаст смешанный язык.
4. `Catalog limit={8}` сохраняет filters на главной; изменение композиции может неожиданно менять выбранные 8 карточек.
5. Product pages создаются на build; новый ID отсутствует до redeploy.
6. `product.link` хранится и редактируется, но public UI его не использует — не удалить как «лишнее».

### Средние

1. Search icon в header сейчас просто ведёт на `/catalog`, а не открывает overlay.
2. Cart icon ведёт на `/cart`, а не открывает drawer.
3. Store выставляет `body.overlay-open`, но активных triggers нет.
4. Clipboard APIs требуют secure context/permissions; нужен fallback/status.
5. Custom `Select` доступен с клавиатуры, однако Escape обрабатывается только на button; после редизайна сохранить combobox semantics.
6. Footer/tagline/main content не полностью локализованы.
7. `html lang="az"` всегда фиксирован.
8. CSP блокирует remote media/fonts/connections; нельзя бездумно добавлять CDN assets.
9. Root `fon.png` и public `fon.webp` — разные роли; текущий hero использует только `/fon.webp`.
10. `lint` script вызывает `next lint`, которого в Next 16 нет как прежней команды; baseline проверки — typecheck/build.

## 10. Карта конкретных будущих изменений по файлам

Ниже — план, не выполненные изменения.

### Фаза A — сохранить контракты и выделить UI foundation

- `src/app/globals.css`: design tokens (colors, spacing, radius, shadows, typography), focus-visible, touch targets; сохранить `.container`, `.btn`, reduced-motion и mobile bottom offset либо мигрировать атомарно.
- Новые presentation-only компоненты под `src/components/ui/`: button, icon-button, surface, section-heading; без изменения данных/store.
- `tailwind.config.ts`: добавить только brand tokens/fonts, не менять content globs/breakpoints без необходимости.

### Фаза B — shell и overlays

- `src/components/shell.tsx`: визуально переработать header/footer/mobile nav, сохранить public routes, телефоны, social links, `/logo.jpeg`, исключение `/admin`.
- Явно выбрать поведение search/cart:
  - либо сохранить route navigation;
  - либо смонтировать `SearchOverlay`, `CartDrawer`, `Toasts`, переключить кнопки на `setSearchOpen/setDrawer` и протестировать route fallback.
- `cart-drawer.tsx`, `search-overlay.tsx`, `toast.tsx`: если активируются — focus management, Escape, scroll lock, safe-area, reduced-motion, screen reader states.

### Фаза C — главная и каталог

- `src/app/page.tsx`: новый hero/editorial sections; сохранить `/fon.webp` или проверенный catalog image, CTA `/catalog`, блок работы Linki əldə et и delivery facts.
- `src/components/catalog.tsx`: разделить filter state/UI/list rendering; сохранить exact search/category/sort semantics; mobile filter sheet не должен сбрасывать значения при закрытии.
- `src/components/select.tsx`: сохранить ARIA/keyboard contract; визуально обновлять без возврата к native select.
- `product-card.tsx`: новый card layout; сохранить product link, favorite, add, ID key, ProductImage fallback.

### Фаза D — product/favorites/cart/order

- `product-detail.tsx`: premium gallery/content layout; сохранить image index, add, buy-now -> cart, favorite.
- `favorites/page.tsx`: только presentation; сохранить фильтрацию по stored IDs.
- `cart/page.tsx`: сохранить local cart operations и encoder **без единого изменения формата**; визуально усилить Linki əldə et.
- `order/page.tsx`: декодер вынести только с exhaustive tests; сохранить snapshot-first/current-wins lookup и limits; добавить noindex metadata через подходящую server boundary.
- До показа скидок принять единое решение о `priceOf()` во всех totals; это отдельная функциональная миграция с тестами, не «косметика».

### Фаза E — локализация

- `store.tsx`: не менять localStorage keys/union; дополнить словарь всеми hardcoded public strings.
- Public pages/components: заменить hardcoded AZ на `t.*`, не переводить product names/descriptions.
- Root language: определить архитектуру (cookie/server locale или client update). Не вводить locale-prefixed routes без redirects/canonical plan.
- Admin можно оставить AZ, если нет отдельного требования локализовать operator UI.

### Фаза F — SEO

- `src/app/layout.tsx`: metadataBase для `https://vibe.az`, canonical/OG/Twitter defaults.
- `src/app/product/[id]/page.tsx`: `generateMetadata` по продукту; canonical и product image.
- `src/app/robots.ts`: allow public content, disallow admin/API/cart/favorites/order as необходимо.
- `src/app/sitemap.ts`: home/catalog/product URLs из `products`; категории добавлять только после создания реальных category routes либо использовать валидные catalog query URLs по согласованной canonical модели.
- Добавить `noindex` для cart/favorites/order; admin уже noindex.
- Проверить trailing slash в canonical/sitemap.

### Фаза G — admin presentation без смены логики

- `src/app/admin/page.tsx`, `admin.css`: допускается responsive/premium polish, но не переписывать request helper, auth states, csrf, revision, FormData, methods и fields.
- Улучшить object URL cleanup для upload previews и keyboard/focus trap modal отдельным безопасным изменением.
- Не подключать public `Shell` к `/admin`.

## 11. Критерии проверки редизайна

### Общие автоматические

- `npm run typecheck` без ошибок;
- `npm run build` без ошибок;
- route report содержит все текущие public/admin/API routes и 108+ product paths;
- JSON counts/IDs/image mappings не изменились без отдельной миграции;
- проверить encoder/decoder fixture на нескольких carts, unicode-safe путь и старую сохранённую ссылку;
- отсутствие console errors, failed images и hydration warnings.

### Desktop (1440×900 и 1280×800)

- header sticky/compact не перекрывает anchors/content;
- hero не обрезает логотип/CTA/ключевое изображение;
- catalog filters доступны с клавиатуры, dropdown не обрезается контейнером;
- grid выдерживает длинные RU/AZ names и цены;
- product gallery, cart summary sticky без скачков;
- drawer, если подключён, справа и с backdrop/Escape/focus;
- admin 3-column cards, modal <=90dvh, save/cancel всегда доступны;
- нет горизонтального scroll.

### Tablet (1024×768, 834×1194, обе ориентации)

- breakpoint переход header/nav не создаёт дубликаты или пустое пространство;
- фильтры не становятся слишком узкими; dropdown поверх content;
- product 1/2-column переход понятен;
- cart summary не перекрывает rows;
- admin toolbar и 2-column grid сохраняют usable controls;
- touch targets минимум около 44×44 px.

### Mobile (390×844, 360×800, минимум 320px)

- mobile header и fixed bottom nav не перекрывают контент/footer/actions;
- safe-area учитывается;
- 2-column cards не ломаются на длинных названиях;
- filters открываются как usable sheet/modal и сохраняют state;
- search сразу фокусируется, Escape/close работают, keyboard не скрывает результаты;
- cart qty/delete/link actions доступны одной рукой;
- generated URL переносится (`break-all`) и копируется;
- `/order/#...` открывается напрямую после reload и показывает тот же order;
- invalid/oversized/tampered hash показывает invalid state без crash;
- admin login/editor/file upload usable, sticky footer виден;
- нет горизонтального scroll на 320px.

### Функциональная матрица

1. Переключить AZ -> RU -> EN, reload, проверить persistence и все public labels.
2. Search по name и description; no results.
3. Min/max/category/new/low/high и комбинации.
4. Favorite add/remove на card/detail и reload.
5. Cart add twice, +/- до удаления, remove, clear, reload.
6. Linki əldə et -> copy -> WhatsApp href -> открыть link в новой вкладке.
7. Order: фото/name/qty/price/line total/grand total/copy text.
8. Старый order link на snapshot товар.
9. Product gallery и broken-image fallback.
10. Admin: missing config, bad login, good login, list/filter/create/edit/upload/delete/logout, 409 stale revision, 401/403/429 states.
11. SEO: title/description/canonical/OG/Twitter, robots, sitemap, admin/order noindex, trailing slash consistency.
12. Accessibility: tab order, visible focus, combobox keyboard, dialogs, labels, reduced motion, color contrast.

## 12. Рекомендуемый порядок внедрения

1. Зафиксировать baseline fixtures: catalog hash/counts, logo hash, 2–3 order URLs, screenshots по viewport.
2. Ввести tokens/UI primitives без смены flows.
3. Переработать Shell и главную.
4. Переработать Catalog/ProductCard/Select с текущей логикой.
5. Переработать Product/Favorites/Cart/Order, отдельно тестируя link contract.
6. Только затем активировать готовые SearchOverlay/CartDrawer/Toasts, если это подтверждённое требование.
7. Завершить public localization.
8. Добавить SEO routes/metadata и deployment-aware sitemap.
9. В последнюю очередь polish admin CSS, не меняя server/API contracts.
10. Полная desktop/tablet/mobile матрица + typecheck/build.

## 13. Definition of Done будущего редизайна

Редизайн безопасен только если одновременно:

- сохранены 108 товаров, IDs, category IDs и 194 image references;
- `/logo.jpeg` обслуживает существующий `public/logo.jpeg`; новый logo не создан;
- текущие и исторические order links открываются;
- cart/favorites/lang сохраняются после reload;
- все routes и admin CRUD/upload/auth/security работают;
- AZ/RU/EN не деградировали;
- sitemap/robots/metadata соответствуют реальным routes и deployment модели;
- typecheck/build проходят;
- desktop/tablet/mobile не имеют перекрытий и горизонтального scroll;
- визуальные изменения не смешаны с неоговорённой миграцией pricing/order/admin/data logic.
