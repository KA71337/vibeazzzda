const fs = require('fs');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const audit = fs.readFileSync('reports/product-image-audit.md', 'utf8');
const sources = fs.readFileSync('reports/product-image-sources.md', 'utf8');
const ui = fs.readFileSync('reports/product-image-ui-verification.md', 'utf8');

const blocks = sources.split(/^### /m).slice(1);
const issues = blocks.map((block) => {
  const title = block.match(/^(\d+) — (.+)$/m);
  const accuracy = block.match(/^- \*\*Точность совпадения:\*\* (.+)$/m);
  const decision = block.match(/^- \*\*Решение:\*\* `([^`]+)`/m);
  if (!title || !accuracy || !decision) throw new Error(`Неполная запись реестра: ${block.slice(0, 100)}`);
  return { id: Number(title[1]), name: title[2], reason: accuracy[1], decision: decision[1] };
});

const stats = {
  products: products.length,
  images: products.reduce((sum, product) => sum + product.images.length, 0),
  sourceEntries: issues.length,
  manual: issues.filter((item) => item.decision === 'manual').length,
  replace: issues.filter((item) => item.decision === 'replace').length,
  keep: issues.filter((item) => item.decision === 'keep').length,
  allowed: (sources.match(/^- \*\*URL изображения, допустимого к использованию:\*\* (?!—)/gm) || []).length,
};

const productIds = new Set(products.map((product) => product.id));
const issueIds = new Set(issues.map((item) => item.id));
const assertions = [
  [stats.products === 108, `товаров=${stats.products}`],
  [stats.images === 194, `ссылок на изображения=${stats.images}`],
  [stats.sourceEntries === 108, `записей реестра=${stats.sourceEntries}`],
  [stats.manual === 108, `manual=${stats.manual}`],
  [stats.replace === 0, `replace=${stats.replace}`],
  [stats.keep === 0, `keep=${stats.keep}`],
  [stats.allowed === 0, `допустимых URL=${stats.allowed}`],
  [productIds.size === products.length, 'ID товаров уникальны'],
  [issueIds.size === issues.length, 'ID записей реестра уникальны'],
  [[...productIds].every((id) => issueIds.has(id)), 'каждый товар присутствует в реестре'],
  [/Products: \*\*108\*\*/.test(audit), 'аудит подтверждает 108 товаров'],
  [/Image references: \*\*194\*\*/.test(audit), 'аудит подтверждает 194 ссылки'],
  [/npm run typecheck.*PASS/.test(ui), 'UI-отчёт содержит PASS typecheck'],
  [/npm run build.*PASS/.test(ui), 'UI-отчёт содержит PASS build'],
];
const failed = assertions.filter(([ok]) => !ok).map(([, label]) => label);
if (failed.length) throw new Error(`Проверка не пройдена: ${failed.join('; ')}`);

const issueLines = issues.map(({ id, name, reason }) =>
  `- **#${id} — ${name}.** ${reason}; не подтверждено явное право на коммерческое повторное использование изображения.`
).join('\n');

const report = `# Финальный сводный отчёт по изображениям товаров

## Итог

- **Всего товаров:** **108**
- **Найдено оригинальных фото в интернете:** **0**
- **Обработано существующих фото:** **0**
- **Не удалось найти подходящее фото:** **108**

Все 108 товаров индивидуально проверены по реестру источников и имеют решение \`manual\`. Ни один внешний кандидат не прошёл одновременно две обязательные проверки: точное соответствие модели/варианту и подтверждённое право коммерческого использования. Поэтому допустимых оригинальных фото для скачивания и замены — 0, а существующие 194 локальных изображения не обрабатывались и не изменялись.

## Почему изображения и live-ссылки не обновлялись

Водяные знаки не удалялись и не ретушировались без подтверждения прав правообладателя: техническое удаление маркировки не создаёт лицензию и может нарушить права автора или владельца изображения. Автоматическая проверка JPEG-метаданных не обнаружила строку \`tap.az\`, но OCR и надёжный шаблон логотипа не применялись, поэтому отсутствие видимого водяного знака автоматикой не доказано.

Live-ссылки в \`data/products.json\` не обновлялись, потому что реестр не содержит ни одного кандидата с одновременно подтверждёнными точной моделью/вариантом и коммерческой лицензией. Ссылки исходных объявлений и сторонних продавцов помогают идентификации, но сами по себе не дают права повторно использовать фото. Кроме того, в рамках задачи каталог и изображения предписано не менять.

## Техническое состояние каталога

- 108 товаров, 194 ссылки на изображения и 194 уникальных локальных файла.
- Отсутствующих, повреждённых, нечитаемых и orphan-файлов: 0.
- Точных дублей SHA-256: 0; отмечено 15 пар потенциальных визуальных near-duplicate для ручной проверки.
- Товаров без изображений: 0; повторов путей внутри одного товара: 0; некорректных префиксов путей: 0.

## Проблемы по товарам — 108 записей \`manual\`

Краткая причина ниже взята из поля «Точность совпадения» реестра; заключение о правах следует из поля «Право/лицензия и подтверждение» соответствующей записи.

${issueLines}

## Безопасные UI-исправления

По детальному UI-отчёту выполнены изменения, не затрагивающие каталог и файлы изображений:

1. Для основных фото \`object-cover\` заменён на \`object-contain\`, чтобы не обрезать товар; миниатюры оставлены с \`object-cover\`.
2. Добавлен общий безопасный renderer \`ProductImage\` с нейтральным fallback «Şəkil mövcud deyil» для пустого пути и ошибки загрузки.
3. Миниатюрам добавлены \`aria-label\` и \`aria-pressed\`; React-ключ устойчив к потенциально повторяющимся путям.
4. Добавлены \`min-w-0\`, \`break-words\`, мобильные отступы и горизонтальная прокрутка ленты миниатюр для защиты от overflow.
5. Для главного изображения задан адаптивный атрибут \`sizes="(max-width:1024px) 100vw, 50vw"\`.

## Build, typecheck и функциональная проверка

- \`npm run typecheck\`: **PASS**, ошибок TypeScript нет.
- \`npm run build\`: **PASS**, production build; сгенерировано **117/117** статических страниц, включая **108** страниц товаров.
- Production server: **PASS**; \`/catalog\`, \`/product/2\`, \`/product/3\` и существующий JPEG вернули 200.
- Несуществующий JPEG вернул 404; компонент обрабатывает ошибку fallback-состоянием.
- \`npm run lint\`: **BLOCKED** из-за несовместимого script \`next lint\` с Next.js 16; это ограничение конфигурации lint-команды, а не ошибка build/typecheck.
- Отдельный test-script в \`package.json\` отсутствует.

## Ограничения визуальной проверки

Browser E2E-инструмент в проекте не установлен, поэтому не выполнялись автоматические screenshot/pixel-тесты и программное переключение реальных viewport. Responsive-проверка основана на коде, production HTML, HTTP-проверках и успешной сборке. Финальный вид fallback не подтверждён скриншотом. \`object-contain\` может оставлять поля вокруг несquare-фото; миниатюры могут слегка кадрироваться, но главное изображение показывает полный кадр. Видимые водяные знаки требуют отдельной ручной проверки и подтверждения прав.

## Проверка чисел скриптом

Скрипт сопоставил \`data/products.json\`, аудит, реестр источников и UI-отчёт. Подтверждено: 108 товаров; 194 ссылки на фото; 108 записей реестра; \`manual=108\`, \`replace=0\`, \`keep=0\`; допустимых URL изображений — 0; ID товаров и записей уникальны и полностью совпадают.

## Детальные отчёты

- [Технический аудит изображений](./product-image-audit.md)
- [Реестр источников и решений](./product-image-sources.md)
- [Проверка UI изображений](./product-image-ui-verification.md)
- Исходный каталог: [\`data/products.json\`](../data/products.json)
`;

process.stdout.write(report);
