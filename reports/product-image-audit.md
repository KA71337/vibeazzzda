# VIBE AZ — product image audit

Generated: 2026-08-15T09:23:05.229Z

## Scope and summary

- Catalog: `data/products.json` (parsed in full)
- Products: **108**; duplicate product IDs: **0**; products without images: **0**
- Image references: **194**; unique references: **194**
- Image files in `public/products`: **194**; unreferenced/orphan files: **0**
- Missing: **0**; unreadable/corrupt: **0**; files with technical warnings: **0**
- Exact duplicate groups (SHA-256): **0**; potential visual near-duplicate pairs (64-bit dHash distance <= 4): **15**
- Tap.az text found in embedded binary/metadata: **0**. This is not OCR and does not rule out visible watermarks.

## UI image usage

- `src/data/products.ts` imports this catalog directly and defines `images: string[]`.
- `src/components/product-card.tsx`: cards render only `p.images[0]` in a square `next/image` container with `object-cover`; non-square images can be cropped. There is no fallback for an empty/missing image array.
- `src/components/product-detail.tsx`: the selected image is rendered in a square `object-cover` main viewer; all images become 80×80 `object-cover` thumbnails when more than one exists. The first image is initially selected. Duplicate image paths would also create duplicate React keys.
- `src/components/catalog.tsx`: every catalog result is passed to the card component; therefore every product depends on a valid first image.

## Watermark / Tap.az assessment

- Local automated checks searched JPEG binary/metadata for `tap.az`. No OCR engine or trusted Tap.az logo template was available, so visible watermark/logo detection is **not conclusively automated**.
- Catalog source links and many descriptions point to Tap.az; ownership/licensing and visible watermark review should be confirmed manually before any removal or replacement. No images were changed by this audit.

## Explicit global issues

- Potential visual near-duplicate (dHash 4): `/products/image_00002.jpg` ↔ `/products/image_00008.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00007.jpg` ↔ `/products/image_00010.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00024.jpg` ↔ `/products/image_00025.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00117.jpg` ↔ `/products/image_00120.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00117.jpg` ↔ `/products/image_00121.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00118.jpg` ↔ `/products/image_00121.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00120.jpg` ↔ `/products/image_00121.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00182.jpg` ↔ `/products/image_00183.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00182.jpg` ↔ `/products/image_00184.jpg`
- Potential visual near-duplicate (dHash 2): `/products/image_00183.jpg` ↔ `/products/image_00184.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00184.jpg` ↔ `/products/image_00185.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00185.jpg` ↔ `/products/image_00186.jpg`
- Potential visual near-duplicate (dHash 3): `/products/image_00185.jpg` ↔ `/products/image_00187.jpg`
- Potential visual near-duplicate (dHash 2): `/products/image_00186.jpg` ↔ `/products/image_00187.jpg`
- Potential visual near-duplicate (dHash 4): `/products/image_00186.jpg` ↔ `/products/image_00194.jpg`

## Per-product inventory

### 2 — Rolik Lescaul

- Category: `rolik`; images: **10**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00001.jpg` | yes | jpeg | 1200×1200 | 0.13 MiB | 2c33a2303191 | — |
| 2 | `/products/image_00002.jpg` | yes | jpeg | 1200×1200 | 0.12 MiB | 5a6417f63a83 | — |
| 3 | `/products/image_00003.jpg` | yes | jpeg | 1200×1200 | 0.08 MiB | 1265bd4c7b38 | — |
| 4 | `/products/image_00004.jpg` | yes | jpeg | 1200×1200 | 0.14 MiB | db2a46e8221f | — |
| 5 | `/products/image_00005.jpg` | yes | jpeg | 1200×1200 | 0.18 MiB | 0de95061618f | — |
| 6 | `/products/image_00006.jpg` | yes | jpeg | 1200×1200 | 0.21 MiB | 8a9c510a2062 | — |
| 7 | `/products/image_00007.jpg` | yes | jpeg | 1200×1200 | 0.15 MiB | acda0f1e740c | — |
| 8 | `/products/image_00008.jpg` | yes | jpeg | 1200×1200 | 0.15 MiB | f6bd70ac9aff | — |
| 9 | `/products/image_00009.jpg` | yes | jpeg | 1200×1200 | 0.14 MiB | 25969e74acda | — |
| 10 | `/products/image_00010.jpg` | yes | jpeg | 1200×1200 | 0.14 MiB | c3915dde5a45 | — |

### 3 — Elektron Skuter XM-1

- Category: `skuter`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00011.jpg` | yes | jpeg | 1250×1200 | 0.10 MiB | c6023479c08e | — |

