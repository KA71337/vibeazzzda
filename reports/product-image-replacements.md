# Замены изображений товаров

## Итог

- Обработано и повторно проверено товаров: **108 из 108**.
- `data/products.json` успешно разобран как JSON; ID товаров уникальны, у каждого товара есть непустой массив `images`.
- Сохранено **194 уникальные ссылки на изображения**; все **194 из 194** файлов существуют в `public/products`, имеют корректные JPEG-маркеры и успешно отдаются локальным production-сервером с HTTP 200 и MIME `image/*`.
- Карточки каталога и галерея используют сохранённые связи `p.images[0]` и `p.images`; `/catalog` и контрольная страница `/product/2` вернули HTTP 200. Production build создал все **108** статических маршрутов товаров.
- `npm run typecheck` завершён успешно.
- `npm run build` завершён успешно: компиляция, TypeScript, сбор данных и генерация **117/117** статических страниц прошли без ошибок.
- Полнота отчёта подтверждена: **108 уникальных товарных разделов**, без отсутствующих и лишних ID; в каждом разделе присутствуют конкретное доказательство/причина и решение.
- Подтверждённых точных замен: **0 товаров / 0 фото**.
- Краткая сводка нерешённых товаров: **108 товаров** оставлены без изменения, поскольку для каждого конкретного товара не удалось одновременно подтвердить точную модель/вариант по локальному эталону и найти чистый источник с достаточным подтверждением происхождения/права использования. Индивидуальная причина приведена в соответствующем разделе ниже; пропусков нет.
- `data/products.json` и изображения не изменялись; старые файлы не удалялись; новые изображения не скачивались; товары не подменялись; hotlink не использовался.

## Критерий решения

Замена допускалась только при подтверждении той же модели, варианта, цвета, конструкции и заметных деталей по текущим локальным фото, а также при наличии чистого изображения на белом/нейтральном фоне без текста, водяных знаков и элементов интерфейса. Результаты, подтверждавшие лишь категорию, название или близкую модель, отклонены. При сомнении сохранён оригинал.

## Результаты по товарам

### 2 — Rolik Lescaul

- **Исходные файлы:** `/products/image_00001.jpg`, `/products/image_00002.jpg`, `/products/image_00003.jpg`, `/products/image_00004.jpg`, `/products/image_00005.jpg`, `/products/image_00006.jpg`, `/products/image_00007.jpg`, `/products/image_00008.jpg`, `/products/image_00009.jpg`, `/products/image_00010.jpg`
- **Поисковые признаки:** brand: LESCAUL; listing: 48311294; категория: `rolik`; запрос: "Rolik Lescaul" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48311294; https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43029280; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43029280
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точное название LESCAUL в другом объявлении; производитель и лицензия не установлены. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 3 — Elektron Skuter XM-1

- **Исходные файлы:** `/products/image_00011.jpg`
- **Поисковые признаки:** name/model tokens: XM-1; listing: 48249951; категория: `skuter`; запрос: "Elektron Skuter XM-1" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48249951; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48249951
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48249951
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 4 — Basketbol oyunu 2 neferlik

- **Исходные файлы:** `/products/image_00012.jpg`
- **Поисковые признаки:** listing: 48394223; категория: `basketbol`; запрос: "Basketbol oyunu 2 neferlik" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394223; https://poki.com/tr/basketbol; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://poki.com/tr/basketbol
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** только общий тип баскетбольной игры, не точная товарная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 5 — Basketbol oyunu

- **Исходные файлы:** `/products/image_00013.jpg`
- **Поисковые признаки:** listing: 48394220; категория: `basketbol`; запрос: "Basketbol oyunu" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394220; https://www.oyunkolu.com/spor-oyunlari/arcade-basketball.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.oyunkolu.com/spor-oyunlari/arcade-basketball.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** только общий arcade basketball, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 6 — Turnik

- **Исходные файлы:** `/products/image_00014.jpg`
- **Поисковые признаки:** listing: 48394217; категория: `agirliq`; запрос: "Turnik" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394217; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394217
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394217
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 7 — Boks forması

- **Исходные файлы:** `/products/image_00015.jpg`, `/products/image_00016.jpg`
- **Поисковые признаки:** listing: 48394205; категория: `doyus`; запрос: "Boks forması" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48394205; https://prayk.com/post/boks-geyimi; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://prayk.com/post/boks-geyimi
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадение по типу формы, не подтверждены вариант и право. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 8 — İdman ayaqqabısı rollikli

- **Исходные файлы:** `/products/image_00017.jpg`, `/products/image_00018.jpg`
- **Поисковые признаки:** listing: 48394203; категория: `rolik`; запрос: "İdman ayaqqabısı rollikli" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394203; https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категорийное совпадение roller shoes, не точный вариант. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 9 — İdman ayaqqabısı rolikli

- **Исходные файлы:** `/products/image_00019.jpg`, `/products/image_00020.jpg`
- **Поисковые признаки:** listing: 48394200; категория: `rolik`; запрос: "İdman ayaqqabısı rolikli" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394200; https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категорийное совпадение roller shoes, не точный вариант. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 10 — İdman ayaqqabısı rollikli

- **Исходные файлы:** `/products/image_00021.jpg`, `/products/image_00022.jpg`, `/products/image_00023.jpg`
- **Поисковые признаки:** listing: 48394199; категория: `rolik`; запрос: "İdman ayaqqabısı rollikli" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48394199; https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://lalafo.az/azerbaijan/sport-i-otdykh/q-rolikli-ayaqqabi
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категорийное совпадение roller shoes, не точный вариант. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 11 — Bilyard Kiyi (145 sm / 160 sm)

