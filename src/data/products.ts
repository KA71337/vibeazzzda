import source from '../../data/products.json';

export type Product = {
  id: number;
  name: string;
  price: number;
  newPrice: number | null;
  description: string;
  link: string;
  images: string[];
};

// Typed compatibility adapter for existing public consumers.
export const products: Product[] = source satisfies Product[];