### 4 — Basketbol oyunu 2 neferlik

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00012.jpg` | yes | jpeg | 1200×1200 | 0.11 MiB | 9695bcc41584 | — |

### 5 — Basketbol oyunu

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00013.jpg` | yes | jpeg | 1200×1200 | 0.10 MiB | 02d6c9c6c838 | — |

### 6 — Turnik

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00014.jpg` | yes | jpeg | 1276×1200 | 0.05 MiB | 743860cb5ef1 | — |

### 7 — Boks forması

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00015.jpg` | yes | jpeg | 1523×1200 | 0.10 MiB | 3575d9052852 | — |
| 2 | `/products/image_00016.jpg` | yes | jpeg | 1600×1173 | 0.10 MiB | 4ce477e379e1 | — |

### 8 — İdman ayaqqabısı rollikli

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00017.jpg` | yes | jpeg | 1094×1200 | 0.14 MiB | 79bb6730f9d2 | — |
| 2 | `/products/image_00018.jpg` | yes | jpeg | 1305×1200 | 0.16 MiB | 04b07fefb613 | — |

### 9 — İdman ayaqqabısı rolikli

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00019.jpg` | yes | jpeg | 1286×1200 | 0.12 MiB | 251c2413ade7 | — |
| 2 | `/products/image_00020.jpg` | yes | jpeg | 1231×1200 | 0.12 MiB | aaa372abc862 | — |

### 10 — İdman ayaqqabısı rollikli

- Category: `rolik`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00021.jpg` | yes | jpeg | 1241×1200 | 0.16 MiB | fbdb6c46f57a | — |
| 2 | `/products/image_00022.jpg` | yes | jpeg | 1208×1200 | 0.14 MiB | b5e67b277ee5 | — |
| 3 | `/products/image_00023.jpg` | yes | jpeg | 1264×1200 | 0.12 MiB | d182106477aa | — |

### 11 — Bilyard Kiyi (145 sm / 160 sm)

- Category: `bilyard`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00024.jpg` | yes | jpeg | 1196×1200 | 0.06 MiB | 54a623f509cb | — |
| 2 | `/products/image_00025.jpg` | yes | jpeg | 1179×1200 | 0.06 MiB | 2132a09d6d62 | — |

### 12 — Qantel

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00026.jpg` | yes | jpeg | 1198×1200 | 0.08 MiB | 69d881f8787c | — |
| 2 | `/products/image_00027.jpg` | yes | jpeg | 1200×1200 | 0.07 MiB | e56d07d76646 | — |

### 13 — Rolik dəsti

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00028.jpg` | yes | jpeg | 1215×1200 | 0.15 MiB | ae73ae266524 | — |
| 2 | `/products/image_00029.jpg` | yes | jpeg | 1202×1200 | 0.12 MiB | 438eb6dccc8f | — |

### 14 — Stadion toru

- Category: `futbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00030.jpg` | yes | jpeg | 1230×1200 | 0.18 MiB | dab61bdfd42e | — |

### 15 — Bilyard kiyi

- Category: `bilyard`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00031.jpg` | yes | jpeg | 1187×1200 | 0.05 MiB | 1c206093d13e | — |

### 16 — Turnik

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00032.jpg` | yes | jpeg | 1440×1200 | 0.07 MiB | 25e6c6380b2c | — |

### 17 — Kiy Orginal

- Category: `bilyard`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00033.jpg` | yes | jpeg | 1202×1200 | 0.09 MiB | a063157e976e | — |

### 18 — Rolik Roselle

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00034.jpg` | yes | jpeg | 1220×1200 | 0.15 MiB | 31504405f8b6 | — |
| 2 | `/products/image_00035.jpg` | yes | jpeg | 1173×1200 | 0.10 MiB | f10944a563a2 | — |

### 19 — Velotrenajor 520

- Category: `trenajor`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00036.jpg` | yes | jpeg | 885×1200 | 0.05 MiB | d80d5aa5a3e1 | — |

### 20 — Velotrenajor 603

- Category: `trenajor`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00037.jpg` | yes | jpeg | 1094×1200 | 0.05 MiB | 02be78f7a7ec | — |

### 21 — Velotrenajor 4800

