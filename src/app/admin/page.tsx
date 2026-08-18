'use client';
/* eslint-disable @next/next/no-img-element -- Admin previews support blob URLs and validated external catalog images. */
import {useCallback,useEffect,useMemo,useState} from 'react';
import {BarChart3,Boxes,LayoutGrid,LogOut,Plus,ReceiptText,ShoppingCart} from 'lucide-react';
import type {Product} from '@/data/products';
import {categories,categoryLabel} from '@/data/categories';
import {getStock,isInStock} from '@/lib/stock';
import {AdminPos,type AdminSection} from '@/components/admin-pos';
import './admin.css';

type State={authenticated:boolean;configured:boolean;catalogConfigured?:boolean;csrf?:string};
type Section='catalog'|AdminSection;
const blank:Product={id:0,name:'',price:0,newPrice:null,description:'',link:'',images:[],category:'',stock:0,inStock:false};

async function request(url:string,init?:RequestInit){
 const response=await fetch(url,{...init,cache:'no-store'}),body=await response.json();
 if(!response.ok)throw new Error(body.error||'Xəta baş verdi');
 return body;
}

export default function Admin(){
 const[auth,setAuth]=useState<State|null>(null),[password,setPassword]=useState(''),[items,setItems]=useState<Product[]>([]),
  [revision,setRevision]=useState(''),[query,setQuery]=useState(''),[filter,setFilter]=useState(''),
  [edit,setEdit]=useState<Product|null>(null),[files,setFiles]=useState<File[]>([]),
  [msg,setMsg]=useState(''),[err,setErr]=useState(''),[busy,setBusy]=useState(false),[section,setSection]=useState<Section>('catalog');

 const load=useCallback(async()=>{try{const j=await request('/api/admin/products');setItems((j.products as Product[]).map(p=>({...p,inStock:isInStock(p)})));setRevision(j.revision);setErr('')}catch(e){setErr((e as Error).message)}},[]);

 useEffect(()=>{
  request('/api/admin/auth/status')
   .then((s:State)=>{setAuth(s);if(s.authenticated&&s.catalogConfigured!==false)load()})
   .catch(()=>setAuth({authenticated:false,configured:false,catalogConfigured:false}));
 },[load]);

 const login=async(e:React.FormEvent)=>{
  e.preventDefault();setBusy(true);setErr('');
  try{
   const s=await request('/api/admin/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
    setAuth(a=>({catalogConfigured:a?.catalogConfigured,authenticated:true,configured:true,csrf:s.csrf}));
   setPassword('');
   if(auth?.catalogConfigured!==false)await load();
  }catch(e){setErr((e as Error).message)}finally{setBusy(false)}
 };

 const save=async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!edit||!auth?.csrf)return;
  setBusy(true);setErr('');setMsg('Yadda saxlanılır…');
  try{
    const previous=items.find(x=>x.id===edit.id),stockChanged=!!previous&&(getStock(previous)!==getStock(edit)||isInStock(previous)!==isInStock(edit));
   const fd=new FormData();
   fd.set('revision',revision);
   fd.set('product',JSON.stringify(edit));
   files.forEach(f=>fd.append('images',f));
   await request('/api/admin/products',{method:items.some(x=>x.id===edit.id)?'PATCH':'POST',headers:{'x-csrf-token':auth.csrf},body:fd});
   setEdit(null);setFiles([]);setMsg(stockChanged?'Məhsulun statusu yeniləndi ✓':'Yadda saxlanıldı');
   await load();
  }catch(e){setMsg('');setErr((e as Error).message)}finally{setBusy(false)}
 };

 const remove=async(p:Product)=>{
  if(!auth?.csrf||!confirm('«'+p.name+'» silinsin? Bu əməliyyat GitHub-a yazılacaq.'))return;
  setBusy(true);setErr('');
  try{
   const fd=new FormData();
   fd.set('revision',revision);
   fd.set('product',JSON.stringify({id:p.id}));
   await request('/api/admin/products',{method:'DELETE',headers:{'x-csrf-token':auth.csrf},body:fd});
   setMsg('Silindi');
   await load();
  }catch(e){setErr((e as Error).message)}finally{setBusy(false)}
 };

 const updateStock=async(p:Product,inStock:boolean)=>{
  if(!auth?.csrf||busy||isInStock(p)===inStock)return;
  setBusy(true);setErr('');setMsg('Status yenilənir…');
  try{
   const fd=new FormData();
   fd.set('revision',revision);
   const stock=inStock?Math.max(1,getStock(p)??1):0;
   fd.set('product',JSON.stringify({...p,stock,inStock:stock>0}));
   await request('/api/admin/products',{method:'PATCH',headers:{'x-csrf-token':auth.csrf},body:fd});
   setMsg('Məhsulun statusu yeniləndi ✓');
   await load();
  }catch(e){setMsg('');setErr((e as Error).message)}finally{setBusy(false)}
 };

 const changeStock=async(p:Product,stock:number)=>{
  if(!auth?.csrf||busy)throw new Error('Sorğu hazırda icra olunur');
  if(!Number.isSafeInteger(stock)||stock<0)throw new Error('Stok sayı 0 və ya daha böyük tam ədəd olmalıdır');
  setBusy(true);setErr('');setMsg('Stok yenilənir…');
  try{
   const fd=new FormData();fd.set('revision',revision);fd.set('product',JSON.stringify({...p,stock,inStock:stock>0}));
   await request('/api/admin/products',{method:'PATCH',headers:{'x-csrf-token':auth.csrf},body:fd});
   setMsg('Stok yeniləndi ✓');await load();
  }catch(error){setMsg('');setErr((error as Error).message);throw error}finally{setBusy(false)}
 };

 const shown=useMemo(()=>items.filter(p=>
  (p.name+' '+p.id).toLowerCase().includes(query.toLowerCase().trim())&&(!filter||p.category===filter)
 ),[items,query,filter]);

 if(auth===null)return <main className="admin"><p className="status">Giriş yoxlanılır…</p></main>;

 if(!auth.authenticated)return (
  <main className="admin login">
   <form className="panel" onSubmit={login}>
    <img src="/logo.jpeg" alt="VIBE AZ"/>
    <h1>Kataloq idarəetməsi</h1>
    {!auth.configured&&<p className="error">Admin girişi serverdə konfiqurasiya edilməyib. Təhlükəsiz mühit dəyişənlərini yoxlayın və tətbiqi yenidən başladın.</p>}
    <label>Şifrə
     <input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/>
    </label>
    <button type="submit" disabled={busy}>{busy?'Yoxlanılır…':'Daxil ol'}</button>
    {err&&<p className="error">{err}</p>}
   </form>
  </main>
 );

 return (
  <main className="admin admin-shell">
   <aside className="admin-sidebar">
    <div className="admin-brand"><img src="/logo.jpeg" alt="VIBE AZ"/><div><b>VIBE AZ</b><span>Admin Panel</span></div></div>
    <button type="button" className="new-sale-button" onClick={()=>setSection('pos')}><Plus size={19}/> Yeni satış</button>
    <nav aria-label="Admin bölmələri">
     <button type="button" className={section==='catalog'?'active':''} onClick={()=>setSection('catalog')}><LayoutGrid size={18}/> Kataloq</button>
     <button type="button" className={section==='pos'?'active':''} onClick={()=>setSection('pos')}><ShoppingCart size={18}/> Kassa</button>
     <button type="button" className={section==='sales'?'active':''} onClick={()=>setSection('sales')}><ReceiptText size={18}/> Satışlar</button>
     <button type="button" className={section==='reports'?'active':''} onClick={()=>setSection('reports')}><BarChart3 size={18}/> Hesabatlar</button>
     <button type="button" className={section==='stock'?'active':''} onClick={()=>setSection('stock')}><Boxes size={18}/> Stok</button>
    </nav>
    <div className="sidebar-meta"><span>{items.length} məhsul</span><span>{revision&&'rev. '+revision.slice(0,7)}</span></div>
    <button className="sidebar-logout" onClick={async()=>{try{await request('/api/admin/auth/logout',{method:'POST',headers:{'x-csrf-token':auth.csrf||''}})}finally{location.reload()}}}><LogOut size={17}/> Çıxış</button>
   </aside>
   <div className="admin-workspace">
    <header className="mobile-admin-header"><div><p className="eyebrow">VIBE AZ</p><h1>{section==='catalog'?'Kataloq':section==='pos'?'Kassa':section==='sales'?'Satışlar':section==='reports'?'Hesabatlar':'Stok'}</h1></div><button type="button" onClick={()=>setSection('pos')}><Plus size={18}/> Yeni satış</button></header>
    {auth.catalogConfigured===false&&<p className="error">Kataloq serverdə konfiqurasiya edilməyib. Giriş işləyir, lakin məhsulları oxumaq və yadda saxlamaq mümkün deyil.</p>}

    {section==='catalog'?<>
     <div className="section-heading catalog-heading"><div><p className="eyebrow">Məhsullar</p><h2>Kataloq</h2><p className="meta">{items.length} məhsul{revision&&' · reviziya '+revision.slice(0,7)}</p></div></div>
     <section className="toolbar">
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ad və ya ID üzrə axtar" aria-label="Axtarış"/>
      <select value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Kateqoriya"><option value="">Bütün kateqoriyalar</option>{categories.map(c=><option key={c.id} value={c.id}>{c.az}</option>)}</select>
      <button onClick={()=>{setEdit({...blank,id:Math.max(0,...items.map(x=>x.id))+1});setFiles([])}} disabled={auth.catalogConfigured===false||busy}>Məhsul əlavə et</button>
     </section>
     {err&&<p className="error">{err}</p>}{msg&&!err&&<p className="status">{msg}</p>}
     {shown.length===0?<p className="empty">{items.length===0?'Hələ məhsul yoxdur':'Heç nə tapılmadı'}</p>:<section className="grid">{shown.map(p=><article className="card" key={p.id}><img className={isInStock(p)?'':'unavailable'} src={p.images[0]||'/logo.jpeg'} alt="" loading="lazy"/><div className="body"><span className="name">#{p.id} · {p.name}</span><span className="price">{p.newPrice??p.price} AZN</span>{p.category&&<span className="tag">{categoryLabel(p.category,'az')}</span>}<div className="stock-row"><span>Stok:</span><button type="button" role="switch" aria-checked={isInStock(p)} aria-label={`${p.name}: ${isInStock(p)?'stokda var':'stokda yoxdur'}`} className={`stock-switch ${isInStock(p)?'active':''}`} onClick={()=>updateStock(p,!isInStock(p))} disabled={busy}><span/></button><b>{getStock(p)===undefined?(isInStock(p)?'Stokda var':'Stokda yoxdur'):`${getStock(p)} ədəd`}</b></div><div className="actions"><button className="secondary" onClick={()=>{setEdit({...p,category:p.category||'',images:[...p.images],inStock:isInStock(p)});setFiles([])}}>Dəyiş</button><button className="danger" onClick={()=>remove(p)} disabled={busy}>Sil</button></div></div></article>)}</section>}
    </>:<AdminPos mode={section} products={items} csrf={auth.csrf||''} busy={busy} onCatalogChanged={load} onStockChange={changeStock} onOpenSale={()=>setSection('pos')}/>}
   </div>

   {edit&&
    <div className="modal" role="dialog" aria-modal="true" aria-label="Məhsul redaktoru">
     <form className="panel editor" onSubmit={save}>
      <h2>{items.some(x=>x.id===edit.id)?'Redaktə':'Yeni məhsul'}</h2>
      <div className="fields">
       <label>ID
        <input type="number" min="1" value={edit.id} disabled={items.some(x=>x.id===edit.id)} onChange={e=>setEdit({...edit,id:Number(e.target.value)})}/>
       </label>
       <label>Kateqoriya
        <select value={edit.category||''} onChange={e=>setEdit({...edit,category:e.target.value})}>
         <option value="">Seçilməyib</option>
         {categories.map(c=><option key={c.id} value={c.id}>{c.az}</option>)}
        </select>
       </label>
       <label className="wide">Ad
        <input value={edit.name} maxLength={160} required onChange={e=>setEdit({...edit,name:e.target.value})}/>
       </label>
       <label>Qiymət (AZN)
        <input type="number" min="0" step="0.01" value={edit.price} onChange={e=>setEdit({...edit,price:Number(e.target.value)})}/>
       </label>
       <label>Endirimli qiymət
        <input type="number" min="0" step="0.01" value={edit.newPrice??''} onChange={e=>setEdit({...edit,newPrice:e.target.value===''?null:Number(e.target.value)})}/>
       </label>
       <label>Stok sayı
         <input type="number" min="0" step="1" inputMode="numeric" value={getStock(edit)??''} placeholder="0" onChange={e=>{const value=e.target.value;setEdit({...edit,...(value===''?{stock:0,inStock:false}:{stock:Math.max(0,Math.trunc(Number(value))),inStock:Number(value)>0})})}}/>
       </label>
       <div className="stock-field"><span>Məhsulun mövcudluğu</span><b>{getStock(edit)===undefined?'Stok təyin edilməyib':isInStock(edit)?'Stokda var':'Stokda yoxdur'}</b></div>
       <label className="wide">Təsvir
        <textarea value={edit.description} maxLength={10000} onChange={e=>setEdit({...edit,description:e.target.value})}/>
       </label>
       <label className="wide">Keçid
        <input value={edit.link} maxLength={2048} onChange={e=>setEdit({...edit,link:e.target.value})}/>
       </label>
       <label className="wide">Şəkillər (maksimum 8; JPG, PNG, WEBP)
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e=>setFiles(Array.from(e.target.files||[]))}/>
       </label>
      </div>
      <div className="previews">
       {edit.images.map((x,i)=>
        <span key={x}>
         <img src={x} alt=""/>
         <button type="button" aria-label="Şəkli sil" onClick={()=>setEdit({...edit,images:edit.images.filter((_,j)=>i!==j)})}>×</button>
        </span>
       )}
       {files.map(f=><img key={f.name} src={URL.createObjectURL(f)} alt=""/>)}
      </div>
      <footer>
       <button type="button" className="secondary" onClick={()=>{setEdit(null);setFiles([]);setMsg('')}}>Ləğv et</button>
       <button type="submit" disabled={busy}>{busy?'Yadda saxlanılır…':'Yadda saxla'}</button>
      </footer>
     </form>
    </div>}
  </main>
 );
}
