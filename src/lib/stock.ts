export type StockState = {inStock?: boolean};

/** Historical catalog snapshots did not have a stock field and remain available. */
export function isInStock(product: StockState): boolean {
  return product.inStock !== false;
}

export function canIncreaseQuantity(product: StockState, current: number, next: number): boolean {
  return next <= current || isInStock(product);
}
