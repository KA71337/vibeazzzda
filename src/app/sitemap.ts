import type {MetadataRoute} from 'next';
import {categories} from '@/data/categories';
import {products} from '@/data/products';
import {absoluteUrl,categoryPath,productPath} from '@/lib/seo';

const updatedAt=new Date();
const usedCategoryIds=new Set(products.map(product=>product.category).filter((id):id is string=>Boolean(id)));

export default function sitemap():MetadataRoute.Sitemap{
 const categoryEntries=categories
  .filter(category=>usedCategoryIds.has(category.id))
  .map(category=>({
   url:absoluteUrl(categoryPath(category.id)),
   lastModified:updatedAt,
   changeFrequency:'weekly' as const,
   priority:.7,
  }));
 const productEntries=products.map(product=>({
  url:absoluteUrl(productPath(product.id)),
  lastModified:updatedAt,
  changeFrequency:'weekly' as const,
  priority:.8,
  images:product.images.map(image=>absoluteUrl(image)),
 }));
 return [
  {url:absoluteUrl('/'),lastModified:updatedAt,changeFrequency:'weekly',priority:1},
  {url:absoluteUrl('/catalog/'),lastModified:updatedAt,changeFrequency:'daily',priority:.9},
  ...categoryEntries,
  ...productEntries,
 ];
}
