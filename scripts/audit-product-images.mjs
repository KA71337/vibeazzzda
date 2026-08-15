import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const catalogPath = path.join(root, 'data', 'products.json');
const publicDir = path.join(root, 'public');
const productImageDir = path.join(publicDir, 'products');
const reportPath = path.join(root, 'reports', 'product-image-audit.md');
const products = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
const refs = products.flatMap((p) => (p.images || []).map((ref, index) => ({ p, ref, index })));
const uniqueRefs = [...new Set(refs.map((x) => x.ref))];
const records = new Map();

const sha = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
const hamming = (a, b) => {
  let n = 0;
  for (let i = 0; i < a.length; i++) {
    let x = a[i] ^ b[i];
    while (x) { n += x & 1; x >>>= 1; }
  }
  return n;
};

for (const ref of uniqueRefs) {
  const rel = ref.replace(/^\/+/, '');
  const file = path.join(publicDir, rel);
  const rec = { ref, file, exists: false, issues: [] };
  try {
    const buffer = await fs.readFile(file);
    rec.exists = true;
    rec.bytes = buffer.length;
    rec.sha256 = sha(buffer);
    rec.asciiTapAz = /tap\s*\.\s*az/i.test(buffer.toString('latin1'));
    const image = sharp(buffer, { failOn: 'warning' });
    const meta = await image.metadata();
    Object.assign(rec, {
      format: meta.format || 'unknown', width: meta.width || 0, height: meta.height || 0,
      space: meta.space || '', channels: meta.channels || 0, density: meta.density || null,
      hasAlpha: Boolean(meta.hasAlpha), orientation: meta.orientation || null
    });
    const dh = await sharp(buffer).rotate().resize(9, 8, { fit: 'fill' }).greyscale().raw().toBuffer();
    const bits = Buffer.alloc(8);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      if (dh[y * 9 + x] > dh[y * 9 + x + 1]) bits[y] |= (1 << (7 - x));
    }
    rec.dhash = bits;
    const ext = path.extname(file).slice(1).toLowerCase().replace('jpg', 'jpeg');
    if (ext !== rec.format) rec.issues.push(`extension .${ext} does not match decoded ${rec.format}`);
    if (Math.min(rec.width, rec.height) < 500) rec.issues.push('low resolution: shortest side < 500 px');
    if (Math.max(rec.width / rec.height, rec.height / rec.width) > 3) rec.issues.push('extreme aspect ratio > 3:1');
    if (rec.bytes > 10 * 1024 * 1024) rec.issues.push('large file > 10 MiB');
  } catch (error) {
    rec.error = String(error?.message || error);
    rec.issues.push(rec.exists ? 'unreadable/corrupt image' : 'missing file');
  }
  records.set(ref, rec);
}

const hashGroups = new Map();
for (const rec of records.values()) if (rec.sha256) {
  const arr = hashGroups.get(rec.sha256) || [];
  arr.push(rec.ref); hashGroups.set(rec.sha256, arr);
}
const exactGroups = [...hashGroups.values()].filter((x) => x.length > 1);
const valid = [...records.values()].filter((x) => x.dhash);
const nearPairs = [];
for (let i = 0; i < valid.length; i++) for (let j = i + 1; j < valid.length; j++) {
  if (valid[i].sha256 === valid[j].sha256) continue;
  const distance = hamming(valid[i].dhash, valid[j].dhash);
  if (distance <= 4) nearPairs.push([valid[i].ref, valid[j].ref, distance]);
}
const allDiskNames = await fs.readdir(productImageDir);
const diskRefs = allDiskNames.filter((n) => /\.(jpe?g|png|webp|gif|avif)$/i.test(n)).map((n) => `/products/${n}`);
const orphan = diskRefs.filter((x) => !records.has(x));
const missing = [...records.values()].filter((x) => !x.exists);
const corrupt = [...records.values()].filter((x) => x.exists && x.error);
const issueFiles = [...records.values()].filter((x) => x.issues.length);
const watermarkMetadataHits = [...records.values()].filter((x) => x.asciiTapAz);
const productsNoImages = products.filter((p) => !Array.isArray(p.images) || p.images.length === 0);
const duplicateIds = products.map((p) => p.id).filter((id, i, a) => a.indexOf(id) !== i);
const fmt = (n) => n == null ? '—' : new Intl.NumberFormat('en-US').format(n);
const mib = (n) => `${(n / 1048576).toFixed(2)} MiB`;
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