- Category: `trenajor`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00038.jpg` | yes | jpeg | 947×1200 | 0.05 MiB | 1c5cb0106f52 | — |

### 22 — Divar turniki

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00039.jpg` | yes | jpeg | 1181×1200 | 0.14 MiB | 5752e10cb45f | — |
| 2 | `/products/image_00040.jpg` | yes | jpeg | 1284×1200 | 0.07 MiB | d7d0c549519c | — |

### 23 — Futbol qapıçı dəsti

- Category: `futbol`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00041.jpg` | yes | jpeg | 1210×1200 | 0.11 MiB | ab41b091dc7a | — |
| 2 | `/products/image_00042.jpg` | yes | jpeg | 1269×1200 | 0.12 MiB | 958964c2fec7 | — |
| 3 | `/products/image_00043.jpg` | yes | jpeg | 1183×1200 | 0.08 MiB | 61a231fe2791 | — |

### 24 — Dəri boks əlcəkləri Adidas

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00044.jpg` | yes | jpeg | 1236×1200 | 0.11 MiB | 31ec4cb8004c | — |
| 2 | `/products/image_00045.jpg` | yes | jpeg | 1214×1200 | 0.10 MiB | fe2857de7e53 | — |

### 25 — Boks əlcəkləri Top Ten

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00046.jpg` | yes | jpeg | 1216×1200 | 0.15 MiB | 1cc8d6c1395c | — |
| 2 | `/products/image_00047.jpg` | yes | jpeg | 1198×1200 | 0.12 MiB | 5f49ddd5d938 | — |

### 26 — MMA ayaq qoruyucusu Top Ten

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00048.jpg` | yes | jpeg | 967×1200 | 0.08 MiB | 61aec4e9110b | — |
| 2 | `/products/image_00049.jpg` | yes | jpeg | 1053×1200 | 0.08 MiB | 6e587966cb49 | — |

### 27 — Boks və kikboks dəbilqəsi

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00050.jpg` | yes | jpeg | 1018×1200 | 0.07 MiB | 46c19fb5d61e | — |
| 2 | `/products/image_00051.jpg` | yes | jpeg | 1255×1200 | 0.09 MiB | 4b5af4e8e26b | — |

### 28 — Konki

- Category: `rolik`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00052.jpg` | yes | jpeg | 1200×1200 | 0.10 MiB | dd830125ae9b | — |

### 29 — Rolik dəsti

- Category: `rolik`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00053.jpg` | yes | jpeg | 788×1200 | 0.11 MiB | 5f0538e75e46 | — |

### 30 — Uşaq üçün dırmaşma kəndiri və disk yelləncək

- Category: `usaq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00054.jpg` | yes | jpeg | 1019×1200 | 0.10 MiB | 17adc8de1c4f | — |

### 31 — Peşəkar pres katoku

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00055.jpg` | yes | jpeg | 1135×1200 | 0.10 MiB | 829999f4d93d | — |

### 32 — Qruzlu Pres Katoku (Ab Roller) iki təkərli

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00056.jpg` | yes | jpeg | 1294×1200 | 0.08 MiB | 1dd22b024e93 | — |

### 33 — Masaüstü futbol

- Category: `oyun`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00057.jpg` | yes | jpeg | 1218×1200 | 0.09 MiB | c362fe5b55be | — |

### 34 — Peşəkar masaüstü futbol

- Category: `oyun`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00058.jpg` | yes | jpeg | 1354×1200 | 0.11 MiB | adcdd5f707ec | — |

### 35 — Peşəkar güləş xalçası

- Category: `doyus`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00059.jpg` | yes | jpeg | 1183×1200 | 0.06 MiB | 899c8003719f | — |
| 2 | `/products/image_00060.jpg` | yes | jpeg | 1214×1200 | 0.06 MiB | bf2468adffa8 | — |
| 3 | `/products/image_00061.jpg` | yes | jpeg | 1291×1200 | 0.06 MiB | 35e4fe10443d | — |

### 36 — Qızıl buts mükafatı

- Category: `kubok`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00062.jpg` | yes | jpeg | 1266×1200 | 0.11 MiB | 5fd393c7ed65 | — |

### 37 — Qızıl Top mükafatı (Ballon d'Or)

- Category: `kubok`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00063.jpg` | yes | jpeg | 1142×1200 | 0.13 MiB | ebc30be24058 | — |
| 2 | `/products/image_00064.jpg` | yes | jpeg | 1236×1200 | 0.12 MiB | 4498d47a3b08 | — |

