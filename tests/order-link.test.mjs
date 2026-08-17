import test from 'node:test';
import assert from 'node:assert/strict';
import {decodeOrderHash,encodeOrderItems,MAX_ORDER_HASH_LENGTH,MAX_ORDER_QUANTITY} from '../src/lib/order-link.ts';

test('order links round-trip only id and quantity',()=>{
 const items=[{id:2,qty:1},{id:9,qty:4}];
 assert.deepEqual(decodeOrderHash(encodeOrderItems(items)),items);
});

test('malformed and oversized order links are rejected',()=>{
 assert.throws(()=>decodeOrderHash('not+url-safe'));
 assert.throws(()=>decodeOrderHash('a'.repeat(MAX_ORDER_HASH_LENGTH+1)));
 assert.throws(()=>decodeOrderHash('a'));
});

test('unexpected fields, prototype payloads, duplicates and huge quantities are rejected',()=>{
 const encodeRaw=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
 assert.throws(()=>decodeOrderHash(encodeRaw([{id:2,qty:1,note:'<img src=x onerror=alert(1)>'}])));
 assert.throws(()=>decodeOrderHash(encodeRaw([JSON.parse('{"id":2,"qty":1,"__proto__":{"polluted":true}}')])));
 assert.throws(()=>decodeOrderHash(encodeRaw([{id:2,qty:1},{id:2,qty:2}])));
 assert.throws(()=>decodeOrderHash(encodeRaw([{id:2,qty:MAX_ORDER_QUANTITY+1}])));
 assert.equal({}.polluted,undefined);
});