const lines = [];
lines.push('# VIBE AZ — product image audit', '', `Generated: ${new Date().toISOString()}`, '');
lines.push('## Scope and summary', '');
lines.push(`- Catalog: \`data/products.json\` (parsed in full)`);
lines.push(`- Products: **${products.length}**; duplicate product IDs: **${duplicateIds.length}**; products without images: **${productsNoImages.length}**`);
lines.push(`- Image references: **${refs.length}**; unique references: **${uniqueRefs.length}**`);
lines.push(`- Image files in \`public/products\`: **${diskRefs.length}**; unreferenced/orphan files: **${orphan.length}**`);
lines.push(`- Missing: **${missing.length}**; unreadable/corrupt: **${corrupt.length}**; files with technical warnings: **${issueFiles.length}**`);
lines.push(`- Exact duplicate groups (SHA-256): **${exactGroups.length}**; potential visual near-duplicate pairs (64-bit dHash distance <= 4): **${nearPairs.length}**`);
lines.push(`- Tap.az text found in embedded binary/metadata: **${watermarkMetadataHits.length}**. This is not OCR and does not rule out visible watermarks.`);
lines.push('');
lines.push('## UI image usage', '');
lines.push('- `src/data/products.ts` imports this catalog directly and defines `images: string[]`.');
lines.push('- `src/components/product-card.tsx`: cards render only `p.images[0]` in a square `next/image` container with `object-cover`; non-square images can be cropped. There is no fallback for an empty/missing image array.');
lines.push('- `src/components/product-detail.tsx`: the selected image is rendered in a square `object-cover` main viewer; all images become 80×80 `object-cover` thumbnails when more than one exists. The first image is initially selected. Duplicate image paths would also create duplicate React keys.');
lines.push('- `src/components/catalog.tsx`: every catalog result is passed to the card component; therefore every product depends on a valid first image.');
lines.push('');
lines.push('## Watermark / Tap.az assessment', '');
lines.push('- Local automated checks searched JPEG binary/metadata for `tap.az`. No OCR engine or trusted Tap.az logo template was available, so visible watermark/logo detection is **not conclusively automated**.');
lines.push('- Catalog source links and many descriptions point to Tap.az; ownership/licensing and visible watermark review should be confirmed manually before any removal or replacement. No images were changed by this audit.');
lines.push('');
lines.push('## Explicit global issues', '');
if (!missing.length && !corrupt.length && !issueFiles.length && !orphan.length && !exactGroups.length && !nearPairs.length) lines.push('- No filesystem, decode, format, size-threshold, orphan, or duplicate problems detected.');
for (const r of missing) lines.push(`- Missing: \`${r.ref}\``);
for (const r of corrupt) lines.push(`- Corrupt/unreadable: \`${r.ref}\` — ${esc(r.error)}`);
for (const r of issueFiles.filter((x) => x.exists && !x.error)) lines.push(`- \`${r.ref}\`: ${r.issues.join('; ')}`);
for (const x of orphan) lines.push(`- Orphan/unreferenced: \`${x}\``);
for (const g of exactGroups) lines.push(`- Exact duplicates: ${g.map((x) => `\`${x}\``).join(', ')}`);
for (const [a,b,d] of nearPairs) lines.push(`- Potential visual near-duplicate (dHash ${d}): \`${a}\` ↔ \`${b}\``);
lines.push('');
lines.push('## Per-product inventory', '');
for (const p of products) {
  const productIssues = [];
  if (!Array.isArray(p.images) || !p.images.length) productIssues.push('NO IMAGES');
  for (const ref of p.images || []) for (const issue of records.get(ref)?.issues || []) productIssues.push(`${ref}: ${issue}`);
  lines.push(`### ${p.id} — ${esc(p.name)}`, '');
  lines.push(`- Category: \`${p.category ?? 'unset'}\`; images: **${p.images?.length || 0}**; status: **${productIssues.length ? 'ISSUES' : 'OK'}**`);
  if (productIssues.length) for (const issue of productIssues) lines.push(`- Issue: ${esc(issue)}`);
  lines.push('', '| # | Reference | Exists | Decoded format | Dimensions | Size | SHA-256 (first 12) | Warnings |', '|---:|---|:---:|---|---:|---:|---|---|');
  for (const [i, ref] of (p.images || []).entries()) {
    const r = records.get(ref);
    lines.push(`| ${i + 1} | \`${ref}\` | ${r?.exists ? 'yes' : 'NO'} | ${r?.format || '—'} | ${r?.width ? `${r.width}×${r.height}` : '—'} | ${r?.bytes != null ? mib(r.bytes) : '—'} | ${r?.sha256?.slice(0, 12) || '—'} | ${r?.issues?.length ? esc(r.issues.join('; ')) : '—'} |`);
  }
  lines.push('');
}
lines.push('## Method and thresholds', '');
lines.push('- Existence/readability: full file reads and Sharp decode/metadata parsing.');
lines.push('- Exact duplicates: SHA-256 of original bytes. Potential near duplicates: 64-bit difference hash after auto-orientation and 9×8 grayscale resize; distance <= 4 is only a review candidate, not proof.');
lines.push('- Warnings: extension/decoded-format mismatch, shortest side < 500 px, aspect ratio > 3:1, file > 10 MiB. Dimensions are decoded pixel dimensions.');
lines.push('- No deletion, replacement, recompression, or watermark modification was performed.');

await fs.mkdir(path.dirname(reportPath), { recursive: true });
await fs.writeFile(reportPath, lines.join('\n'), 'utf8');
console.log(JSON.stringify({ reportPath, products: products.length, imageRefs: refs.length, uniqueRefs: uniqueRefs.length, diskImages: diskRefs.length, missing: missing.length, corrupt: corrupt.length, issueFiles: issueFiles.length, orphan: orphan.length, exactDuplicateGroups: exactGroups.length, nearDuplicatePairs: nearPairs.length, watermarkMetadataHits: watermarkMetadataHits.length }));