### 38 — Kubok Fifa Dünya Çempionatı

- Category: `kubok`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00065.jpg` | yes | jpeg | 1166×1200 | 0.10 MiB | 2d2f6ffb1ec7 | — |

### 39 — Kubok UEFA Çempionlar Liqası

- Category: `kubok`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00066.jpg` | yes | jpeg | 1133×1200 | 0.07 MiB | 6ac3579be9c5 | — |

### 40 — Futbol ləvazimatları və sürət avadanlıqları

- Category: `futbol`; images: **7**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00067.jpg` | yes | jpeg | 1236×1200 | 0.03 MiB | 00bc2062c95b | — |
| 2 | `/products/image_00068.jpg` | yes | jpeg | 1200×1200 | 0.11 MiB | 5b63722ecc4a | — |
| 3 | `/products/image_00069.jpg` | yes | jpeg | 1200×1200 | 0.18 MiB | e03176f755cd | — |
| 4 | `/products/image_00070.jpg` | yes | jpeg | 1200×1200 | 0.06 MiB | 582b13f5efcc | — |
| 5 | `/products/image_00071.jpg` | yes | jpeg | 1260×1200 | 0.07 MiB | 045515d65ea2 | — |
| 6 | `/products/image_00072.jpg` | yes | jpeg | 1200×1200 | 0.07 MiB | 7d4566689129 | — |
| 7 | `/products/image_00073.jpg` | yes | jpeg | 1200×1200 | 0.02 MiB | 5b49f81ae784 | — |

### 41 — Sapan

- Category: `diger`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00074.jpg` | yes | jpeg | 1223×1200 | 0.10 MiB | 1780ef4cc028 | — |

### 42 — Tramplin

- Category: `usaq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00075.jpg` | yes | jpeg | 1214×1200 | 0.07 MiB | f8675e1d6bab | — |
| 2 | `/products/image_00076.jpg` | yes | jpeg | 1230×1200 | 0.06 MiB | 9858bbccb051 | — |

### 43 — Roliklər

- Category: `rolik`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00077.jpg` | yes | jpeg | 1276×1200 | 0.20 MiB | 1f94da038546 | — |
| 2 | `/products/image_00078.jpg` | yes | jpeg | 1405×1200 | 0.15 MiB | 0f37b50297e3 | — |
| 3 | `/products/image_00079.jpg` | yes | jpeg | 1241×1200 | 0.18 MiB | cd7ed82166db | — |

### 44 — Peşəkar Qravitasiya çəkmələri / Turnik Qarmağı

- Category: `agirliq`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00080.jpg` | yes | jpeg | 1200×1200 | 0.09 MiB | fd9824b550f4 | — |
| 2 | `/products/image_00081.jpg` | yes | jpeg | 1200×1200 | 0.14 MiB | cc845f11efa3 | — |
| 3 | `/products/image_00082.jpg` | yes | jpeg | 1184×1200 | 0.11 MiB | 6400c37e2931 | — |

### 45 — Dart ekranlı

- Category: `oyun`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00083.jpg` | yes | jpeg | 1202×1200 | 0.29 MiB | 334ce90fa079 | — |
| 2 | `/products/image_00084.jpg` | yes | jpeg | 1197×1200 | 0.11 MiB | 9f3a9df46615 | — |

### 46 — Şahmat 55026

- Category: `oyun`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00085.jpg` | yes | jpeg | 1131×1200 | 0.17 MiB | c346611b7187 | — |
| 2 | `/products/image_00086.jpg` | yes | jpeg | 1200×1200 | 0.11 MiB | fdb499831505 | — |

### 47 — Trenajor aləti

- Category: `trenajor`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00087.jpg` | yes | jpeg | 1228×1200 | 0.12 MiB | c7aa47c7d826 | — |
| 2 | `/products/image_00088.jpg` | yes | jpeg | 1201×1200 | 0.06 MiB | 18c0b61cd93d | — |

### 48 — Şahmat 5208

- Category: `oyun`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00089.jpg` | yes | jpeg | 1228×1200 | 0.18 MiB | 84fed20ab9e1 | — |
| 2 | `/products/image_00090.jpg` | yes | jpeg | 1200×1200 | 0.12 MiB | 40a9806e0cc4 | — |

### 49 — Domino

