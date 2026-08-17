import 'server-only';
import type {Product} from '@/data/products';
import {categoryIds} from '@/data/categories';
import {MAX_FILE,MAX_FILES,MAX_IMAGES,MAX_TOTAL,ValidationError,validateCatalogInput,validateFiles,validateProductInput} from './products-validation-core';

export {MAX_FILE,MAX_FILES,MAX_IMAGES,MAX_TOTAL,ValidationError,validateFiles};

export function validateProduct(value:unknown):Product{
 return validateProductInput(value,categoryIds) as Product;
}

export function validateCatalog(value:unknown):Product[]{
 return validateCatalogInput(value,categoryIds) as Product[];
}