- **Исходные файлы:** `/products/image_00024.jpg`, `/products/image_00025.jpg`
- **Поисковые признаки:** name/model tokens: 145, 160; listing: 48291848; категория: `bilyard`; запрос: "Bilyard Kiyi (145 sm / 160 sm)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291848; https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадение по типу бильярдного кия; размеры/модель не подтверждены. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 12 — Qantel

- **Исходные файлы:** `/products/image_00026.jpg`, `/products/image_00027.jpg`
- **Поисковые признаки:** listing: 48253516; категория: `agirliq`; запрос: "Qantel" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48253516; https://fitx.az/product/55-kq-dumbbell-set/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://fitx.az/product/55-kq-dumbbell-set/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадение по категории гантелей, но это иной комплект. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 13 — Rolik dəsti

- **Исходные файлы:** `/products/image_00028.jpg`, `/products/image_00029.jpg`
- **Поисковые признаки:** listing: 48250157; категория: `rolik`; запрос: "Rolik dəsti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250157; https://www.supertoys.az/rolik-desti-m-olcu-353-11; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.supertoys.az/rolik-desti-m-olcu-353-11
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точный тип набора, но вариант каталога не доказан. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 14 — Stadion toru

- **Исходные файлы:** `/products/image_00030.jpg`
- **Поисковые признаки:** listing: 48286277; категория: `futbol`; запрос: "Stadion toru" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286277; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286277
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286277
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 15 — Bilyard kiyi

- **Исходные файлы:** `/products/image_00031.jpg`
- **Поисковые признаки:** listing: 48197386; категория: `bilyard`; запрос: "Bilyard kiyi" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48197386; https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://birbir.uz/uz/navoiy/cat/xobbi-va-sport/sport-dam-olish/boshqa-sport-turlari/o/bilyard-stol-sitiladi-narxi-17-mln-135411372
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадение по типу кия, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 16 — Turnik

- **Исходные файлы:** `/products/image_00032.jpg`
- **Поисковые признаки:** listing: 48218534; категория: `agirliq`; запрос: "Turnik" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218534; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218534
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218534
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 17 — Kiy Orginal

- **Исходные файлы:** `/products/image_00033.jpg`
- **Поисковые признаки:** listing: 48164797; категория: `bilyard`; запрос: "Kiy Orginal" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48164797; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48164797
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48164797
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 18 — Rolik Roselle

- **Исходные файлы:** `/products/image_00034.jpg`, `/products/image_00035.jpg`
- **Поисковые признаки:** listing: 48167387; категория: `rolik`; запрос: "Rolik Roselle" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48167387; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48167387
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48167387
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 19 — Velotrenajor 520

- **Исходные файлы:** `/products/image_00036.jpg`
- **Поисковые признаки:** name/model tokens: Velotrenajor 520; listing: 48337727; категория: `trenajor`; запрос: "Velotrenajor 520" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337727; https://www.megamart.az/_p/74441-velotrenajor-energetics-ct-520; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.megamart.az/_p/74441-velotrenajor-energetics-ct-520
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадает число 520, но бренд/модель исходного товара не подтверждены. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 20 — Velotrenajor 603

- **Исходные файлы:** `/products/image_00037.jpg`
- **Поисковые признаки:** name/model tokens: Velotrenajor 603; listing: 48337707; категория: `trenajor`; запрос: "Velotrenajor 603" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337707; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337707
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337707
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 21 — Velotrenajor 4800

- **Исходные файлы:** `/products/image_00038.jpg`
- **Поисковые признаки:** name/model tokens: Velotrenajor 4800; listing: 48337691; категория: `trenajor`; запрос: "Velotrenajor 4800" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337691; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337691
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48337691
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 22 — Divar turniki

- **Исходные файлы:** `/products/image_00039.jpg`, `/products/image_00040.jpg`
- **Поисковые признаки:** listing: 48326716; категория: `agirliq`; запрос: "Divar turniki" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48326716; https://www.budoland.com/en/training-equipment/power-wall; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.budoland.com/en/training-equipment/power-wall
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** настенный тренировочный комплекс; не доказано совпадение конкретного варианта. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 23 — Futbol qapıçı dəsti

- **Исходные файлы:** `/products/image_00041.jpg`, `/products/image_00042.jpg`, `/products/image_00043.jpg`
- **Поисковые признаки:** listing: 48326688; категория: `futbol`; запрос: "Futbol qapıçı dəsti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48326688; https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48326688
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48326688
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 24 — Dəri boks əlcəkləri Adidas

- **Исходные файлы:** `/products/image_00044.jpg`, `/products/image_00045.jpg`
- **Поисковые признаки:** listing: 48326627; категория: `doyus`; запрос: "Dəri boks əlcəkləri Adidas" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48326627; https://www.adidas.com/us/help/us-company-information/can-i-use-adidas-name-logos-or-images; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.adidas.com/us/help/us-company-information/can-i-use-adidas-name-logos-or-images
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальные условия adidas: коммерческое использование изображений без разрешения запрещено. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 25 — Boks əlcəkləri Top Ten

- **Исходные файлы:** `/products/image_00046.jpg`, `/products/image_00047.jpg`
- **Поисковые признаки:** listing: 48326607; категория: `doyus`; запрос: "Boks əlcəkləri Top Ten" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48326607; https://www.budoland.com/en/martial-arts/boxing/boxing-gloves/sparring-gloves; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.budoland.com/en/martial-arts/boxing/boxing-gloves/sparring-gloves
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальная категория TOP TEN; точная модель перчаток не указана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 26 — MMA ayaq qoruyucusu Top Ten

