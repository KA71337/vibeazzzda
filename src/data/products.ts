import source from '../../data/products.json';

export type Product = {
  id: number;
  name: string;
  price: number;
  newPrice: number | null;
  description: string;
  link: string;
  images: string[];
  /**
   * One of the ids from `src/data/categories.ts`. Optional so that historical
   * snapshots (data/order-products.json) stay valid without a migration.
   */
  category?: string;
};

// Typed compatibility adapter for existing public consumers.
export const products: Product[] = source satisfies Product[];
