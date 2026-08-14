'use client';
import {useEffect,useMemo,useState} from 'react';
import type {Product} from '@/data/products';
import {categories,categoryLabel} from '@/data/categories';
import './admin.css';

type State={authenticated:boolean;configured:boolean;catalogConfigured?:boolean;missing?:string[];csrf?:string};
const blank:Product={id:0,name:'',price:0,newPrice:null,description:'',link:'',images:[],category:''};

export default function Admin(){
 const[auth,setAuth]=useState<State|null>(null),[password,setPassword]=useState(''),[items,setItems]=useState<Product[]>([]),
  [revision,setRevision]=useState(''),[query,setQuery]=useState(''),[filter,setFilter]=useState(''),
  [edit,setEdit]=useState<Product|null>(null),[files,setFiles]=useState<File[]>([]),
  [msg,setMsg]=useState(''),[err,setErr]=useState(''),[busy,setBusy]=useState(false);

 const request=async(url:string,init?:RequestInit)=>{
  const r=await fetch(url,{...init,cache:'no-store'}),j=await r.json();
  if(!r.ok)throw new Error(j.error||'Xəta baş verdi');
  return j;
 };
 const load=async()=>{try{const j=await request('/api/admin/products');setItems(j.products);setRevision(j.revision);setErr('')}catch(e){setErr((e as Error).message)}};

 useEffect(()=>{
  request('/api/admin/auth/status')
   .then((s:State)=>{setAuth(s);if(s.authenticated&&s.catalogConfigured!==false)load()})
   .catch(()=>setAuth({authenticated:false,configured:false,catalogConfigured:false,missing:[]}));
 },[]);

 const login=async(e:React.FormEvent)=>{
  e.preventDefault();setBusy(true);setErr('');
  try{
   const s=await request('/api/admin/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
   setAuth(a=>({catalogConfigured:a?.catalogConfigured,missing:a?.missing,authenticated:true,configured:true,csrf:s.csrf}));
   setPassword('');
   if(auth?.catalogConfigured!==false)await load();
  }catch(e){setErr((e as Error).message)}finally{setBusy(false)}
 };

 const save=async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!edit||!auth?.csrf)return;
  setBusy(true);setErr('');setMsg('Yadda saxlanılır…');
  try{
   const fd=new FormData();
   fd.set('revision',revision);
   fd.set('product',JSON.stringify(edit));
   files.forEach(f=>fd.append('images',f));
   await request('/api/admin/products',{method:items.some(x=>x.id===edit.id)?'PATCH':'POST',headers:{'x-csrf-token':auth.csrf},body:fd});
   setEdit(null);setFiles([]);setMsg('Yadda saxlanıldı');
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

 const shown=useMemo(()=>items.filter(p=>
  (p.name+' '+p.id).toLowerCase().includes(query.toLowerCase().trim())&&(!filter||p.category===filter)
 ),[items,query,filter]);

 if(auth===null)return <main className="admin"><p className="status">Giriş yoxlanılır…</p></main>;

 if(!auth.authenticated)return (
  <main className="admin login">
   <form className="panel" onSubmit={login}>
    <img src="/logo.jpeg" alt="VIBE AZ"/>
    <h1>Kataloq idarəetməsi</h1>
    {!auth.configured&&<p className="error">Giriş konfiqurasiya edilməyib. Bu mühit dəyişənlərini təyin edin: {(auth.missing||[]).filter(v=>v==='ADMIN_PASSWORD'||v==='SESSION_SECRET').join(', ')||'ADMIN_PASSWORD, SESSION_SECRET'} — sonra tətbiqi yenidən yükləyin.</p>}
    <label>Şifrə
     <input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/>
    </label>
    <button type="submit" disabled={busy}>{busy?'Yoxlanılır…':'Daxil ol'}</button>
    {err&&<p className="error">{err}</p>}
   </form>
  </main>
 );

 return (
  <main className="admin">
   <header>
    <div>
     <p className="eyebrow">VIBE AZ</p>
     <h1>Kataloq</h1>
     <p className="meta">{items.length} məhsul{revision&&' · reviziya '+revision.slice(0,7)}</p>
    </div>
    <button className="secondary" onClick={async()=>{
     try{await request('/api/admin/auth/logout',{method:'POST',headers:{'x-csrf-token':auth.csrf||''}})}finally{location.reload()}
    }}>Çıxış</button>
   </header>

   {auth.catalogConfigured===false&&<p className="error">Kataloq əlçatan deyil: {(auth.missing||[]).filter(v=>v.startsWith('GITHUB_')).join(', ')||'GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO'} dəyişənləri təyin edilməyib. Giriş işləyir, lakin məhsulları oxumaq və yadda saxlamaq mümkün deyil.</p>}

   <section className="toolbar">
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ad və ya ID üzrə axtar" aria-label="Axtarış"/>
    <select value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Kateqoriya">
     <option value="">Bütün kateqoriyalar</option>
     {categories.map(c=><option key={c.id} value={c.id}>{c.az}</option>)}
    </select>
    <button onClick={()=>{setEdit({...blank,id:Math.max(0,...items.map(x=>x.id))+1});setFiles([])}} disabled={auth.catalogConfigured===false}>Məhsul əlavə et</button>
   </section>

   {err&&<p className="error">{err}</p>}
   {msg&&!err&&<p className="status">{msg}</p>}

   {shown.length===0
    ?<p className="empty">{items.length===0?'Hələ məhsul yoxdur':'Heç nə tapılmadı'}</p>
    :<section className="grid">
      {shown.map(p=>
       <article className="card" key={p.id}>
        <img src={p.images[0]||'/logo.jpeg'} alt="" loading="lazy"/>
        <div className="body">
         <span className="name">#{p.id} · {p.name}</span>
         <span className="price">{p.newPrice??p.price} AZN</span>
         {p.category&&<span className="tag">{categoryLabel(p.category,'az')}</span>}
         <div className="actions">
          <button className="secondary" onClick={()=>{setEdit({...p,category:p.category||'',images:[...p.images]});setFiles([])}}>Dəyiş</button>
          <button className="danger" onClick={()=>remove(p)} disabled={busy}>Sil</button>
         </div>
        </div>
       </article>
      )}
     </section>}

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
       <label className="wide">Təsvir
        <textarea value={edit.description} onChange={e=>setEdit({...edit,description:e.target.value})}/>
       </label>
       <label className="wide">Keçid
        <input value={edit.link} onChange={e=>setEdit({...edit,link:e.target.value})}/>
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