- Category: `oyun`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00091.jpg` | yes | jpeg | 1272×1200 | 0.12 MiB | 7f96f63d5397 | — |

### 50 — Tərləmə Paltarı

- Category: `geyim`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00092.jpg` | yes | jpeg | 1172×1200 | 0.14 MiB | 5ed7a6d778b0 | — |

### 51 — Ağırlıq çantası

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00093.jpg` | yes | jpeg | 1226×1200 | 0.16 MiB | 99759e28ef32 | — |

### 52 — Ağırlıq jileti

- Category: `agirliq`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00094.jpg` | yes | jpeg | 1200×1200 | 0.19 MiB | 991fbc8f90f2 | — |
| 2 | `/products/image_00095.jpg` | yes | jpeg | 1233×1200 | 0.14 MiB | d0b97e73a4e4 | — |
| 3 | `/products/image_00096.jpg` | yes | jpeg | 1195×1200 | 0.19 MiB | f58b78f4ec98 | — |

### 53 — Krosfit kanatı

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00097.jpg` | yes | jpeg | 1200×1200 | 0.15 MiB | cd82770eda41 | — |
| 2 | `/products/image_00098.jpg` | yes | jpeg | 1201×1200 | 0.21 MiB | 2d14948a6652 | — |

### 54 — Kanat (Pambıq)

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00099.jpg` | yes | jpeg | 1200×1200 | 0.08 MiB | 73880e5ca6f3 | — |

### 55 — Skeyt Canada

- Category: `rolik`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00100.jpg` | yes | jpeg | 1200×1200 | 0.16 MiB | 0e029c398d87 | — |
| 2 | `/products/image_00101.jpg` | yes | jpeg | 1553×1200 | 0.06 MiB | cbe2ab14207a | — |
| 3 | `/products/image_00102.jpg` | yes | jpeg | 1143×1200 | 0.04 MiB | 28d9c31f2ca2 | — |

### 56 — Bilyard daşı

- Category: `bilyard`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00103.jpg` | yes | jpeg | 1348×1200 | 0.14 MiB | 3853ab07d429 | — |

### 57 — Masaj xalçası

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00104.jpg` | yes | jpeg | 885×1200 | 0.10 MiB | e070ff90b984 | — |

### 58 — Masaj yastığı

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00105.jpg` | yes | jpeg | 1200×1200 | 0.11 MiB | 89c7b1f01432 | — |

### 59 — Masaj aparatı Benice

- Category: `masaj`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00106.jpg` | yes | jpeg | 1256×1200 | 0.16 MiB | 49df2e2284ff | — |
| 2 | `/products/image_00107.jpg` | yes | jpeg | 1221×1200 | 0.07 MiB | d161a4b95abc | — |

### 60 — Vibro Shape arıqladıcısı

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00108.jpg` | yes | jpeg | 1368×1200 | 0.12 MiB | 32680a56937e | — |

### 61 — Masaj aparatı 8816

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00109.jpg` | yes | jpeg | 1347×1200 | 0.08 MiB | 7cf98dcb1547 | — |

### 62 — Masaj aparatı KH-740

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00110.jpg` | yes | jpeg | 1188×1200 | 0.10 MiB | b8e913f76e3d | — |

### 63 — Çoxfunksiyalı turnik

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00111.jpg` | yes | jpeg | 1178×1200 | 0.06 MiB | 0684eabc4f53 | — |
| 2 | `/products/image_00112.jpg` | yes | jpeg | 734×1200 | 0.07 MiB | d67fcb1ec2fa | — |

### 64 — Futbol topu Kenier

- Category: `futbol`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00113.jpg` | yes | jpeg | 1318×1200 | 0.13 MiB | acbfba8d6585 | — |
| 2 | `/products/image_00114.jpg` | yes | jpeg | 1269×1200 | 0.12 MiB | f4f9bf1a31bc | — |

### 65 — Cüdo kimonosu Sakura

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00115.jpg` | yes | jpeg | 1200×1200 | 0.10 MiB | 3f9b012132c4 | — |
| 2 | `/products/image_00116.jpg` | yes | jpeg | 1200×1200 | 0.09 MiB | 2f5dc38f15bf | — |

### 66 — Cüdo Kimonosu Green Hill

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00117.jpg` | yes | jpeg | 1178×1200 | 0.07 MiB | afaa2aaa723c | — |
| 2 | `/products/image_00118.jpg` | yes | jpeg | 1181×1200 | 0.09 MiB | 17f46ad7315b | — |

