import test from 'node:test';
import assert from 'node:assert/strict';
import {canIncreaseQuantity,isInStock} from '../src/lib/stock.ts';

test('legacy and available products remain in stock',()=>{
 assert.equal(isInStock({}),true);
 assert.equal(isInStock({inStock:true}),true);
});

test('out-of-stock quantities can decrease but cannot increase',()=>{
 const product={inStock:false};
 assert.equal(isInStock(product),false);
 assert.equal(canIncreaseQuantity(product,3,2),true);
 assert.equal(canIncreaseQuantity(product,3,3),true);
 assert.equal(canIncreaseQuantity(product,3,4),false);
});
