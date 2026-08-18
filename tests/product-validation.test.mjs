import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {MAX_FILE,validateFiles,validateProductInput} from '../src/server/products-validation-core.ts';

const categories=['diger'];
const base={id:1,name:'Məhsul',price:10,newPrice:null,description:'Təsvir',link:'https://tap.az/item',images:['/products/image.jpg'],category:'diger',inStock:true};

test('product stock is strict while legacy catalog data can default to available',()=>{
 assert.equal(validateProductInput({...base,inStock:false},categories).inStock,false);
 const {inStock,...legacy}=base;
 assert.throws(()=>validateProductInput(legacy,categories));
 assert.equal(validateProductInput(legacy,categories,{allowLegacyStock:true}).inStock,true);
});

test('product text is rendered as escaped text, not executable HTML',()=>{
 const payload='<img src=x onerror=alert(1)>';
 const product=validateProductInput({...base,name:payload},categories);
 const html=renderToStaticMarkup(createElement('p',null,product.name));
 assert.match(html,/&lt;img/);
 assert.doesNotMatch(html,/<img/);
});

test('unsafe URLs, traversal and unexpected fields are rejected',()=>{
 assert.throws(()=>validateProductInput({...base,link:'javascript:alert(1)'},categories));
 assert.throws(()=>validateProductInput({...base,images:['/products/../../secret']},categories));
 assert.throws(()=>validateProductInput({...base,price:'10'},categories));
 assert.throws(()=>validateProductInput(JSON.parse(JSON.stringify({...base,unexpected:true})),categories));
});

test('uploads reject SVG, spoofed MIME and oversized data',async()=>{
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64');
 await assert.rejects(()=>validateFiles([new File(['<svg><script>alert(1)</script></svg>'],'x.svg',{type:'image/svg+xml'})]));
 await assert.rejects(()=>validateFiles([new File(['<html>not an image</html>'],'x.png',{type:'image/png'})]));
 await assert.rejects(()=>validateFiles([new File([png],'x.jpg',{type:'image/png'})]));
 await assert.rejects(()=>validateFiles([new File([new Uint8Array(MAX_FILE+1)],'large.jpg',{type:'image/jpeg'})]));
});

test('valid image bytes receive a generated traversal-safe filename',async()=>{
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64');
 const [upload]=await validateFiles([new File([png],'../../evil.png',{type:'image/png'})]);
 assert.match(upload.path,/^public\/products\/admin\/[0-9]+-0-[0-9a-f-]+\.png$/);
 assert.equal(upload.path.includes('..'),false);
 assert.equal(upload.url,`/${upload.path.slice('public/'.length)}`);
});
