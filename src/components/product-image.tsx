'use client';

import Image from 'next/image';
import {ImageOff} from 'lucide-react';
import {useEffect,useState} from 'react';

type ProductImageProps={
 src?:string;
 alt:string;
 priority?:boolean;
 sizes?:string;
 className?:string;
 /** Natural width/height of the decoded file. Lets a gallery frame match the photo instead of letterboxing it. */
 onRatio?:(ratio:number)=>void;
};

export function ProductImage({src,alt,priority=false,sizes,className='object-contain',onRatio}:ProductImageProps){
 const[failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[src]);
 if(!src||failed)return <div role="img" aria-label={`${alt}: şəkil mövcud deyil`} className="absolute inset-0 grid place-items-center bg-gray-100 text-gray-400"><span className="flex flex-col items-center gap-2 text-center text-xs"><ImageOff aria-hidden="true"/><span>Şəkil mövcud deyil</span></span></div>;
 return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} onError={()=>setFailed(true)} onLoad={onRatio?e=>{const{naturalWidth:w,naturalHeight:h}=e.currentTarget;if(w>0&&h>0)onRatio(w/h)}:undefined}/>;
}
