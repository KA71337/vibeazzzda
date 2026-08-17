# Security Audit - VIBE AZ

Дата: 2026-08-18

## Результат

Аудит охватывает App Router, client components, Admin Panel, Route Handlers, GitHub catalog flow, cookies/session, localStorage, dynamic product routes, uploads, search, filters и order links. В репозитории нет базы данных или SQL-кода.

| Область | Статус | Проверка |
| --- | --- | --- |
| Authentication | PASS | Пароль читается только server-side; HMAC-сессия с 8-часовым сроком и проверкой схемы payload. |
| Session cookies | PASS | `HttpOnly`, `SameSite=Strict`, `Secure` в production, `Path=/`, ограниченный срок жизни. |
| Authorization | PASS | Каждый `/api/admin/*` endpoint сам проверяет действующую сессию; UI state не является защитой. |
| CSRF | PASS | Same-origin проверка и подписанный per-session CSRF token для login/mutations/logout. |
| XSS | PASS | Пользовательский текст рендерится React как текст; единственный JSON-LD script экранирует `<`, U+2028 и U+2029. |
| SQL Injection | N/A | Database и SQL-запросы отсутствуют. |
| File Upload | PASS | Только JPEG/PNG/WEBP, extension/MIME agreement + magic bytes, лимиты 3 MB/файл и 4 MB/запрос, generated UUID filenames. SVG/HTML и spoofed formats отклоняются. |
| Path Traversal | PASS | Локальные image paths и GitHub paths запрещают `..`, обратные слэши и неразрешённые символы; имя загруженного файла не используется. |
| Secrets | PASS | Нет `.env`/токенов в tracked files; `NEXT_PUBLIC_GITHUB_TOKEN` отсутствует; history scan не нашёл token/private-key patterns, а `.env.example` содержит только placeholders. |
| GitHub integration | PASS | Token используется только в `server-only` модуле и не попадает в client imports/bundle. Ошибки не возвращают token или response body. |
| Dependencies | PASS | `npm audit`: 0 vulnerabilities. Next.js обновлён до 16.3.1; major upgrades не применялись. |
| Security headers | PASS | Next headers задают CSP, HSTS, Referrer-Policy, X-Content-Type-Options, frame/permissions/COOP/CORP политики. |
| Order Links | PASS | Ограничены размер и количество позиций; строгие `id/qty`, duplicate и unexpected fields отклоняются; данные не исполняются. |
| Admin API | PASS | Body limit до multipart parsing, revision/conflict check, строгая product/catalog schema и generic production errors. |
| CORS | PASS | Wildcard CORS headers отсутствуют; admin API не открывает cross-origin access. |
| Rate limiting | PASS with limitation | Login и mutations ограничены; limiter bounded и per-runtime instance. Для multi-region deployment нужен общий KV/edge limiter. |
| Network exposure | PASS | Нет собственного listener, SSH, database/debug service или production dev server; production запускается через Next/Vercel. |

## Найденные и исправленные проблемы

1. Multipart body разбирался до проверки общего размера. Добавлен потоковый лимит 6 MB до `FormData` parsing.
2. GitHub catalog JSON принимался без повторной валидации. Добавлены строгая schema, allowed fields, duplicate-ID и legacy-stock normalization.
3. Upload validation проверяла неполные сигнатуры. Добавлены полные JPEG/PNG/WEBP проверки, MIME matching и generated safe paths.
4. Order-link позволял неограниченный quantity и лишние поля. Добавлены caps, exact shape, duplicate detection, malformed base64/JSON handling и prototype-pollution rejection.
5. Сессия не проверяла форму подписанного payload. Добавлены длина token, exact keys, integer expiry и CSRF format checks.
6. Login не проверял source/body format. Добавлены same-origin, JSON content-type и body limits.
7. Admin status раскрывал имена отсутствующих server environment variables. Ответ оставлен с безопасными boolean status values.
8. GitHub errors могли показывать внутренние статусы/детали. Клиент получает нейтральное сообщение, безопасные технические события пишутся в server logs без secrets.
9. Неиспользуемая зависимость `serve` удалена; production не запускает отдельный HTTP service.
10. Добавлены production security headers через `next.config.ts` и no-store/noindex правила для admin/API.
11. Неизвестные exceptions в admin mutation могли вернуть внутренний текст как `400`. Теперь только маркированные validation/request errors доступны клиенту, остальные становятся generic `500` и пишутся в server log без secrets.
12. Upload не сопоставлял расширение исходного файла с MIME. Добавлена строгая проверка `.jpg/.jpeg/.png/.webp` перед magic-byte validation.

## Stock и order safety

`inStock` добавлен в существующую `Product` и `data/products.json`. Legacy records without the field нормализуются как available. Out-of-stock products получают grayscale treatment и localized overlay; central store guard запрещает `add` и увеличение старой корзины. Cart и shared order показывают недоступные позиции и блокируют новый order link/copy до удаления таких позиций. Избранное и product page остаются доступными.

## Остаточные рекомендации

- Rate limiting в памяти защищает один runtime instance; для нескольких Vercel regions следует подключить общий KV/edge limiter.
- `script-src` production сохраняет `'unsafe-inline'`, потому что текущий App Router использует inline hydration/styles и проект не переводился на nonce-based CSP. `unsafe-eval` в production не разрешён.
- Секреты Vercel/GitHub project settings недоступны из локального checkout. После любого подозрения на внешнее раскрытие token/password/session secret необходимо ротировать их в provider settings.

## Проверки

- `npm test` - 14 unit/security tests passed.
- `npm run typecheck` - passed.
- `npm run lint` - passed.
- `npm audit` - 0 vulnerabilities.
- `npm run build` - passed (Next.js 16.3.1 production build, 122 static/generated pages).
- `scripts/security-smoke.mjs` проверяет unauthorized admin access, invalid session, cross-origin login, malformed input, headers и отсутствие wildcard CORS.
- Playwright runtime smoke проверил desktop/mobile layout, AZ default, сохранение RU/EN, product/cart/order flows и отсутствие page errors.
- Отдельный temporary out-of-stock production build проверил grayscale/overlay, AZ/RU/EN labels, disabled purchase actions, старую корзину и shared order link; исходный stock затем восстановлен.
