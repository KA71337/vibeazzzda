export type OrderItem = {id: number; qty: number};

export const MAX_ORDER_HASH_LENGTH = 16_384;
export const MAX_ORDER_ITEMS = 200;
export const MAX_ORDER_QUANTITY = 999;
const MAX_DECODED_BYTES = 12_288;

export function validateOrderItems(value: unknown): OrderItem[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > MAX_ORDER_ITEMS) throw new Error('invalid order');
  const seen = new Set<number>();
  return value.map(entry => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('invalid item');
    const item = entry as Record<string, unknown>;
    const keys = Object.keys(item);
    if (keys.length !== 2 || !keys.includes('id') || !keys.includes('qty')) throw new Error('unexpected fields');
    if (!Number.isSafeInteger(item.id) || !Number.isSafeInteger(item.qty)) throw new Error('invalid number');
    const id = item.id as number, qty = item.qty as number;
    if (id <= 0 || qty <= 0 || qty > MAX_ORDER_QUANTITY || seen.has(id)) throw new Error('invalid item');
    seen.add(id);
    return {id, qty};
  });
}

export function decodeOrderHash(hash: string): OrderItem[] {
  if (!hash || hash.length > MAX_ORDER_HASH_LENGTH || !/^[A-Za-z0-9_-]+$/.test(hash)) throw new Error('invalid payload');
  let encoded = hash.replace(/-/g, '+').replace(/_/g, '/');
  if (encoded.length % 4 === 1) throw new Error('invalid base64');
  while (encoded.length % 4) encoded += '=';
  const binary = atob(encoded);
  if (binary.length > MAX_DECODED_BYTES) throw new Error('payload too large');
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  const value: unknown = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
  return validateOrderItems(value);
}

export function encodeOrderItems(value: unknown): string {
  const items = validateOrderItems(value);
  const bytes = new TextEncoder().encode(JSON.stringify(items));
  if (bytes.length > MAX_DECODED_BYTES) throw new Error('payload too large');
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 4096) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 4096));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
