# VIBE AZ — core redesign, этап 1

Дата: 2026-03-31

## Выполнено

- Перестроен публичный shell в премиальной black/white/gray системе.
- Header сделан floating/sticky, с компактным состоянием после scroll, desktop-навигацией, поиском, избранным и корзиной.
- Сохранён и используется канонический `/logo.jpeg`.
- Обновлён Footer: бренд, навигация, социальные ссылки, кликабельные телефоны `(099) 808-30-80` и `(077) 115-27-75`, `© 2026`.
- Безопасно смонтированы существующие SearchOverlay, CartDrawer и Toasts; все используют существующий store.
- Главная перестроена в editorial-композицию: premium Hero с AZ-текстами и фотографией товара из существующего каталога, категорийная история, featured-каталог, блок заказа по ссылке и условия доставки.
- Каталог получил современную заголовочную панель, premium filter surface и более воздушную responsive grid. Алгоритмы поиска, category, min/max, сортировки и limit сохранены.
- Карточка товара переработана: крупное `object-contain` изображение, `price/newPrice`, favorite, add-to-cart, hover/reveal и touch-friendly controls.
- Кастомный category/sort Select визуально обновлён без изменения ARIA и keyboard-логики.

## Изменённые файлы

- `src/components/shell.tsx`
- `src/app/page.tsx`
- `src/app/catalog/page.tsx`
- `src/components/catalog.tsx`
- `src/components/product-card.tsx`
- `src/components/select.tsx`
- `src/app/globals.css`
- `reports/site-redesign-core.md`

## Сохранённые контракты

- `data/products.json` не изменялся.
- ID, категории и image mappings не изменялись.
- Store, localStorage keys, cart/favorites и order-link логика не изменялись.
- Admin/API не изменялись.
- `/logo.jpeg` не заменялся.

## Проверка

- `npm run typecheck` — успешно.
- `npm run build` — успешно.
- Next.js 16.3.0 / Turbopack: compiled successfully.
- Сгенерировано 117/117 static pages; 108 product routes сохранены.

## Отложено на следующий этап

- Глубокая переработка внутренних UX CartDrawer/SearchOverlay.
- Полная локализация и SEO.
- Расширенный mobile filter sheet.
