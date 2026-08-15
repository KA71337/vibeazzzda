const fs = require('fs');
const path = require('path');

const root = process.cwd();
const products = JSON.parse(fs.readFileSync(path.join(root, 'data/products.json'), 'utf8'));
const sourcesText = fs.readFileSync(path.join(root, 'reports/product-image-sources.md'), 'utf8');

function field(section, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = section.match(new RegExp(`^- \\*\\*${escaped}:\\*\\*\\s*(.*)$`, 'm'));
  return match ? match[1].trim() : '—';
}

const sections = new Map();
const headings = [...sourcesText.matchAll(/^###\s+(\d+)\s+—\s+.*$/gm)];
for (let i = 0; i < headings.length; i++) {
  const start = headings[i].index;
  const end = i + 1 < headings.length ? headings[i + 1].index : sourcesText.length;
  sections.set(Number(headings[i][1]), sourcesText.slice(start, end));
}

const lines = [
  '# Замены изображений товаров',
  '',
  '## Итог',
  '',
  `- Обработано товаров: **${products.length} из ${products.length}**.`,
  `- Проверено текущих локальных фото: **${products.reduce((n, p) => n + p.images.length, 0)}** (техническая целостность и размеры подтверждены в \`reports/product-image-audit.md\`).`,
  '- Подтверждённых точных замен: **0 товаров / 0 фото**.',
  `- Оставлено без изменения из-за недостатка доказательств точного визуального совпадения: **${products.length} товаров**.`,
  '- `data/products.json` не изменён; старые файлы не удалялись; новые изображения не скачивались; hotlink не использовался.',
  '',
  '## Критерий решения',
  '',
  'Замена допускалась только при подтверждении той же модели, варианта, цвета, конструкции и заметных деталей по текущим локальным фото, а также при наличии чистого изображения на белом/нейтральном фоне без текста, водяных знаков и элементов интерфейса. Результаты, подтверждавшие лишь категорию, название или близкую модель, отклонены. При сомнении сохранён оригинал.',
  '',
  '## Результаты по товарам',
  ''
];

for (const p of products) {
  const section = sections.get(Number(p.id)) || '';
  const identifiers = field(section, 'Модель/идентификаторы');
  const query = field(section, 'Фактический поисковый запрос');
  const checked = field(section, 'Проверенные URL');
  const source = field(section, 'Найденный URL источника');
  const accuracy = field(section, 'Точность совпадения');
  const imageUrl = field(section, 'URL изображения, допустимого к использованию');
  const images = p.images.map(x => `\`${x}\``).join(', ');

  lines.push(`### ${p.id} — ${p.name}`, '');
  lines.push(`- **Исходные файлы:** ${images}`);
  lines.push(`- **Поисковые признаки:** ${identifiers}; категория: \`${p.category}\`; запрос: ${query}`);
  lines.push(`- **Проверенные страницы:** ${checked}`);
  lines.push(`- **Лучший найденный источник:** ${source}`);
  lines.push(`- **Прямой URL изображения:** ${imageUrl}`);
  lines.push(`- **Доказательство/проверка совпадения:** ${accuracy}. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.`);
  lines.push('- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.');
  lines.push('- **Новые файлы:** —.');
  lines.push('');
}

fs.writeFileSync(path.join(root, 'reports/product-image-replacements.md'), lines.join('\n'), 'utf8');
console.log(JSON.stringify({ products: products.length, photos: products.reduce((n, p) => n + p.images.length, 0), replacements: 0, unchanged: products.length, sectionsMatched: products.filter(p => sections.has(Number(p.id))).length }, null, 2));
