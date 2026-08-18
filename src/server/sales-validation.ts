import 'server-only';
import type {Sale,SaleItem,SalesStore,StockHistoryEntry} from '@/lib/sales';
import {EMPTY_SALES_STORE} from '@/lib/sales';

const MAX_SALES=10_000,MAX_HISTORY=20_000,MAX_ITEMS=100;
const UNSAFE_CONTROL=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export class SalesValidationError extends Error{name='SalesValidationError'}

const isRecord=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value)&&Object.getPrototypeOf(value)===Object.prototype;
const keysAre=(value:Record<string,unknown>,allowed:readonly string[])=>Object.keys(value).every(key=>allowed.includes(key));
const isInteger=(value:unknown,min=0,max=1e9):value is number=>typeof value==='number'&&Number.isSafeInteger(value)&&value>=min&&value<=max;
const isMoney=(value:unknown):value is number=>typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=1e9&&Math.abs(value*100-Math.round(value*100))<1e-8;
const isDate=(value:unknown):value is string=>typeof value==='string'&&value.length<=64&&!Number.isNaN(Date.parse(value));

function fail(message:string):never{throw new SalesValidationError(message)}

function validateItem(value:unknown):SaleItem{
 if(!isRecord(value)||!keysAre(value,['productId','name','category','unitPrice','quantity','lineTotal']))fail('Satış məhsulu yanlışdır');
 if(!isInteger(value.productId,1)||typeof value.name!=='string'||!value.name.trim()||value.name.length>160||UNSAFE_CONTROL.test(value.name))fail('Satış məhsulu yanlışdır');
 if(value.category!==undefined&&(typeof value.category!=='string'||value.category.length>100))fail('Satış kateqoriyası yanlışdır');
 if(!isMoney(value.unitPrice)||!isInteger(value.quantity,1,1e6)||!isMoney(value.lineTotal))fail('Satış miqdarı və qiyməti yanlışdır');
 if(Math.round((value.unitPrice as number)*100)*(value.quantity as number)!==Math.round((value.lineTotal as number)*100))fail('Satış məbləği yanlışdır');
 return {productId:value.productId as number,name:value.name.trim(),...(value.category===undefined?{}:{category:value.category as string}),unitPrice:value.unitPrice as number,quantity:value.quantity as number,lineTotal:value.lineTotal as number};
}

function validateSale(value:unknown):Sale{
 if(!isRecord(value)||!keysAre(value,['id','createdAt','timezone','status','items','totalQuantity','total','cancelledAt']))fail('Satış tarixçəsi yanlışdır');
 if(!isInteger(value.id,1)||!isDate(value.createdAt)||value.timezone!=='Asia/Baku'||!['completed','cancelled'].includes(String(value.status)))fail('Satış məlumatı yanlışdır');
 if(!Array.isArray(value.items)||value.items.length<1||value.items.length>MAX_ITEMS)fail('Satış məhsulları yanlışdır');
 const items=value.items.map(validateItem),totalQuantity=items.reduce((sum,item)=>sum+item.quantity,0),totalCents=items.reduce((sum,item)=>sum+Math.round(item.lineTotal*100),0);
 if(!isInteger(value.totalQuantity,1,1e8)||value.totalQuantity!==totalQuantity||!isMoney(value.total)||Math.round((value.total as number)*100)!==totalCents)fail('Satış yekunu yanlışdır');
 if(value.cancelledAt!==undefined&&!isDate(value.cancelledAt))fail('Ləğv tarixi yanlışdır');
 if(value.status==='cancelled'&&value.cancelledAt===undefined)fail('Ləğv edilmiş satış tarixi yanlışdır');
 return {id:value.id as number,createdAt:value.createdAt as string,timezone:'Asia/Baku',status:value.status as Sale['status'],items,totalQuantity,total:value.total as number,...(value.cancelledAt===undefined?{}:{cancelledAt:value.cancelledAt as string})};
}

function validateHistory(value:unknown):StockHistoryEntry{
 if(!isRecord(value)||!keysAre(value,['id','createdAt','timezone','productId','productName','from','to','reason','saleId']))fail('Stok tarixçəsi yanlışdır');
 if(typeof value.id!=='string'||!value.id||value.id.length>120||!isDate(value.createdAt)||value.timezone!=='Asia/Baku'||!isInteger(value.productId,1)||typeof value.productName!=='string'||!value.productName.trim()||value.productName.length>160||!['sale','sale_cancel','manual'].includes(String(value.reason)))fail('Stok tarixçəsi yanlışdır');
 if(value.from!==null&&!isInteger(value.from))fail('Əvvəlki stok yanlışdır');
 if(!isInteger(value.to))fail('Yeni stok yanlışdır');
 if(value.saleId!==undefined&&!isInteger(value.saleId,1))fail('Satış ID-si yanlışdır');
 return {id:value.id as string,createdAt:value.createdAt as string,timezone:'Asia/Baku',productId:value.productId as number,productName:value.productName.trim(),from:value.from===null?null:value.from as number,to:value.to as number,reason:value.reason as StockHistoryEntry['reason'],...(value.saleId===undefined?{}:{saleId:value.saleId as number})};
}

export function validateSalesStore(value:unknown):SalesStore{
 if(!isRecord(value)||!keysAre(value,['nextSaleId','sales','stockHistory']))fail('Satış yaddaşı yanlışdır');
 if(!isInteger(value.nextSaleId,1)||!Array.isArray(value.sales)||value.sales.length>MAX_SALES||!Array.isArray(value.stockHistory)||value.stockHistory.length>MAX_HISTORY)fail('Satış yaddaşı yanlışdır');
 const sales=value.sales.map(validateSale),history=value.stockHistory.map(validateHistory),ids=new Set<number>();
 for(const sale of sales){if(ids.has(sale.id))fail('Təkrarlanan satış ID-si');ids.add(sale.id)}
 return {nextSaleId:value.nextSaleId as number,sales,stockHistory:history};
}

export function emptySalesStore():SalesStore{return {nextSaleId:EMPTY_SALES_STORE.nextSaleId,sales:[],stockHistory:[]};}
