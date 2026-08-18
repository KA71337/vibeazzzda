import {randomUUID} from 'node:crypto';
import type {Product} from '../data/products';
import type {Sale,SalesStore,StockChangeReason,StockHistoryEntry} from '../lib/sales';
function getStock(product:{stock?:number}){const value=product.stock;return typeof value==='number'&&Number.isSafeInteger(value)&&value>=0?value:undefined}

export type SaleRequestItem={productId:number;quantity:number};
const TIMEZONE='Asia/Baku' as const;

export class PosError extends Error{
 status:number;
 constructor(message:string,status=400){super(message);this.name='PosError';this.status=status}
}

const money=(value:number)=>Math.round(value*100)/100;
const history=(product:Product,from:number|null,to:number,reason:StockChangeReason,createdAt:string,saleId?:number):StockHistoryEntry=>({
 id:randomUUID(),createdAt,timezone:TIMEZONE,productId:product.id,productName:product.name,from,to,reason,...(saleId===undefined?{}:{saleId}),
});

function validRequestItems(items:SaleRequestItem[]){
 if(!Array.isArray(items)||items.length<1||items.length>100)throw new PosError('Satış üçün məhsul seçin');
 const seen=new Set<number>();
 for(const item of items){
  if(!item||!Number.isSafeInteger(item.productId)||item.productId<=0||!Number.isSafeInteger(item.quantity)||item.quantity<=0||item.quantity>1e6)throw new PosError('Məhsul miqdarını yoxlayın');
  if(seen.has(item.productId))throw new PosError('Eyni məhsul təkrar göndərilib');
  seen.add(item.productId);
 }
}

export function completeSale(products:Product[],store:SalesStore,items:SaleRequestItem[],createdAt=new Date().toISOString()){
 validRequestItems(items);
 const byId=new Map(products.map(product=>[product.id,product])),updates=new Map<number,Product>(),saleItems:Sale['items']=[],changes:StockHistoryEntry[]=[];
 let totalCents=0,totalQuantity=0;
 let saleId=Math.max(1001,store.nextSaleId);
 const usedIds=new Set(store.sales.map(sale=>sale.id));while(usedIds.has(saleId))saleId++;
 for(const item of items){
  const product=byId.get(item.productId);if(!product)throw new PosError('Məhsul tapılmadı',404);
  const stock=getStock(product);if(stock===undefined)throw new PosError('Məhsul üçün stok sayını əvvəlcə təyin edin',409);
  if(stock<item.quantity)throw new PosError('Kifayət qədər stok yoxdur.',409);
  const price=money(product.newPrice??product.price),unitCents=Math.round(price*100),lineCents=unitCents*item.quantity,nextStock=stock-item.quantity;
  if(!Number.isSafeInteger(lineCents)||lineCents<0)throw new PosError('Məhsul qiyməti yanlışdır',409);
  totalCents+=lineCents;totalQuantity+=item.quantity;
  saleItems.push({productId:product.id,name:product.name,...(product.category?{category:product.category}:{}),unitPrice:price,quantity:item.quantity,lineTotal:money(lineCents/100)});
  updates.set(product.id,{...product,stock:nextStock,inStock:nextStock>0});
  changes.push(history(product,stock,nextStock,'sale',createdAt,saleId));
 }
 if(!Number.isSafeInteger(totalCents)||totalCents<0)throw new PosError('Satış məbləği yanlışdır',409);
 const sale:Sale={id:saleId,createdAt,timezone:TIMEZONE,status:'completed',items:saleItems,totalQuantity,total:money(totalCents/100)};
 return {
  sale,
  products:products.map(product=>updates.get(product.id)||product),
  store:{nextSaleId:saleId+1,sales:[...store.sales,sale],stockHistory:[...store.stockHistory,...changes]} satisfies SalesStore,
 };
}

export function cancelSale(products:Product[],store:SalesStore,saleId:number,cancelledAt=new Date().toISOString()){
 if(!Number.isSafeInteger(saleId)||saleId<=0)throw new PosError('Satış ID-si yanlışdır');
 const sale=store.sales.find(item=>item.id===saleId);if(!sale)throw new PosError('Satış tapılmadı',404);
 if(sale.status==='cancelled')throw new PosError('Satış artıq ləğv edilib',409);
 const byId=new Map(products.map(product=>[product.id,product])),updates=new Map<number,Product>(),changes:StockHistoryEntry[]=[];
 for(const item of sale.items){
  const product=byId.get(item.productId);if(!product)throw new PosError('Satışdakı məhsul kataloqda tapılmadı',409);
  const stock=getStock(product);if(stock===undefined)throw new PosError('Məhsulun stok sayı dəyişdirilib. Əvvəlcə stoku təyin edin.',409);
  const nextStock=stock+item.quantity;if(!Number.isSafeInteger(nextStock)||nextStock>1e9)throw new PosError('Stok sayı həddi aşır',409);
  updates.set(product.id,{...product,stock:nextStock,inStock:true});
  changes.push(history(product,stock,nextStock,'sale_cancel',cancelledAt,sale.id));
 }
 const cancelled:Sale={...sale,status:'cancelled',cancelledAt};
 return {
  sale:cancelled,
  products:products.map(product=>updates.get(product.id)||product),
  store:{...store,sales:store.sales.map(item=>item.id===sale.id?cancelled:item),stockHistory:[...store.stockHistory,...changes]} satisfies SalesStore,
 };
}

export function appendManualStockChange(store:SalesStore,product:Product,from:number|null,to:number,createdAt=new Date().toISOString()):SalesStore{
 if(!Number.isSafeInteger(to)||to<0||to>1e9)throw new PosError('Stok sayını yoxlayın');
 if(from===to)return store;
 return {...store,stockHistory:[...store.stockHistory,history(product,from,to,'manual',createdAt)]};
}
