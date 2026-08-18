export type StockState = {inStock?: boolean;stock?: number};

export function getStock(product: StockState): number|undefined {
  const value=product.stock;
  return typeof value==='number'&&Number.isSafeInteger(value)&&value>=0?value:undefined;
}

/** Historical catalog snapshots did not have a stock field and remain available. */
export function isInStock(product: StockState): boolean {
  const stock=getStock(product);
  return stock===undefined?product.inStock!==false:stock>0;
}

export function canIncreaseQuantity(product: StockState, current: number, next: number): boolean {
  const stock=getStock(product);
  return stock===undefined?(next<=current||isInStock(product)):next<=stock;
}
