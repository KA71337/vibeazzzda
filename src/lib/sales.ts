export type SaleStatus='completed'|'cancelled';
export type StockChangeReason='sale'|'sale_cancel'|'manual';

export type SaleItem={
 productId:number;
 name:string;
 category?:string;
 unitPrice:number;
 quantity:number;
 lineTotal:number;
};

export type Sale={
 id:number;
 createdAt:string;
 timezone:'Asia/Baku';
 status:SaleStatus;
 items:SaleItem[];
 totalQuantity:number;
 total:number;
 cancelledAt?:string;
};

export type StockHistoryEntry={
 id:string;
 createdAt:string;
 timezone:'Asia/Baku';
 productId:number;
 productName:string;
 from:number|null;
 to:number;
 reason:StockChangeReason;
 saleId?:number;
};

export type SalesStore={
 nextSaleId:number;
 sales:Sale[];
 stockHistory:StockHistoryEntry[];
};

export const EMPTY_SALES_STORE:SalesStore={nextSaleId:1001,sales:[],stockHistory:[]};