- **Исходные файлы:** `/products/image_00048.jpg`, `/products/image_00049.jpg`
- **Поисковые признаки:** listing: 48326617; категория: `doyus`; запрос: "MMA ayaq qoruyucusu Top Ten" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48326617; https://www.budoland.com/en/protections; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.budoland.com/en/protections
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальная категория TOP TEN protection; точная модель не указана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 27 — Boks və kikboks dəbilqəsi

- **Исходные файлы:** `/products/image_00050.jpg`, `/products/image_00051.jpg`
- **Поисковые признаки:** listing: 48326611; категория: `doyus`; запрос: "Boks və kikboks dəbilqəsi" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48326611; https://www.budoland.com/de/amfile/file/download/file/30/product/20081/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.budoland.com/de/amfile/file/download/file/30/product/20081/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** брендовый материал защиты головы; точная модель объявления не доказана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 28 — Konki

- **Исходные файлы:** `/products/image_00052.jpg`
- **Поисковые признаки:** listing: 48250070; категория: `rolik`; запрос: "Konki" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250070; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250070
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250070
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 29 — Rolik dəsti

- **Исходные файлы:** `/products/image_00053.jpg`
- **Поисковые признаки:** listing: 48325853; категория: `rolik`; запрос: "Rolik dəsti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48325853; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48325853
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48325853
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 30 — Uşaq üçün dırmaşma kəndiri və disk yelləncək

- **Исходные файлы:** `/products/image_00054.jpg`
- **Поисковые признаки:** listing: 48324617; категория: `usaq`; запрос: "Uşaq üçün dırmaşma kəndiri və disk yelləncək" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324617; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324617
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324617
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 31 — Peşəkar pres katoku

- **Исходные файлы:** `/products/image_00055.jpg`
- **Поисковые признаки:** listing: 48324598; категория: `agirliq`; запрос: "Peşəkar pres katoku" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324598; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324598
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324598
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 32 — Qruzlu Pres Katoku (Ab Roller) iki təkərli

- **Исходные файлы:** `/products/image_00056.jpg`
- **Поисковые признаки:** listing: 48324583; категория: `agirliq`; запрос: "Qruzlu Pres Katoku (Ab Roller) iki təkərli" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324583; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324583
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324583
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 33 — Masaüstü futbol

- **Исходные файлы:** `/products/image_00057.jpg`
- **Поисковые признаки:** listing: 48324550; категория: `oyun`; запрос: "Masaüstü futbol" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324550; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324550
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324550
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 34 — Peşəkar masaüstü futbol

- **Исходные файлы:** `/products/image_00058.jpg`
- **Поисковые признаки:** listing: 48324536; категория: `oyun`; запрос: "Peşəkar masaüstü futbol" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324536; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324536
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324536
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 35 — Peşəkar güləş xalçası

- **Исходные файлы:** `/products/image_00059.jpg`, `/products/image_00060.jpg`, `/products/image_00061.jpg`
- **Поисковые признаки:** listing: 48324503; категория: `doyus`; запрос: "Peşəkar güləş xalçası" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324503; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324503
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48324503
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 36 — Qızıl buts mükafatı

