import test from 'node:test';
import assert from 'node:assert/strict';
import {appendManualStockChange,cancelSale,completeSale,PosError} from '../src/server/pos-core.ts';

const product=(overrides={})=>({id:1,name:'Rolik',price:120,newPrice:null,description:'',link:'',images:[],category:'rolik',inStock:true,stock:35,...overrides});
const empty=()=>({nextSaleId:1001,sales:[],stockHistory:[]});

test('POS stores snapshot prices and decreases stock',()=>{
 const result=completeSale([product()],empty(),[{productId:1,quantity:7}],'2026-08-18T14:42:00.000Z');
 assert.equal(result.sale.id,1001);
 assert.equal(result.sale.items[0].unitPrice,120);
 assert.equal(result.sale.total,840);
 assert.equal(result.products[0].stock,28);
 assert.equal(result.products[0].inStock,true);
 assert.equal(result.store.stockHistory[0].reason,'sale');
});

test('POS uses sale price and sets zero stock unavailable',()=>{
 const result=completeSale([product({stock:2,newPrice:99})],empty(),[{productId:1,quantity:2}]);
 assert.equal(result.sale.total,198);
 assert.equal(result.products[0].stock,0);
 assert.equal(result.products[0].inStock,false);
});

test('POS rejects missing or insufficient tracked stock',()=>{
 assert.throws(()=>completeSale([product({stock:undefined})],empty(),[{productId:1,quantity:1}]),PosError);
 assert.throws(()=>completeSale([product({stock:3})],empty(),[{productId:1,quantity:5}]),/Kifayət qədər stok yoxdur/);
 assert.throws(()=>completeSale([product()],empty(),[{productId:1,quantity:-2}]),PosError);
});

test('cancelling a sale restores stock without deleting history',()=>{
 const created=completeSale([product()],empty(),[{productId:1,quantity:7}]);
 const cancelled=cancelSale(created.products,created.store,created.sale.id);
 assert.equal(cancelled.products[0].stock,35);
 assert.equal(cancelled.sale.status,'cancelled');
 assert.equal(cancelled.store.sales.length,1);
 assert.equal(cancelled.store.stockHistory.at(-1).reason,'sale_cancel');
});

test('manual stock changes are recorded',()=>{
 const store=appendManualStockChange(empty(),product(),null,50,'2026-08-18T14:42:00.000Z');
 assert.equal(store.stockHistory[0].from,null);
 assert.equal(store.stockHistory[0].to,50);
 assert.equal(store.stockHistory[0].reason,'manual');
});