### 67 — Taxtalı sürət boks kisəsi

- Category: `doyus`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00119.jpg` | yes | jpeg | 1200×1200 | 0.10 MiB | a308a72cde0d | — |

### 68 — Adam boks kisəsi G081

- Category: `doyus`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00120.jpg` | yes | jpeg | 1269×1200 | 0.09 MiB | c19693a84953 | — |

### 69 — Boks kisəsi G075

- Category: `doyus`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00121.jpg` | yes | jpeg | 1261×1200 | 0.08 MiB | 632386665f37 | — |

### 70 — Tenis topu TOUR

- Category: `tenis`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00122.jpg` | yes | jpeg | 1140×1200 | 0.07 MiB | ac72ebfe8f63 | — |
| 2 | `/products/image_00123.jpg` | yes | jpeg | 1261×1200 | 0.15 MiB | d82735907f62 | — |

### 71 — Tenis topu

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00124.jpg` | yes | jpeg | 1175×1200 | 0.07 MiB | a976f54bb3d2 | — |

### 72 — Tenis toru

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00125.jpg` | yes | jpeg | 1600×1144 | 0.15 MiB | a640d6e375e8 | — |

### 73 — Tenis raketkası ODEA Pro

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00126.jpg` | yes | jpeg | 967×1200 | 0.11 MiB | a4b6ab8c5196 | — |

### 74 — Tenis raketkası WİLSON

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00127.jpg` | yes | jpeg | 1160×1200 | 0.12 MiB | b03e5af3146b | — |

### 75 — Tenis raketkasi ODEA

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00128.jpg` | yes | jpeg | 1200×1200 | 0.12 MiB | dc8d85d13e3f | — |

### 76 — Badminton FOX Cüt

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00129.jpg` | yes | jpeg | 1422×1200 | 0.13 MiB | d35bcee08de5 | — |

### 77 — Badminton FOX

- Category: `tenis`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00130.jpg` | yes | jpeg | 1010×1200 | 0.08 MiB | 927e09316be9 | — |

### 78 — Tatami

- Category: `doyus`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00131.jpg` | yes | jpeg | 1185×1200 | 0.20 MiB | 8e33aa3b3265 | — |
| 2 | `/products/image_00132.jpg` | yes | jpeg | 1468×1200 | 0.10 MiB | 54b87164c343 | — |

### 79 — Qrif F30 1.20m

- Category: `agirliq`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00133.jpg` | yes | jpeg | 1198×1200 | 0.05 MiB | d2447dbc9be0 | — |
| 2 | `/products/image_00134.jpg` | yes | jpeg | 1176×1200 | 0.04 MiB | fc8c77869019 | — |
| 3 | `/products/image_00135.jpg` | yes | jpeg | 1294×1200 | 0.03 MiB | e79ce9419570 | — |

### 80 — Qantel altıkünc

- Category: `agirliq`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00136.jpg` | yes | jpeg | 1180×1200 | 0.10 MiB | 61fd1047e95c | — |

### 81 — Qantel xrom

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00137.jpg` | yes | jpeg | 1218×1200 | 0.07 MiB | ba7ecbdcdff7 | — |
| 2 | `/products/image_00138.jpg` | yes | jpeg | 1225×1200 | 0.18 MiB | c2d045e510f0 | — |

### 82 — Masaj Rolikli İkitərəfli Velotrenajor

- Category: `trenajor`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00139.jpg` | yes | jpeg | 1184×1200 | 0.06 MiB | 497f857c9e48 | — |

### 83 — İkitərəfli Qol və Ayaq Velotrenajoru

- Category: `trenajor`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00140.jpg` | yes | jpeg | 944×1200 | 0.07 MiB | 9c59dcb6e0d5 | — |
| 2 | `/products/image_00141.jpg` | yes | jpeg | 986×1200 | 0.08 MiB | 8ee0e605e4d5 | — |

### 84 — Mini velotrenajor

- Category: `trenajor`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00142.jpg` | yes | jpeg | 1364×1200 | 0.09 MiB | 77008c620157 | — |

