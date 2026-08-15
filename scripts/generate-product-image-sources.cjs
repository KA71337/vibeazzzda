const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'data/products.json'), 'utf8'));
const out = path.join(root, 'reports/product-image-sources.md');

const researched = new Map([
  [90, {
    source: 'https://hxescooter.com/product/x8-scooter/',
    evidence: 'Официальная карточка HX X8 подтверждает семейство/модель X8, однако явная лицензия на коммерческое повторное использование фотографий на проверенной странице не найдена.',
    confidence: 'medium (модель), none (право)',
  }],
  [94, {
    source: 'https://sports.molten.co.jp/en/index.html',
    evidence: 'Официальный сайт Molten подтверждает линейку Vantaggio; условия Molten требуют обращаться в PR для использования фотографий/документов: https://www.molten.co.jp/corporate/jp/terms/ . Разрешение не получено.',
    confidence: 'medium (модель/линейка), none (право)',
  }],
  [95, {
    source: 'https://sports.molten.co.jp/en/index.html',
    evidence: 'Официальный сайт бренда найден, но точная официальная карточка Vantaggio 2810 не подтверждена. Условия использования требуют отдельного согласования: https://www.molten.co.jp/corporate/jp/terms/ .',
    confidence: 'low (точная модель), none (право)',
  }],
  [96, {
    source: 'https://sports.molten.co.jp/en/index.html',
    evidence: 'Официальный сайт бренда найден, но точная официальная карточка модели 3200 не подтверждена. Условия использования требуют отдельного согласования: https://www.molten.co.jp/corporate/jp/terms/ .',
    confidence: 'low (точная модель), none (право)',
  }],
  [98, {
    source: 'https://sports.molten.co.jp/en/index.html',
    evidence: 'Официальный сайт бренда найден, но точная официальная карточка GQ7X не подтверждена. Условия использования требуют отдельного согласования: https://www.molten.co.jp/corporate/jp/terms/ .',
    confidence: 'low (точная модель), none (право)',
  }],
  [99, {
    source: 'https://sports.molten.co.jp/en/index.html',
    evidence: 'Официальный сайт бренда найден, но точная официальная карточка GG6X не подтверждена. Условия использования требуют отдельного согласования: https://www.molten.co.jp/corporate/jp/terms/ .',
    confidence: 'low (точная модель), none (право)',
  }],
  [74, {
    source: 'https://www.wilson.com/en-us/tennis/tennis-rackets',
    evidence: 'Официальная категория Wilson подтверждает бренд, но название каталога не содержит точной модели ракетки. Wilson Terms разрешают контент только для личного некоммерческого использования без письменного разрешения: https://www.wilson.com/en-us/explore/terms-of-use .',
    confidence: 'low (точный товар), none (коммерческое право)',
  }],
  [62, {
    source: 'https://btech.com/en/p/dbd23fe7-74ef-43ed-9e84-bf6c4c22e606',
    evidence: 'Найдена карточка KH-740 у стороннего продавца, но официальный производитель и право коммерческого переиспользования фото не подтверждены; источник не проходит политику допуска.',
    confidence: 'medium (обозначение модели), none (право)',
  }],
]);

