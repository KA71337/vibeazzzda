import type {ReactNode} from 'react';
import {ProductImage} from './product-image';
import {StockOverlay,stockImageClass} from './stock-status';

type Props={src?:string;alt:string;variant?:'card'|'compact';sizes?:string;className?:string;imageClassName?:string;inStock?:boolean;statusLabel?:string;children?:ReactNode};

export function ProductImageFrame({src,alt,variant='card',sizes,className='',imageClassName='',inStock=true,statusLabel='',children}:Props){
 const compact=variant==='compact';
 return <span className={`relative block shrink-0 overflow-hidden bg-[#f3f3f1] ${compact?'aspect-square rounded-[1.1rem] p-1.5':'aspect-[4/5] rounded-[1.6rem] p-2 sm:p-3'} ${className}`}>
  <span className={`relative block h-full w-full overflow-hidden bg-white ${compact?'rounded-[.8rem]':'rounded-[1.2rem]'}`}>
   <ProductImage src={src} alt={alt} sizes={sizes} className={`object-contain ${compact?'p-1.5':'p-3 sm:p-4'} ${stockImageClass(inStock)} ${imageClassName}`}/>
  </span>
  {statusLabel&&<StockOverlay inStock={inStock} label={statusLabel} compact={compact}/>}
  {children}
 </span>;
}
