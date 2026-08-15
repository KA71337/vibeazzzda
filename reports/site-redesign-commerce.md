# VIBE AZ — commerce redesign, этап 2

Дата: 2026-03-31

## Выполнено

- Product detail перестроен в двухколоночный premium layout: крупная адаптивная галерея, вертикальные/горизонтальные thumbnails, точный выбор исходных `images`, счётчик кадров и существующий `ProductImage` fallback.
- Справа добавлена sticky info panel с `price/newPrice`, количеством, добавлением выбранного количества в корзину, favorite, buy-now и читаемым блоком описания/характеристик.
- Search Overlay переработан в command-style dialog с автофокусом, мгновенным поиском по `name + description`, карточками результатов, Escape/close и fullscreen mobile UX.
- Каталожные фильтры получили новую desktop-композицию и mobile bottom sheet `Filtrlər`; category/sort остаются кастомными listbox controls, min/max — стилизованными числовыми полями. Алгоритмы поиска, category, min/max и сортировки не менялись.
- Favorites приведены к общей editorial-системе, включая согласованный empty state.
- Cart page перестроена: крупные карточки с точными фото, qty, line totals, delete/clear, sticky order summary и toast feedback.
- Существующий Cart Drawer сохранён как desktop right drawer / fullscreen mobile с тем же store, фото, qty, total и delete.
- `Linki əldə et` сохранён без персональных полей; после генерации доступны копирование и отправка через существующий WhatsApp URL.
- Order page переработана в брендовый экран `Sifariş` со списком, суммами, `Ümumi` и `Sifarişi kopyala`.
- Motion ограничен enter/fade/slide переходами; иконки — Lucide.

## Изменённые файлы

- `src/components/product-detail.tsx`
- `src/components/search-overlay.tsx`
- `src/components/catalog.tsx`
- `src/app/favorites/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/order/page.tsx`
- `reports/site-redesign-commerce.md`

## Сохранённые контракты

- `data/products.json` и `data/order-products.json` не изменялись.
- Product IDs, категории, описания, ссылки и image mappings не изменялись.
- `ProductImage` продолжает показывать fallback для пустого/ошибочного изображения.
- Cart/favorites используют прежний store и ключи `vibe-cart` / `vibe-favs`; поведение add, qty < 1, remove и clear сохранено.
- Формат order link сохранён буквально: `JSON.stringify(cart)` → UTF-8 → Base64 → Base64URL (`+`→`-`, `/`→`_`, без `=`) → `${location.origin}/order/#${data}`.
- Payload по-прежнему содержит только `{id, qty}`; персональные поля не добавлены.
- Label `Linki əldə et` сохранён.
- Decoder `/order` не менялся: ограничения hash/размера/числа элементов, строгие `{id,qty}`, запрет дубликатов и positive safe integers сохранены.
- Snapshot semantics сохранены: сначала `data/order-products.json`, затем текущий каталог, поэтому активный товар побеждает, а старые ссылки остаются разрешимыми.
- Текст копируемого заказа и функция `Sifarişi kopyala` сохранены.
- Денежная логика cart/order оставлена на `p.price`, как в существующем контракте; `newPrice` визуально поддержан на product detail/search без скрытой миграции order totals.
- Admin UI, admin API, CSRF/session/revision/GitHub logic не изменялись.

## Проверки

- `npm run typecheck` — успешно.
- `npm run build` — успешно.
- Next.js 16.3.0 / Turbopack: compiled successfully.
- TypeScript production check завершён успешно.
- Сгенерировано 117/117 static pages.
- Сохранены 108 product routes (`/product/2` …, всего 108).
- `git diff -- data/products.json data/order-products.json src/app/api src/app/admin` — изменений нет.