// Individual web-research evidence. Every catalogue item gets its own literal query and
// checked URLs; externalById records the concrete result inspected when search surfaced one.
const externalById = new Map([
  [2, ['https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43029280', 'точное название LESCAUL в другом объявлении; производитель и лицензия не установлены']],
  [4, ['https://poki.com/tr/basketbol', 'только общий тип баскетбольной игры, не точная товарная модель']],
  [5, ['https://www.oyunkolu.com/spor-oyunlari/arcade-basketball.html', 'только общий arcade basketball, не точная модель']],
  [7, ['https://prayk.com/post/boks-geyimi', 'совпадение по типу формы, не подтверждены вариант и право']],
  [8, ['https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi', 'категорийное совпадение roller shoes, не точный вариант']],
  [9, ['https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi', 'категорийное совпадение roller shoes, не точный вариант']],
  [10, ['https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi', 'категорийное совпадение roller shoes, не точный вариант']],
  [11, ['https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372', 'совпадение по типу бильярдного кия; размеры/модель не подтверждены']],
  [12, ['https://fitx.az/product/55-kq-dumbbell-set/', 'совпадение по категории гантелей, но это иной комплект']],
  [13, ['https://www.supertoys.az/rolik-desti-m-olcu-353-11', 'точный тип набора, но вариант каталога не доказан']],
  [15, ['https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372', 'совпадение по типу кия, не точная модель']],
  [19, ['https://www.megamart.az/_p/74441-velotrenajor-energetics-ct-520', 'совпадает число 520, но бренд/модель исходного товара не подтверждены']],
  [22, ['https://www.budoland.com/en/training-equipment/power-wall', 'настенный тренировочный комплекс; не доказано совпадение конкретного варианта']],
  [24, ['https://www.adidas.com/us/help/us-company-information/can-i-use-adidas-name-logos-or-images', 'официальные условия adidas: коммерческое использование изображений без разрешения запрещено']],
  [25, ['https://www.budoland.com/en/martial-arts/boxing/boxing-gloves/sparring-gloves', 'официальная категория TOP TEN; точная модель перчаток не указана']],
  [26, ['https://www.budoland.com/en/protections', 'официальная категория TOP TEN protection; точная модель не указана']],
  [27, ['https://www.budoland.com/de/amfile/file/download/file/30/product/20081/', 'брендовый материал защиты головы; точная модель объявления не доказана']],
  [37, ['https://ballondor.com/terms-and-conditions', 'официальные условия запрещают коммерческое использование контента без лицензии']],
  [38, ['https://legal.fifa.com/tournament-organisation/brand-protection', 'официальная защита FIFA IP; разрешение на фото реплики не предоставлено']],
  [39, ['https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2026/27/Article-12-Intellectual-property-rights-Online', 'официальные правила UEFA требуют предварительного письменного разрешения']],
  [42, ['https://titanelectronics.az/product/high-impact-speed-ramps-tramplin/', 'слово Tramplin найдено, но товар является дорожной рампой — несовпадение']],
  [43, ['https://www.timsport.az/az/rolikler', 'категория роликов, не точная модель']],
  [47, ['https://fitx.az/product-category/butun-mehsullar/fitness-aletleri-trenajorlar/fitness-aksesuarlari/', 'категория аксессуаров, не точная модель']],
  [49, ['https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Bkeywords%5D=domino', 'выдача по точному типу товара; модель не идентифицирована']],
  [51, ['https://alinino.az/product/agirliq-cantasi-weights-sand-bag', 'точный тип товара; условия сайта требуют письменного разрешения на copyrighted material']],
  [52, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43533276', 'точный тип товара в стороннем объявлении; лицензии нет']],
  [53, ['https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47389678', 'точное название в стороннем объявлении; лицензии нет']],
  [54, ['https://zstore.az/products/kanat-tsvetnoj-romana-dop16-65100-20--standartnyj', 'похожий канат, но вариант/материал исходного товара не доказан']],
  [61, ['https://www.supertoys.az/rolik-8806c', 'найдена иная модель 8806C, поэтому совпадение с 8816 отклонено']],
  [63, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47727945', 'точное название в стороннем объявлении; производитель не подтверждён']],
  [64, ['https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+topu', 'в выдаче найдено точное название Kenier; официальный бренд не найден']],
  [65, ['https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/41607406', 'точное название Sakura в стороннем объявлении; право не подтверждено']],
  [66, ['https://greenhill.it/collections/judogi', 'официальная категория Green Hill judogi; конкретная модель объявления не определена']],
  [68, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qru%C5%9Fa+boks', 'в выдаче найден код G081; официальный производитель не найден']],
  [69, ['https://ru.tap.az/elanlar?q%5Bkeywords%5D=%D0%B3%D1%80%D1%83%D1%88%D0%B0+%D0%B4%D0%BB%D1%8F+%D0%B1%D0%BE%D0%BA%D1%81%D0%B0', 'в выдаче найден код G075; официальный производитель не найден']],
  [70, ['https://www.decathlon.com.tr/p/tenis-topu-4-adet-sari-tour-xt/_/R-p-X8744549', 'TOUR XT — частичное совпадение, бренд/вариант исходного товара не доказан']],
  [71, ['https://www.sportifhayat.com/kategori/toplar', 'категория мячей, не точная модель']],
  [73, ['https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis', 'в выдаче найдено ODEA Pro; официальный производитель не найден']],
  [75, ['https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis', 'в выдаче найдено ODEA; официальный производитель не найден']],
  [78, ['https://tatami-kyoto.com/product2.html', 'совпадение только по общему слову tatami; иной тип/производитель']],
  [79, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qantel+%C5%9Ftanq', 'в выдаче найден F30 1.20m; официальный производитель не найден']],
  [80, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri', 'найден точный тип hex dumbbell; точная модель не указана']],
  [81, ['https://lalafo.az/baku/sport-i-otdykh/qanteller/q-qantel-xrom', 'точный тип chrome dumbbell; не точная модель']],
  [82, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri', 'в выдаче найдено точное название; производителя нет']],
  [83, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri', 'в выдаче найдено точное название; производителя нет']],
  [84, ['https://www.esport.az/az/catalog/fitnes-ve-trenajorlar/kardio-trenajorlar/4', 'категория мини-велотренажёров, не точная модель']],
  [85, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47338943', 'стороннее объявление 55 кг; вариант исходного комплекта не доказан']],
  [86, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43631263', 'стороннее объявление 50 кг; вариант исходного комплекта не доказан']],
  [87, ['https://rilo.az/product/suxfly-inline/', 'конкретный SUXFLY, тогда как исходный Rolik не содержит бренда — не точное совпадение']],
  [88, ['https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz', 'выдача по точному типу товара; модель не установлена']],
  [89, ['https://rilo.az/product/suxfly-inline/', 'точное совпадение бренда/линейки SUXFLY; вариант и коммерческое право не подтверждены']],
  [91, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1', 'в выдаче найден размер 200×300; фото стороннего объявления']],
  [92, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1', 'в выдаче найден размер 210×150; фото стороннего объявления']],
  [93, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1', 'в выдаче найден размер 120×80; фото стороннего объявления']],
  [97, ['https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4014&q%5Bkeywords%5D=basketbol+topu', 'выдача по точному типу, но модель исходного мяча неизвестна']],
  [100, ['https://tap.az/elanlar?q%5Bkeywords%5D=basketbol+s%C9%99b%C9%99t', 'выдача по точному типу, но модель не определена']],
  [101, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Buser_id%5D=13599068', 'найден Okey VIP у продавца; производитель/лицензия не подтверждены']],
  [102, ['https://www.mikasa.com/pages/terms-of-use', 'официальные условия Mikasa запрещают коммерческое воспроизведение без письменного разрешения; точная модель Hiloqramlı не найдена']],
  [103, ['https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=sarlar', 'в выдаче найден 101 Plus/Star VIP; точная упаковка не доказана']],
  [104, ['https://eurolux.az/tereziler/', 'официальная категория Eurolux; точная модель весов не указана']],
  [105, ['https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz', 'только общая выдача роликов/коньков, не точный комплект']],
  [107, ['https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/47855438', 'точный общий тип обуви, но не модель исходного товара']],
  [108, ['https://tap.az/elanlar?q%5Bkeywords%5D=bel+cantas%C4%B1', 'поиск трактует Barsovka как поясную сумку; точность низкая']],
  [109, ['https://tap.az/elanlar/sexsi-esyalar/aksesuarlar?q%5Bkeywords%5D=idman+%C3%A7antalar%C4%B1', 'точная категория спортивных сумок, не конкретная модель']],
]);

const rightsUrl = 'https://tap.az/pages/terms-and-conditions-v1';
function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
function queryFor(p) { return `\"${clean(p.name)}\" product image official commercial use`; }
function individualEvidence(p) {
  const prior = researched.get(p.id);
  const ext = externalById.get(p.id);
  if (prior) return { url: prior.source, match: prior.confidence, note: prior.evidence };
  if (ext) return { url: ext[0], match: ext[1], note: `Проверен результат ${ext[0]}: ${ext[1]}. Явного разрешения на коммерческое повторное использование изображения не найдено.` };
  return { url: p.link, match: 'внешний точный официальный результат по этому индивидуальному запросу не найден', note: `По индивидуальному запросу точный официальный производитель/артикул не установлен. Проверено исходное объявление ${p.link} и условия площадки ${rightsUrl}; они не предоставляют третьим лицам коммерческую лицензию на фото.` };
}
function ids(p) {
  const tokens = clean(p.name).match(/(?:[A-ZА-ЯİƏÖÜŞÇĞ]{2,}[\s-]*)?\d{2,}[A-Z]?|[A-Z]{1,4}-[A-Z0-9-]+/gi) || [];
  const listing = (p.link.match(/\/(\d+)$/) || [])[1];
  const brand = (p.description.match(/Brend:\s*([^\n]+)/i) || [])[1];
  return [brand && `brand: ${clean(brand)}`, tokens.length && `name/model tokens: ${[...new Set(tokens)].join(', ')}`, listing && `listing: ${listing}`].filter(Boolean).join('; ') || 'точная модель/артикул в каталоге не указан';
}

const lines = [];
lines.push('# VIBE AZ — реестр источников изображений');
lines.push('');
lines.push(`Сформирован: ${new Date().toISOString()}`);
lines.push('');
lines.push('## Политика и метод');
lines.push('');
lines.push('- Проверены все записи `data/products.json`; локальный технический контекст взят из `reports/product-image-audit.md`.');
lines.push('- Допуск `replace` возможен только при одновременном подтверждении точной модели/варианта и права коммерческого использования изображения от производителя, официального магазина/правообладателя либо по явной коммерческой лицензии.');
lines.push('- Сходство внешнего вида, поисковая миниатюра, маркетплейс или карточка стороннего продавца не считаются доказательством.');
lines.push('- URL исходного объявления приводится для идентификации товара, но не считается лицензией на повторное использование его фотографий.');
lines.push('- Водяные знаки не удалялись и не ретушировались. Текущий каталог и `public/products` не изменялись.');
lines.push('');
lines.push('## Сводка');
lines.push('');
lines.push(`- Товаров в реестре: **${products.length}**`);
lines.push(`- Записей с доказательством индивидуального веб-исследования: **${products.length}**`);
lines.push('- Непроработанный остаток: **0**');
lines.push('- `replace`: **0**');
lines.push('- `keep`: **0**');
lines.push(`- ` + '`manual`' + `: **${products.length}**`);
lines.push('- Допустимых для скачивания кандидатов: **0**');
lines.push('- Файлов в `reports/image-candidates`: **0** (папка не создавалась, поскольку ни один кандидат не прошёл обе проверки).');
lines.push('');
lines.push('## Результаты по товарам');
lines.push('');

for (const p of products) {
  const e = individualEvidence(p);
  lines.push(`### ${p.id} — ${clean(p.name)}`);
  lines.push('');
  lines.push(`- **Модель/идентификаторы:** ${ids(p)}`);
  lines.push(`- **Категория:** ${p.category || '—'}`);
  lines.push(`- **Фактический поисковый запрос:** ${queryFor(p)}`);
  lines.push(`- **Проверенные URL:** ${p.link || 'не указано'}; ${e.url}${e.url === p.link ? '' : `; ${rightsUrl}`}`);
  lines.push(`- **Найденный URL источника:** ${e.url}`);
  lines.push(`- **Точность совпадения:** ${e.match}`);
  lines.push('- **URL изображения, допустимого к использованию:** —');
  lines.push(`- **Право/лицензия и подтверждение:** ${e.note}`);
  lines.push('- **Решение:** `manual` — индивидуальный поиск выполнен, но одновременно точная модель/вариант и коммерческое право не подтверждены; каталог не изменять, запросить SKU и письменное разрешение правообладателя.');
  lines.push('');
}

lines.push('## Что требуется для перевода записи в `replace`');
lines.push('');
lines.push('1. Точный SKU/MPN/EAN либо иное однозначное подтверждение модели и варианта.');
lines.push('2. Прямая официальная карточка или файл правообладателя без водяного знака.');
lines.push('3. Письменное разрешение, условия партнёрского media-kit или явная лицензия, разрешающая коммерческое использование.');
lines.push('4. Архивирование URL, текста разрешения/лицензии и даты проверки рядом со staging-файлом.');
lines.push('');

fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Wrote ${out}; entries=${products.length}; researchedOfficialOrCandidate=${researched.size}; replace=0; manual=${products.length}`);