### 85 — Qantel dəsti 55kq

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00143.jpg` | yes | jpeg | 1331×1200 | 0.11 MiB | a5dcf104c904 | — |
| 2 | `/products/image_00144.jpg` | yes | jpeg | 1404×1200 | 0.13 MiB | dcc05ad34af6 | — |

### 86 — Qantel dəsti 50kq

- Category: `agirliq`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00145.jpg` | yes | jpeg | 1200×1200 | 0.13 MiB | 3f0ef66d4abd | — |
| 2 | `/products/image_00146.jpg` | yes | jpeg | 1200×1200 | 0.09 MiB | a254e3b7dff6 | — |

### 87 — Rolik

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00147.jpg` | yes | jpeg | 1415×1200 | 0.13 MiB | f515e987d1dc | — |
| 2 | `/products/image_00148.jpg` | yes | jpeg | 1431×1200 | 0.14 MiB | f63683aab932 | — |

### 88 — Buz konkisi

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00149.jpg` | yes | jpeg | 1320×1200 | 0.10 MiB | d50f3aaee754 | — |
| 2 | `/products/image_00150.jpg` | yes | jpeg | 1504×1200 | 0.08 MiB | 9486aa699827 | — |

### 89 — Rolik SUXFLY

- Category: `rolik`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00151.jpg` | yes | jpeg | 1406×1200 | 0.21 MiB | 70cb04757199 | — |
| 2 | `/products/image_00152.jpg` | yes | jpeg | 1433×1200 | 0.21 MiB | 6b319977b77e | — |
| 3 | `/products/image_00153.jpg` | yes | jpeg | 1348×1200 | 0.16 MiB | e6e7377e76c2 | — |

### 90 — Elektrik skuter HX-X8

- Category: `skuter`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00154.jpg` | yes | jpeg | 1196×1200 | 0.09 MiB | e3864f3bf46b | — |
| 2 | `/products/image_00155.jpg` | yes | jpeg | 1188×1200 | 0.04 MiB | 472b5321b055 | — |

### 91 — Furbol qapısı (200×300)

- Category: `futbol`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00156.jpg` | yes | jpeg | 1200×1200 | 0.24 MiB | 95b61cbcbd0c | — |
| 2 | `/products/image_00157.jpg` | yes | jpeg | 1200×1200 | 0.13 MiB | ad6f906bd563 | — |

### 92 — Futbol qapısı (210×150)

- Category: `futbol`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00158.jpg` | yes | jpeg | 1184×1200 | 0.10 MiB | 32aa93b76dde | — |
| 2 | `/products/image_00159.jpg` | yes | jpeg | 1282×1200 | 0.14 MiB | 2157854809de | — |

### 93 — Futbol qapısı (120×80)

- Category: `futbol`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00160.jpg` | yes | jpeg | 1202×1200 | 0.09 MiB | 3287901a0aab | — |
| 2 | `/products/image_00161.jpg` | yes | jpeg | 1200×1200 | 0.06 MiB | eb9310130527 | — |

### 94 — Futbol Topu Orijinal Molten Vantaggio 5000

- Category: `futbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00162.jpg` | yes | jpeg | 1230×1200 | 0.15 MiB | e22ccb8ecd68 | — |

### 95 — Futbol topu Orijinal Molten Vantaggio 2810

- Category: `futbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00163.jpg` | yes | jpeg | 1205×1200 | 0.12 MiB | 0180a69b9c41 | — |

### 96 — Futbol topu Molten 3200

- Category: `futbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00164.jpg` | yes | jpeg | 1200×1200 | 0.23 MiB | 5b0e0ed2fc2a | — |

### 97 — Basketbol topu

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00165.jpg` | yes | jpeg | 1188×1200 | 0.18 MiB | ace1a9bfd4c4 | — |

### 98 — Basketbol topu Molten GQ7X

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00166.jpg` | yes | jpeg | 1202×1200 | 0.17 MiB | 0e430473d60d | — |

### 99 — Basketbol tapu Molten GG6X

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00167.jpg` | yes | jpeg | 1200×1200 | 0.30 MiB | 90e36fbd7a5d | — |

### 100 — Basketbol səbəti

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00168.jpg` | yes | jpeg | 1188×1200 | 0.07 MiB | da2c27642dd4 | — |

### 101 — Okey VİP

- Category: `oyun`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00169.jpg` | yes | jpeg | 1181×1200 | 0.11 MiB | ac1deb9bd4b4 | — |
| 2 | `/products/image_00170.jpg` | yes | jpeg | 1514×1200 | 0.19 MiB | 50f5487be279 | — |
| 3 | `/products/image_00171.jpg` | yes | jpeg | 1548×1200 | 0.07 MiB | 1268a20f8ec3 | — |

