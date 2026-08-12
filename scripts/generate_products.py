import re,json,pathlib,shutil
root=pathlib.Path(__file__).resolve().parents[1]
s=(root/'vibeaz_products/products.txt').read_text(encoding='utf-8')
parts=re.split(r'={80}\s*PRODUCT\s+(\d+)\s*={80}',s)[1:]
out=[]
for i in range(0,len(parts),2):
 id=int(parts[i]); b=parts[i+1]
 def field(label,end):
  m=re.search(re.escape(label)+r':\s*(.*?)(?=\n'+re.escape(end)+r':)',b,re.S); return m.group(1).strip() if m else ''
 name_value=field('Название','Цена'); price_value=field('Цена','Ссылка'); link_value=field('Ссылка','ФОТО')
 name=name_value.splitlines()[0].strip() if name_value.splitlines() else ''; price_s=price_value.splitlines()[0].strip() if price_value.splitlines() else ''; link=link_value.splitlines()[0].strip() if link_value.splitlines() else ''
 desc=field('ОПИСАНИЕ','НОВАЯ ЦЕНА')
 imgs=re.findall(r'(image_\d+\.(?:jpg|jpeg|png|webp))\s*=',b,re.I)
 price_m=re.search(r'[\d.,]+',price_s.replace(' ','')); price=float(price_m.group(0).replace(',','.')) if price_m else 0
 if imgs and price>0: out.append({'id':id,'name':name,'price':price,'newPrice':None,'description':desc,'link':link,'images':['/products/'+x for x in imgs if (root/'vibeaz_products/images'/x).exists()]})
public=root/'public'; (public/'products').mkdir(parents=True,exist_ok=True)
shutil.copyfile(root/'logo.jpg',public/'logo.jpeg')
for p in (root/'vibeaz_products/images').glob('*'): shutil.copyfile(p,public/'products'/p.name)
(root/'src/data').mkdir(parents=True,exist_ok=True)
(root/'src/data/products.ts').write_text('export type Product={id:number;name:string;price:number;newPrice:number|null;description:string;link:string;images:string[]};\nexport const products:Product[]='+json.dumps(out,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print('Generated',len(out),'products and',sum(len(x['images']) for x in out),'image mappings')