- **Исходные файлы:** `/products/image_00062.jpg`
- **Поисковые признаки:** listing: 48324461; категория: `kubok`; запрос: "Qızıl buts mükafatı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/ev-ve-bag-ucun/dekor-interyer/48324461; https://tap.az/elanlar/ev-ve-bag-ucun/dekor-interyer/48324461
- **Лучший найденный источник:** https://tap.az/elanlar/ev-ve-bag-ucun/dekor-interyer/48324461
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 37 — Qızıl Top mükafatı (Ballon d'Or)

- **Исходные файлы:** `/products/image_00063.jpg`, `/products/image_00064.jpg`
- **Поисковые признаки:** listing: 48324426; категория: `kubok`; запрос: "Qızıl Top mükafatı (Ballon d'Or)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/aksesuarlar/48324426; https://ballondor.com/terms-and-conditions; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ballondor.com/terms-and-conditions
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальные условия запрещают коммерческое использование контента без лицензии. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 38 — Kubok Fifa Dünya Çempionatı

- **Исходные файлы:** `/products/image_00065.jpg`
- **Поисковые признаки:** listing: 48324406; категория: `kubok`; запрос: "Kubok Fifa Dünya Çempionatı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/aksesuarlar/48324406; https://legal.fifa.com/tournament-organisation/brand-protection; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://legal.fifa.com/tournament-organisation/brand-protection
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальная защита FIFA IP; разрешение на фото реплики не предоставлено. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 39 — Kubok UEFA Çempionlar Liqası

- **Исходные файлы:** `/products/image_00066.jpg`
- **Поисковые признаки:** listing: 48324363; категория: `kubok`; запрос: "Kubok UEFA Çempionlar Liqası" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/aksesuarlar/48324363; https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2026/27/Article-12-Intellectual-property-rights-Online; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://documents.uefa.com/r/Regulations-of-the-UEFA-Champions-League-2026/27/Article-12-Intellectual-property-rights-Online
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальные правила UEFA требуют предварительного письменного разрешения. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 40 — Futbol ləvazimatları və sürət avadanlıqları

- **Исходные файлы:** `/products/image_00067.jpg`, `/products/image_00068.jpg`, `/products/image_00069.jpg`, `/products/image_00070.jpg`, `/products/image_00071.jpg`, `/products/image_00072.jpg`, `/products/image_00073.jpg`
- **Поисковые признаки:** listing: 48291897; категория: `futbol`; запрос: "Futbol ləvazimatları və sürət avadanlıqları" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291897; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291897
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291897
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 41 — Sapan

- **Исходные файлы:** `/products/image_00074.jpg`
- **Поисковые признаки:** listing: 48291892; категория: `diger`; запрос: "Sapan" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291892; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291892
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291892
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 42 — Tramplin

- **Исходные файлы:** `/products/image_00075.jpg`, `/products/image_00076.jpg`
- **Поисковые признаки:** listing: 48291890; категория: `usaq`; запрос: "Tramplin" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291890; https://titanelectronics.az/product/high-impact-speed-ramps-tramplin/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://titanelectronics.az/product/high-impact-speed-ramps-tramplin/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** слово Tramplin найдено, но товар является дорожной рампой — несовпадение. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 43 — Roliklər

- **Исходные файлы:** `/products/image_00077.jpg`, `/products/image_00078.jpg`, `/products/image_00079.jpg`
- **Поисковые признаки:** listing: 48291888; категория: `rolik`; запрос: "Roliklər" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291888; https://www.timsport.az/az/rolikler; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.timsport.az/az/rolikler
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категория роликов, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 44 — Peşəkar Qravitasiya çəkmələri / Turnik Qarmağı

- **Исходные файлы:** `/products/image_00080.jpg`, `/products/image_00081.jpg`, `/products/image_00082.jpg`
- **Поисковые признаки:** listing: 48291877; категория: `agirliq`; запрос: "Peşəkar Qravitasiya çəkmələri / Turnik Qarmağı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291877; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291877
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48291877
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 45 — Dart ekranlı

- **Исходные файлы:** `/products/image_00083.jpg`, `/products/image_00084.jpg`
- **Поисковые признаки:** listing: 48286808; категория: `oyun`; запрос: "Dart ekranlı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286808; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286808
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286808
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 46 — Şahmat 55026

- **Исходные файлы:** `/products/image_00085.jpg`, `/products/image_00086.jpg`
- **Поисковые признаки:** name/model tokens: Şahmat 55026; listing: 48286726; категория: `oyun`; запрос: "Şahmat 55026" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286726; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286726
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286726
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 47 — Trenajor aləti

- **Исходные файлы:** `/products/image_00087.jpg`, `/products/image_00088.jpg`
- **Поисковые признаки:** listing: 48286754; категория: `trenajor`; запрос: "Trenajor aləti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286754; https://fitx.az/product-category/butun-mehsullar/fitness-aletleri-trenajorlar/fitness-aksesuarlari/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://fitx.az/product-category/butun-mehsullar/fitness-aletleri-trenajorlar/fitness-aksesuarlari/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категория аксессуаров, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 48 — Şahmat 5208

- **Исходные файлы:** `/products/image_00089.jpg`, `/products/image_00090.jpg`
- **Поисковые признаки:** name/model tokens: Şahmat 5208; listing: 48286697; категория: `oyun`; запрос: "Şahmat 5208" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286697; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286697
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286697
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 49 — Domino

- **Исходные файлы:** `/products/image_00091.jpg`
- **Поисковые признаки:** listing: 48286672; категория: `oyun`; запрос: "Domino" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286672; https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Bkeywords%5D=domino; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Bkeywords%5D=domino
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** выдача по точному типу товара; модель не идентифицирована. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 50 — Tərləmə Paltarı

- **Исходные файлы:** `/products/image_00092.jpg`
- **Поисковые признаки:** listing: 48286592; категория: `geyim`; запрос: "Tərləmə Paltarı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48286592; https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48286592
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48286592
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 51 — Ağırlıq çantası

- **Исходные файлы:** `/products/image_00093.jpg`
- **Поисковые признаки:** listing: 48286543; категория: `agirliq`; запрос: "Ağırlıq çantası" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286543; https://alinino.az/product/agirliq-cantasi-weights-sand-bag; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://alinino.az/product/agirliq-cantasi-weights-sand-bag
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точный тип товара; условия сайта требуют письменного разрешения на copyrighted material. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 52 — Ağırlıq jileti

- **Исходные файлы:** `/products/image_00094.jpg`, `/products/image_00095.jpg`, `/products/image_00096.jpg`
- **Поисковые признаки:** listing: 48286493; категория: `agirliq`; запрос: "Ağırlıq jileti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286493; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43533276; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43533276
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точный тип товара в стороннем объявлении; лицензии нет. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 53 — Krosfit kanatı

- **Исходные файлы:** `/products/image_00097.jpg`, `/products/image_00098.jpg`
- **Поисковые признаки:** listing: 48286411; категория: `agirliq`; запрос: "Krosfit kanatı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286411; https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47389678; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47389678
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точное название в стороннем объявлении; лицензии нет. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 54 — Kanat (Pambıq)

- **Исходные файлы:** `/products/image_00099.jpg`
- **Поисковые признаки:** listing: 48286207; категория: `agirliq`; запрос: "Kanat (Pambıq)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48286207; https://zstore.az/products/kanat-tsvetnoj-romana-dop16-65100-20--standartnyj; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://zstore.az/products/kanat-tsvetnoj-romana-dop16-65100-20--standartnyj
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** похожий канат, но вариант/материал исходного товара не доказан. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 55 — Skeyt Canada

- **Исходные файлы:** `/products/image_00100.jpg`, `/products/image_00101.jpg`, `/products/image_00102.jpg`
- **Поисковые признаки:** listing: 48226500; категория: `rolik`; запрос: "Skeyt Canada" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226500; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226500
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226500
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 56 — Bilyard daşı

- **Исходные файлы:** `/products/image_00103.jpg`
- **Поисковые признаки:** listing: 48226599; категория: `bilyard`; запрос: "Bilyard daşı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226599; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226599
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48226599
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 57 — Masaj xalçası

- **Исходные файлы:** `/products/image_00104.jpg`
- **Поисковые признаки:** listing: 48271776; категория: `masaj`; запрос: "Masaj xalçası" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271776; https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271776
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271776
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 58 — Masaj yastığı

- **Исходные файлы:** `/products/image_00105.jpg`
- **Поисковые признаки:** listing: 48271751; категория: `masaj`; запрос: "Masaj yastığı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271751; https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271751
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271751
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 59 — Masaj aparatı Benice

- **Исходные файлы:** `/products/image_00106.jpg`, `/products/image_00107.jpg`
- **Поисковые признаки:** brand: ** Benice (Orijinal məhsul); listing: 48271709; категория: `masaj`; запрос: "Masaj aparatı Benice" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271709; https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271709
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271709
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 60 — Vibro Shape arıqladıcısı

- **Исходные файлы:** `/products/image_00108.jpg`
- **Поисковые признаки:** listing: 48271683; категория: `masaj`; запрос: "Vibro Shape arıqladıcısı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271683; https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271683
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271683
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 61 — Masaj aparatı 8816

- **Исходные файлы:** `/products/image_00109.jpg`
- **Поисковые признаки:** name/model tokens: 8816; listing: 48271672; категория: `masaj`; запрос: "Masaj aparatı 8816" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271672; https://www.supertoys.az/rolik-8806c; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.supertoys.az/rolik-8806c
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** найдена иная модель 8806C, поэтому совпадение с 8816 отклонено. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 62 — Masaj aparatı KH-740

- **Исходные файлы:** `/products/image_00110.jpg`
- **Поисковые признаки:** name/model tokens: KH-740; listing: 48271659; категория: `masaj`; запрос: "Masaj aparatı KH-740" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/gozellik-saglamliq/48271659; https://btech.com/en/p/dbd23fe7-74ef-43ed-9e84-bf6c4c22e606; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://btech.com/en/p/dbd23fe7-74ef-43ed-9e84-bf6c4c22e606
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** medium (обозначение модели), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 63 — Çoxfunksiyalı turnik

- **Исходные файлы:** `/products/image_00111.jpg`, `/products/image_00112.jpg`
- **Поисковые признаки:** listing: 48265793; категория: `agirliq`; запрос: "Çoxfunksiyalı turnik" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48265793; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47727945; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47727945
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точное название в стороннем объявлении; производитель не подтверждён. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 64 — Futbol topu Kenier

- **Исходные файлы:** `/products/image_00113.jpg`, `/products/image_00114.jpg`
- **Поисковые признаки:** listing: 48236796; категория: `futbol`; запрос: "Futbol topu Kenier" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48236796; https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+topu; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+topu
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найдено точное название Kenier; официальный бренд не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 65 — Cüdo kimonosu Sakura

- **Исходные файлы:** `/products/image_00115.jpg`, `/products/image_00116.jpg`
- **Поисковые признаки:** brand: Shogun; listing: 48261404; категория: `doyus`; запрос: "Cüdo kimonosu Sakura" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48261404; https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/41607406; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/41607406
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точное название Sakura в стороннем объявлении; право не подтверждено. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 66 — Cüdo Kimonosu Green Hill

- **Исходные файлы:** `/products/image_00117.jpg`, `/products/image_00118.jpg`
- **Поисковые признаки:** brand: Green Hill; listing: 48260009; категория: `doyus`; запрос: "Cüdo Kimonosu Green Hill" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48260009; https://greenhill.it/collections/judogi; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://greenhill.it/collections/judogi
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальная категория Green Hill judogi; конкретная модель объявления не определена. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 67 — Taxtalı sürət boks kisəsi

- **Исходные файлы:** `/products/image_00119.jpg`
- **Поисковые признаки:** brand: Everlast Style; listing: 48259937; категория: `doyus`; запрос: "Taxtalı sürət boks kisəsi" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48259937; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48259937
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48259937
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 68 — Adam boks kisəsi G081

- **Исходные файлы:** `/products/image_00120.jpg`
- **Поисковые признаки:** brand: Hui Jun; name/model tokens: 081; listing: 48259885; категория: `doyus`; запрос: "Adam boks kisəsi G081" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48259885; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qru%C5%9Fa+boks; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qru%C5%9Fa+boks
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден код G081; официальный производитель не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 69 — Boks kisəsi G075

- **Исходные файлы:** `/products/image_00121.jpg`
- **Поисковые признаки:** name/model tokens: 075; listing: 48259820; категория: `doyus`; запрос: "Boks kisəsi G075" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48259820; https://ru.tap.az/elanlar?q%5Bkeywords%5D=%D0%B3%D1%80%D1%83%D1%88%D0%B0+%D0%B4%D0%BB%D1%8F+%D0%B1%D0%BE%D0%BA%D1%81%D0%B0; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar?q%5Bkeywords%5D=%D0%B3%D1%80%D1%83%D1%88%D0%B0+%D0%B4%D0%BB%D1%8F+%D0%B1%D0%BE%D0%BA%D1%81%D0%B0
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден код G075; официальный производитель не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 70 — Tenis topu TOUR

- **Исходные файлы:** `/products/image_00122.jpg`, `/products/image_00123.jpg`
- **Поисковые признаки:** listing: 48257356; категория: `tenis`; запрос: "Tenis topu TOUR" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257356; https://www.decathlon.com.tr/p/tenis-topu-4-adet-sari-tour-xt/_/R-p-X8744549; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.decathlon.com.tr/p/tenis-topu-4-adet-sari-tour-xt/_/R-p-X8744549
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** TOUR XT — частичное совпадение, бренд/вариант исходного товара не доказан. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 71 — Tenis topu

- **Исходные файлы:** `/products/image_00124.jpg`
- **Поисковые признаки:** listing: 48257353; категория: `tenis`; запрос: "Tenis topu" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257353; https://www.sportifhayat.com/kategori/toplar; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.sportifhayat.com/kategori/toplar
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категория мячей, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 72 — Tenis toru

- **Исходные файлы:** `/products/image_00125.jpg`
- **Поисковые признаки:** listing: 48257350; категория: `tenis`; запрос: "Tenis toru" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257350; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257350
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257350
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 73 — Tenis raketkası ODEA Pro

- **Исходные файлы:** `/products/image_00126.jpg`
- **Поисковые признаки:** listing: 48257344; категория: `tenis`; запрос: "Tenis raketkası ODEA Pro" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257344; https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найдено ODEA Pro; официальный производитель не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 74 — Tenis raketkası WİLSON

- **Исходные файлы:** `/products/image_00127.jpg`
- **Поисковые признаки:** listing: 48257342; категория: `tenis`; запрос: "Tenis raketkası WİLSON" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257342; https://www.wilson.com/en-us/tennis/tennis-rackets; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.wilson.com/en-us/tennis/tennis-rackets
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** low (точный товар), none (коммерческое право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 75 — Tenis raketkasi ODEA

- **Исходные файлы:** `/products/image_00128.jpg`
- **Поисковые признаки:** listing: 48257339; категория: `tenis`; запрос: "Tenis raketkasi ODEA" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257339; https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=raketka+tennis
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найдено ODEA; официальный производитель не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 76 — Badminton FOX Cüt

- **Исходные файлы:** `/products/image_00129.jpg`
- **Поисковые признаки:** listing: 48257330; категория: `tenis`; запрос: "Badminton FOX Cüt" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257330; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257330
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257330
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 77 — Badminton FOX

- **Исходные файлы:** `/products/image_00130.jpg`
- **Поисковые признаки:** brand: FOX; listing: 48257328; категория: `tenis`; запрос: "Badminton FOX" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257328; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257328
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257328
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 78 — Tatami

- **Исходные файлы:** `/products/image_00131.jpg`, `/products/image_00132.jpg`
- **Поисковые признаки:** listing: 48257303; категория: `doyus`; запрос: "Tatami" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257303; https://tatami-kyoto.com/product2.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tatami-kyoto.com/product2.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** совпадение только по общему слову tatami; иной тип/производитель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 79 — Qrif F30 1.20m

- **Исходные файлы:** `/products/image_00133.jpg`, `/products/image_00134.jpg`, `/products/image_00135.jpg`
- **Поисковые признаки:** name/model tokens: 30, 20m; listing: 48257276; категория: `agirliq`; запрос: "Qrif F30 1.20m" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48257276; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qantel+%C5%9Ftanq; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=qantel+%C5%9Ftanq
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден F30 1.20m; официальный производитель не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 80 — Qantel altıkünc

- **Исходные файлы:** `/products/image_00136.jpg`
- **Поисковые признаки:** listing: 48253651; категория: `agirliq`; запрос: "Qantel altıkünc" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48253651; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** найден точный тип hex dumbbell; точная модель не указана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 81 — Qantel xrom

- **Исходные файлы:** `/products/image_00137.jpg`, `/products/image_00138.jpg`
- **Поисковые признаки:** listing: 48253587; категория: `agirliq`; запрос: "Qantel xrom" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48253587; https://lalafo.az/baku/sport-i-otdykh/qanteller/q-qantel-xrom; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://lalafo.az/baku/sport-i-otdykh/qanteller/q-qantel-xrom
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точный тип chrome dumbbell; не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 82 — Masaj Rolikli İkitərəfli Velotrenajor

- **Исходные файлы:** `/products/image_00139.jpg`
- **Поисковые признаки:** listing: 48252772; категория: `trenajor`; запрос: "Masaj Rolikli İkitərəfli Velotrenajor" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48252772; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найдено точное название; производителя нет. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 83 — İkitərəfli Qol və Ayaq Velotrenajoru

- **Исходные файлы:** `/products/image_00140.jpg`, `/products/image_00141.jpg`
- **Поисковые признаки:** listing: 48252703; категория: `trenajor`; запрос: "İkitərəfli Qol və Ayaq Velotrenajoru" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48252703; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=trenajor+aletleri
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найдено точное название; производителя нет. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 84 — Mini velotrenajor

- **Исходные файлы:** `/products/image_00142.jpg`
- **Поисковые признаки:** listing: 48252510; категория: `trenajor`; запрос: "Mini velotrenajor" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48252510; https://www.esport.az/az/catalog/fitnes-ve-trenajorlar/kardio-trenajorlar/4; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.esport.az/az/catalog/fitnes-ve-trenajorlar/kardio-trenajorlar/4
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** категория мини-велотренажёров, не точная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 85 — Qantel dəsti 55kq

- **Исходные файлы:** `/products/image_00143.jpg`, `/products/image_00144.jpg`
- **Поисковые признаки:** name/model tokens: dəsti 55k; listing: 48250339; категория: `agirliq`; запрос: "Qantel dəsti 55kq" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250339; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47338943; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/47338943
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** стороннее объявление 55 кг; вариант исходного комплекта не доказан. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 86 — Qantel dəsti 50kq

- **Исходные файлы:** `/products/image_00145.jpg`, `/products/image_00146.jpg`
- **Поисковые признаки:** name/model tokens: dəsti 50k; listing: 48250306; категория: `agirliq`; запрос: "Qantel dəsti 50kq" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250306; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43631263; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/43631263
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** стороннее объявление 50 кг; вариант исходного комплекта не доказан. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 87 — Rolik

- **Исходные файлы:** `/products/image_00147.jpg`, `/products/image_00148.jpg`
- **Поисковые признаки:** listing: 48250102; категория: `rolik`; запрос: "Rolik" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250102; https://rilo.az/product/suxfly-inline/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://rilo.az/product/suxfly-inline/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** конкретный SUXFLY, тогда как исходный Rolik не содержит бренда — не точное совпадение. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 88 — Buz konkisi

- **Исходные файлы:** `/products/image_00149.jpg`, `/products/image_00150.jpg`
- **Поисковые признаки:** listing: 48250056; категория: `rolik`; запрос: "Buz konkisi" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250056; https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** выдача по точному типу товара; модель не установлена. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 89 — Rolik SUXFLY

- **Исходные файлы:** `/products/image_00151.jpg`, `/products/image_00152.jpg`, `/products/image_00153.jpg`
- **Поисковые признаки:** listing: 48250025; категория: `rolik`; запрос: "Rolik SUXFLY" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48250025; https://rilo.az/product/suxfly-inline/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://rilo.az/product/suxfly-inline/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точное совпадение бренда/линейки SUXFLY; вариант и коммерческое право не подтверждены. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 90 — Elektrik skuter HX-X8

- **Исходные файлы:** `/products/image_00154.jpg`, `/products/image_00155.jpg`
- **Поисковые признаки:** name/model tokens: HX-X8; listing: 48249971; категория: `skuter`; запрос: "Elektrik skuter HX-X8" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48249971; https://hxescooter.com/product/x8-scooter/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://hxescooter.com/product/x8-scooter/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** medium (модель), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 91 — Furbol qapısı (200×300)

- **Исходные файлы:** `/products/image_00156.jpg`, `/products/image_00157.jpg`
- **Поисковые признаки:** name/model tokens: 200, 300; listing: 48248459; категория: `futbol`; запрос: "Furbol qapısı (200×300)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48248459; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден размер 200×300; фото стороннего объявления. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 92 — Futbol qapısı (210×150)

- **Исходные файлы:** `/products/image_00158.jpg`, `/products/image_00159.jpg`
- **Поисковые признаки:** name/model tokens: 210, 150; listing: 48248441; категория: `futbol`; запрос: "Futbol qapısı (210×150)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48248441; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден размер 210×150; фото стороннего объявления. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 93 — Futbol qapısı (120×80)

- **Исходные файлы:** `/products/image_00160.jpg`, `/products/image_00161.jpg`
- **Поисковые признаки:** name/model tokens: 120, 80; listing: 48248338; категория: `futbol`; запрос: "Futbol qapısı (120×80)" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48248338; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=futbol+qap%C4%B1
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден размер 120×80; фото стороннего объявления. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 94 — Futbol Topu Orijinal Molten Vantaggio 5000

- **Исходные файлы:** `/products/image_00162.jpg`
- **Поисковые признаки:** name/model tokens: Vantaggio 5000; listing: 48237070; категория: `futbol`; запрос: "Futbol Topu Orijinal Molten Vantaggio 5000" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48237070; https://sports.molten.co.jp/en/index.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://sports.molten.co.jp/en/index.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** medium (модель/линейка), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 95 — Futbol topu Orijinal Molten Vantaggio 2810

- **Исходные файлы:** `/products/image_00163.jpg`
- **Поисковые признаки:** name/model tokens: Vantaggio 2810; listing: 48236987; категория: `futbol`; запрос: "Futbol topu Orijinal Molten Vantaggio 2810" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48236987; https://sports.molten.co.jp/en/index.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://sports.molten.co.jp/en/index.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** low (точная модель), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 96 — Futbol topu Molten 3200

- **Исходные файлы:** `/products/image_00164.jpg`
- **Поисковые признаки:** name/model tokens: Molten 3200; listing: 48236959; категория: `futbol`; запрос: "Futbol topu Molten 3200" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48236959; https://sports.molten.co.jp/en/index.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://sports.molten.co.jp/en/index.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** low (точная модель), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 97 — Basketbol topu

- **Исходные файлы:** `/products/image_00165.jpg`
- **Поисковые признаки:** brand: Molten; listing: 48235510; категория: `basketbol`; запрос: "Basketbol topu" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48235510; https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4014&q%5Bkeywords%5D=basketbol+topu; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://ru.tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4014&q%5Bkeywords%5D=basketbol+topu
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** выдача по точному типу, но модель исходного мяча неизвестна. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 98 — Basketbol topu Molten GQ7X

- **Исходные файлы:** `/products/image_00166.jpg`
- **Поисковые признаки:** brand: Molten; listing: 48235472; категория: `basketbol`; запрос: "Basketbol topu Molten GQ7X" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48235472; https://sports.molten.co.jp/en/index.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://sports.molten.co.jp/en/index.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** low (точная модель), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 99 — Basketbol tapu Molten GG6X

- **Исходные файлы:** `/products/image_00167.jpg`
- **Поисковые признаки:** brand: Molten; listing: 48233481; категория: `basketbol`; запрос: "Basketbol tapu Molten GG6X" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48233481; https://sports.molten.co.jp/en/index.html; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://sports.molten.co.jp/en/index.html
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** low (точная модель), none (право). Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 100 — Basketbol səbəti

- **Исходные файлы:** `/products/image_00168.jpg`
- **Поисковые признаки:** listing: 48233251; категория: `basketbol`; запрос: "Basketbol səbəti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48233251; https://tap.az/elanlar?q%5Bkeywords%5D=basketbol+s%C9%99b%C9%99t; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=basketbol+s%C9%99b%C9%99t
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** выдача по точному типу, но модель не определена. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 101 — Okey VİP

- **Исходные файлы:** `/products/image_00169.jpg`, `/products/image_00170.jpg`, `/products/image_00171.jpg`
- **Поисковые признаки:** brand: Star Okey (Orijinal Türkiyə istehsalı).; listing: 48228185; категория: `oyun`; запрос: "Okey VİP" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48228185; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Buser_id%5D=13599068; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?p%5B788%5D=4015&q%5Buser_id%5D=13599068
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** найден Okey VIP у продавца; производитель/лицензия не подтверждены. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 102 — Mikasa voleybol topu Hiloqramlı

- **Исходные файлы:** `/products/image_00172.jpg`
- **Поисковые признаки:** listing: 48227198; категория: `basketbol`; запрос: "Mikasa voleybol topu Hiloqramlı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48227198; https://www.mikasa.com/pages/terms-of-use; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://www.mikasa.com/pages/terms-of-use
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальные условия Mikasa запрещают коммерческое воспроизведение без письменного разрешения; точная модель Hiloqramlı не найдена. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 103 — Star Okey dəsti - 101 Plus Rummy Set

- **Исходные файлы:** `/products/image_00173.jpg`
- **Поисковые признаки:** name/model tokens: dəsti - 101; listing: 48227094; категория: `oyun`; запрос: "Star Okey dəsti - 101 Plus Rummy Set" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48227094; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=sarlar; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude?q%5Bkeywords%5D=sarlar
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** в выдаче найден 101 Plus/Star VIP; точная упаковка не доказана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 104 — Tərəzi EurOlux

- **Исходные файлы:** `/products/image_00174.jpg`
- **Поисковые признаки:** brand: Eurolux; listing: 48226821; категория: `masaj`; запрос: "Tərəzi EurOlux" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/ev-ve-bag-ucun/meiset-texnikasi/48226821; https://eurolux.az/tereziler/; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://eurolux.az/tereziler/
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** официальная категория Eurolux; точная модель весов не указана. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 105 — Rolik dəsti

- **Исходные файлы:** `/products/image_00175.jpg`, `/products/image_00176.jpg`
- **Поисковые признаки:** listing: 48220356; категория: `rolik`; запрос: "Rolik dəsti" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48220356; https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=konki+buz
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** только общая выдача роликов/коньков, не точный комплект. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 106 — Rolik TİAN-E

- **Исходные файлы:** `/products/image_00177.jpg`, `/products/image_00178.jpg`
- **Поисковые признаки:** name/model tokens: AN-E; listing: 48218679; категория: `rolik`; запрос: "Rolik TİAN-E" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218679; https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218679
- **Лучший найденный источник:** https://tap.az/elanlar/hobbi-ve-asude/idman-ve-asude/48218679
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** внешний точный официальный результат по этому индивидуальному запросу не найден. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 107 — İdman ayaqqabısı

- **Исходные файлы:** `/products/image_00179.jpg`, `/products/image_00180.jpg`, `/products/image_00181.jpg`, `/products/image_00182.jpg`, `/products/image_00183.jpg`, `/products/image_00184.jpg`, `/products/image_00185.jpg`, `/products/image_00186.jpg`, `/products/image_00187.jpg`
- **Поисковые признаки:** listing: 48214730; категория: `geyim`; запрос: "İdman ayaqqabısı" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48214730; https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/47855438; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/47855438
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точный общий тип обуви, но не модель исходного товара. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 108 — Barsovka

- **Исходные файлы:** `/products/image_00188.jpg`, `/products/image_00189.jpg`, `/products/image_00190.jpg`
- **Поисковые признаки:** listing: 48206975; категория: `geyim`; запрос: "Barsovka" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/geyim-ayaqqabilar/48206975; https://tap.az/elanlar?q%5Bkeywords%5D=bel+cantas%C4%B1; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar?q%5Bkeywords%5D=bel+cantas%C4%B1
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** поиск трактует Barsovka как поясную сумку; точность низкая. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.

### 109 — İdman çantaları

- **Исходные файлы:** `/products/image_00191.jpg`, `/products/image_00192.jpg`, `/products/image_00193.jpg`, `/products/image_00194.jpg`
- **Поисковые признаки:** listing: 48206881; категория: `diger`; запрос: "İdman çantaları" product image official commercial use
- **Проверенные страницы:** https://tap.az/elanlar/sexsi-esyalar/aksesuarlar/48206881; https://tap.az/elanlar/sexsi-esyalar/aksesuarlar?q%5Bkeywords%5D=idman+%C3%A7antalar%C4%B1; https://tap.az/pages/terms-and-conditions-v1
- **Лучший найденный источник:** https://tap.az/elanlar/sexsi-esyalar/aksesuarlar?q%5Bkeywords%5D=idman+%C3%A7antalar%C4%B1
- **Прямой URL изображения:** —
- **Доказательство/проверка совпадения:** точная категория спортивных сумок, не конкретная модель. Этого недостаточно, чтобы визуально подтвердить ту же модель, вариант, цвет, конструкцию и заметные детали по локальному эталону.
- **Решение:** оставить исходные фото без изменения; подтверждённого чистого packshot точного варианта нет.
- **Новые файлы:** —.
