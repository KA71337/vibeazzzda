# VIBE AZ — localization, mobile и SEO, этап 3

Дата: 2026-03-31

## Выполнено

- Расширена существующая лёгкая AZ/RU/EN архитектура: AZ остаётся default, locale сохраняется в `vibe-lang`, `html.lang` синхронизируется на клиенте.
- Локализованы публичные shell/header/footer, главная, каталог/фильтры/поиск, карточки и product detail, favorites, cart/drawer и toast-тексты. Названия и описания товаров не переводятся.
- Mobile navigation закреплена снизу с Lucide, active state, cart badge, 48px touch targets и `safe-area-inset-bottom`.
- Mobile header сохранён компактным; search и cart drawer работают fullscreen, filter — bottom sheet. Добавлены ограничения против горизонтального overflow.
- Настроены `metadataBase=https://vibe.az`, title template, description, canonical, Open Graph, Twitter и `/logo.jpeg`.
- Добавлены `robots.ts` (`/robots.txt`) с закрытием `/admin/` и `/api/` и ссылкой на sitemap.
- Добавлен динамический `sitemap.ts` (`/sitemap.xml`): home, catalog, все категории и все product routes из `data/products.json`.
- Для product pages добавлены безопасные динамические metadata, canonical, OG/Twitter image и Product JSON-LD.

## Основные изменённые/созданные файлы

- `src/components/store.tsx`
- `src/components/shell.tsx`
- `src/components/home-content.tsx`
- `src/components/catalog-page-content.tsx`
- `src/components/product-card.tsx`
- `src/components/product-detail.tsx`
- `src/components/search-overlay.tsx`
- `src/app/page.tsx`
- `src/app/catalog/page.tsx`
- `src/app/favorites/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/layout.tsx`
- `src/app/product/[id]/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/globals.css`

## Сохранённые контракты

- `data/products.json` и `data/order-products.json` не изменялись.
- Названия/описания товаров, IDs, категории и изображения не изменялись.
- Order-link encoder/decoder и payload `{id, qty}` не менялись.
- Admin/API не менялись; скрытая админка исключена из публичного shell и закрыта в robots.
- `/logo.jpeg` используется без замены.

## Проверка

- `npm run typecheck` — успешно.
- `npm run build` — успешно.
- Next.js 16.3.0 / Turbopack compiled successfully.
- Сгенерировано 119/119 static pages.
- Сохранены 108 product routes.
- `/robots.txt` и `/sitemap.xml` присутствуют в production routes.