### 102 — Mikasa voleybol topu Hiloqramlı

- Category: `basketbol`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00172.jpg` | yes | jpeg | 1407×1200 | 0.11 MiB | 537813c6a443 | — |

### 103 — Star Okey dəsti - 101 Plus Rummy Set

- Category: `oyun`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00173.jpg` | yes | jpeg | 1205×1200 | 0.17 MiB | 84b1ca1d6fe9 | — |

### 104 — Tərəzi EurOlux

- Category: `masaj`; images: **1**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00174.jpg` | yes | jpeg | 1224×1200 | 0.13 MiB | 66e9f4229605 | — |

### 105 — Rolik dəsti

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00175.jpg` | yes | jpeg | 1237×1200 | 0.14 MiB | 9901e8f15abf | — |
| 2 | `/products/image_00176.jpg` | yes | jpeg | 1165×1200 | 0.20 MiB | ac20d7aa3d2e | — |

### 106 — Rolik TİAN-E

- Category: `rolik`; images: **2**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00177.jpg` | yes | jpeg | 1208×1200 | 0.10 MiB | 3746833102b9 | — |
| 2 | `/products/image_00178.jpg` | yes | jpeg | 1202×1200 | 0.13 MiB | 6fa3a66f7c86 | — |

### 107 — İdman ayaqqabısı

- Category: `geyim`; images: **9**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00179.jpg` | yes | jpeg | 1200×1200 | 0.13 MiB | acea996a62a5 | — |
| 2 | `/products/image_00180.jpg` | yes | jpeg | 1200×1200 | 0.18 MiB | 0c5c79db15b5 | — |
| 3 | `/products/image_00181.jpg` | yes | jpeg | 1200×1200 | 0.15 MiB | ceecbb3e7554 | — |
| 4 | `/products/image_00182.jpg` | yes | jpeg | 1599×1200 | 0.21 MiB | cce6620a5bf1 | — |
| 5 | `/products/image_00183.jpg` | yes | jpeg | 1599×1200 | 0.16 MiB | bf2c7b0f6fdb | — |
| 6 | `/products/image_00184.jpg` | yes | jpeg | 1599×1200 | 0.26 MiB | 21f523ae0c07 | — |
| 7 | `/products/image_00185.jpg` | yes | jpeg | 1599×1200 | 0.21 MiB | 16b88d624bfe | — |
| 8 | `/products/image_00186.jpg` | yes | jpeg | 1599×1200 | 0.17 MiB | ae49c53ace62 | — |
| 9 | `/products/image_00187.jpg` | yes | jpeg | 1599×1200 | 0.19 MiB | 2f2712fba861 | — |

### 108 — Barsovka

- Category: `geyim`; images: **3**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00188.jpg` | yes | jpeg | 1200×1200 | 0.09 MiB | 4d8529e7704d | — |
| 2 | `/products/image_00189.jpg` | yes | jpeg | 1200×1200 | 0.08 MiB | 33b50a77b14e | — |
| 3 | `/products/image_00190.jpg` | yes | jpeg | 1200×1200 | 0.11 MiB | 4918f8af8d92 | — |

### 109 — İdman çantaları

- Category: `diger`; images: **4**; status: **OK**

| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |
|---:|---|:---:|---|---:|---:|---|---|
| 1 | `/products/image_00191.jpg` | yes | jpeg | 1200×1200 | 0.08 MiB | 1131339ccedc | — |
| 2 | `/products/image_00192.jpg` | yes | jpeg | 1200×1200 | 0.06 MiB | dfdb9415247c | — |
| 3 | `/products/image_00193.jpg` | yes | jpeg | 1200×1200 | 0.12 MiB | 65f079f9ebf5 | — |
| 4 | `/products/image_00194.jpg` | yes | jpeg | 1200×1200 | 0.12 MiB | 84a583e723f9 | — |

## Method and thresholds

- Existence/readability: full file reads and Sharp decode/metadata parsing.
- Exact duplicates: SHA-256 of original bytes. Potential near duplicates: 64-bit difference hash after auto-orientation and 9×8 grayscale resize; distance <= 4 is only a review candidate, not proof.
- Warnings: extension/decoded-format mismatch, shortest side < 500 px, aspect ratio > 3:1, file > 10 MiB. Dimensions are decoded pixel dimensions.
- No deletion, replacement, recompression, or watermark modification was performed.