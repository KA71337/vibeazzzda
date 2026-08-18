'use client';
/* eslint-disable @next/next/no-img-element -- Admin POS renders validated catalog image paths. */
import {useCallback,useEffect,useMemo,useState} from 'react';
import {BarChart3,CalendarDays,ChevronLeft,ChevronRight,Minus,Package,Plus,ReceiptText,RotateCcw,Search,ShoppingCart,TrendingUp,X} from 'lucide-react';
import type {Product} from '@/data/products';
import {categories,categoryLabel} from '@/data/categories';
import type {Sale,SalesStore,StockHistoryEntry} from '@/lib/sales';
import {getStock} from '@/lib/stock';

export type AdminSection='pos'|'sales'|'reports'|'stock';
type CartLine={productId:number;quantity:number};
type DateFilter='today'|'yesterday'|'week'|'month'|'30days'|'custom';
type Grain='day'|'week'|'month';
type Props={
 mode:AdminSection;
 products:Product[];
 csrf:string;
 busy:boolean;
 onCatalogChanged:()=>Promise<void>;
 onStockChange:(product:Product,stock:number)=>Promise<void>;
 onOpenSale:()=>void;
};

const AZN=new Intl.NumberFormat('az-AZ',{minimumFractionDigits:0,maximumFractionDigits:2});
const DATE_TIME=new Intl.DateTimeFormat('az-AZ',{timeZone:'Asia/Baku',dateStyle:'medium',timeStyle:'short'});
const DATE_PARTS=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Baku',year:'numeric',month:'2-digit',day:'2-digit'});
const emptyData:SalesStore={nextSaleId:1001,sales:[],stockHistory:[]};

function dateKey(value:Date|string){
 const parts=DATE_PARTS.formatToParts(typeof value==='string'?new Date(value):value),map=Object.fromEntries(parts.map(part=>[part.type,part.value]));
 return `${map.year}-${map.month}-${map.day}`;
}
function shiftKey(key:string,days:number){const date=new Date(`${key}T12:00:00Z`);date.setUTCDate(date.getUTCDate()+days);return date.toISOString().slice(0,10)}
function weekStart(key:string){const date=new Date(`${key}T12:00:00Z`),day=date.getUTCDay()||7;return shiftKey(key,1-day)}
function rangeFor(filter:DateFilter,customStart:string,customEnd:string){
 const today=dateKey(new Date());
 if(filter==='today')return [today,today] as const;
 if(filter==='yesterday'){const yesterday=shiftKey(today,-1);return [yesterday,yesterday] as const}
 if(filter==='week')return [weekStart(today),today] as const;
 if(filter==='month')return [`${today.slice(0,7)}-01`,today] as const;
 if(filter==='30days')return [shiftKey(today,-29),today] as const;
 return [customStart||today,customEnd||today] as const;
}
function inRange(sale:Sale,start:string,end:string){const key=dateKey(sale.createdAt);return key>=start&&key<=end}
function priceOf(product:Product){return product.newPrice??product.price}
function money(value:number){return `${AZN.format(value)} AZN`}
function compactProducts(sale:Sale){return sale.items.slice(0,2).map(item=>`${item.name} × ${item.quantity}`).join(', ')+(sale.items.length>2?` +${sale.items.length-2}`:'')}

async function api(url:string,init?:RequestInit){
 const response=await fetch(url,{...init,cache:'no-store'}),body=await response.json();
 if(!response.ok)throw new Error(body.error||'Xəta baş verdi');
 return body;
}

export function AdminPos({mode,products,csrf,busy:catalogBusy,onCatalogChanged,onStockChange,onOpenSale}:Props){
 const[data,setData]=useState<SalesStore>(emptyData),[cart,setCart]=useState<CartLine[]>([]),[query,setQuery]=useState(''),[category,setCategory]=useState(''),
  [loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState(''),
  [confirming,setConfirming]=useState(false),[selected,setSelected]=useState<Sale|null>(null),[dateFilter,setDateFilter]=useState<DateFilter>('month'),
  [customStart,setCustomStart]=useState(''),[customEnd,setCustomEnd]=useState(''),[grain,setGrain]=useState<Grain>('day'),
  [stockQuery,setStockQuery]=useState(''),[stockCategory,setStockCategory]=useState(''),[stockDraft,setStockDraft]=useState<Record<number,string>>({});

 const loadSales=useCallback(async()=>{
  setLoading(true);
  try{const value=await api('/api/admin/sales');setData({nextSaleId:1001,sales:value.sales||[],stockHistory:value.stockHistory||[]});setError('')}
  catch(error){setError((error as Error).message)}finally{setLoading(false)}
 },[]);
 useEffect(()=>{void loadSales()},[loadSales]);

  const productsById=useMemo(()=>new Map(products.map(product=>[product.id,product])),[products]);
  const cartDetails=useMemo(()=>cart.flatMap(line=>{const product=productsById.get(line.productId);return product?[{...line,product,unitPrice:priceOf(product),lineTotal:priceOf(product)*line.quantity}]:[]}),[cart,productsById]);
 const total=cartDetails.reduce((sum,line)=>sum+line.lineTotal,0),totalQuantity=cartDetails.reduce((sum,line)=>sum+line.quantity,0);
  const searchProducts=useMemo(()=>{
  const term=query.trim().toLocaleLowerCase('az');
  return products.filter(product=>(!category||product.category===category)&&(!term||`${product.name} ${product.id} ${categoryLabel(product.category,'az')}`.toLocaleLowerCase('az').includes(term)));
  },[products,query,category]);
 useEffect(()=>{setCart(current=>current.flatMap(line=>{const stock=getStock(productsById.get(line.productId)||{});return stock===undefined||stock<=0?[]:[{...line,quantity:Math.min(line.quantity,stock)}]}))},[productsById]);

 const setQuantity=(productId:number,quantity:number)=>{
  const product=productsById.get(productId),stock=product?getStock(product):undefined;
  if(!product||stock===undefined)return;
  const next=Math.min(stock,Math.max(0,Number.isSafeInteger(quantity)?quantity:0));
  setCart(current=>next===0?current.filter(line=>line.productId!==productId):current.some(line=>line.productId===productId)?current.map(line=>line.productId===productId?{...line,quantity:next}:line):[...current,{productId,quantity:next}]);
 };
 const addProduct=(product:Product)=>{const stock=getStock(product);if(stock===undefined||stock<=0)return;const current=cart.find(line=>line.productId===product.id)?.quantity||0;setQuantity(product.id,Math.min(stock,current+1))};

 const submitSale=async()=>{
  if(!cart.length)return;
  setBusy(true);setError('');setMessage('');
  try{
   const value=await api('/api/admin/sales',{method:'POST',headers:{'Content-Type':'application/json','x-csrf-token':csrf},body:JSON.stringify({items:cart})});
   setCart([]);setConfirming(false);setMessage(`Satış #${value.sale.id} uğurla qeydə alındı ✓`);
   await Promise.all([loadSales(),onCatalogChanged()]);
  }catch(error){setConfirming(false);setError((error as Error).message);await onCatalogChanged()}finally{setBusy(false)}
 };
 const cancelSelected=async()=>{
  if(!selected||selected.status==='cancelled'||!confirm(`Satış #${selected.id} ləğv edilsin? Stok geri qaytarılacaq.`))return;
  setBusy(true);setError('');
  try{
   await api('/api/admin/sales',{method:'PATCH',headers:{'Content-Type':'application/json','x-csrf-token':csrf},body:JSON.stringify({saleId:selected.id})});
   setSelected(null);setMessage(`Satış #${selected.id} ləğv edildi, stok geri qaytarıldı ✓`);
   await Promise.all([loadSales(),onCatalogChanged()]);
  }catch(error){setError((error as Error).message);await onCatalogChanged()}finally{setBusy(false)}
 };

 const [rangeStart,rangeEnd]=rangeFor(dateFilter,customStart,customEnd);
 const completed=useMemo(()=>data.sales.filter(sale=>sale.status==='completed'),[data.sales]);
 const filteredSales=useMemo(()=>data.sales.filter(sale=>inRange(sale,rangeStart,rangeEnd)).sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt)),[data.sales,rangeStart,rangeEnd]);
 const filteredCompleted=useMemo(()=>completed.filter(sale=>inRange(sale,rangeStart,rangeEnd)),[completed,rangeStart,rangeEnd]);
 const today=dateKey(new Date()),todaySales=completed.filter(sale=>dateKey(sale.createdAt)===today),weekSales=completed.filter(sale=>dateKey(sale.createdAt)>=weekStart(today)&&dateKey(sale.createdAt)<=today),monthSales=completed.filter(sale=>dateKey(sale.createdAt).startsWith(today.slice(0,7)));
 const summary=(sales:Sale[])=>({count:sales.length,total:sales.reduce((sum,sale)=>sum+sale.total,0)});
 const bestSellers=useMemo(()=>{
  const totals=new Map<number,{id:number;name:string;quantity:number;revenue:number}>();
  for(const sale of filteredCompleted)for(const item of sale.items){const current=totals.get(item.productId)||{id:item.productId,name:item.name,quantity:0,revenue:0};current.quantity+=item.quantity;current.revenue+=item.lineTotal;totals.set(item.productId,current)}
  return [...totals.values()].sort((a,b)=>b.quantity-a.quantity||b.revenue-a.revenue).slice(0,10);
 },[filteredCompleted]);
 const chart=useMemo(()=>{
  const groups=new Map<string,{sales:number;revenue:number}>();
  for(const sale of filteredCompleted){const day=dateKey(sale.createdAt),key=grain==='day'?day:grain==='week'?weekStart(day):day.slice(0,7);const group=groups.get(key)||{sales:0,revenue:0};group.sales++;group.revenue+=sale.total;groups.set(key,group)}
  return [...groups].sort(([a],[b])=>a.localeCompare(b)).slice(-16).map(([key,value])=>({key,label:grain==='month'?key:key.slice(5),...value}));
 },[filteredCompleted,grain]);
 const chartMax=Math.max(1,...chart.map(item=>item.revenue));

 const stockProducts=useMemo(()=>{
  const term=stockQuery.trim().toLocaleLowerCase('az');
  return products.filter(product=>(!stockCategory||product.category===stockCategory)&&(!term||`${product.name} ${product.id} ${categoryLabel(product.category,'az')}`.toLocaleLowerCase('az').includes(term)));
 },[products,stockQuery,stockCategory]);
 const saveStock=async(product:Product)=>{
  const raw=stockDraft[product.id]??String(getStock(product)??''),value=Number(raw);
  if(!Number.isSafeInteger(value)||value<0){setError('Stok sayı 0 və ya daha böyük tam ədəd olmalıdır');return}
  setError('');setMessage('');
  try{await onStockChange(product,value);setStockDraft(current=>({...current,[product.id]:String(value)}));setMessage(`${product.name}: stok ${value} ədəd olaraq yadda saxlanıldı ✓`);await loadSales()}
  catch(error){setError((error as Error).message)}
 };

 if(mode==='pos')return <section className="pos-view">
  <div className="section-heading"><div><p className="eyebrow">Kassa / POS</p><h2>Yeni satış</h2><p className="meta">Məhsullar və cari satış</p></div><button type="button" className="secondary" onClick={()=>setCart([])} disabled={!cart.length||busy}><RotateCcw size={17}/> Təmizlə</button></div>
  {error&&<p className="error">{error}</p>}{message&&<p className="status">{message}</p>}
  <div className="pos-layout">
   <section className="pos-products" aria-label="Məhsullar">
    <div className="pos-controls"><label className="search-field"><Search size={18}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Məhsul axtar..." aria-label="Məhsul axtar"/></label><select value={category} onChange={event=>setCategory(event.target.value)} aria-label="Kateqoriya"><option value="">Bütün kateqoriyalar</option>{categories.map(item=><option key={item.id} value={item.id}>{item.az}</option>)}</select></div>
    <div className="pos-product-grid">{searchProducts.map(product=>{const stock=getStock(product),unavailable=stock===undefined||stock<=0;return <article className={`pos-product ${unavailable?'disabled':''}`} key={product.id}><div className="pos-product-image"><img src={product.images[0]||'/logo.jpeg'} alt="" loading="lazy"/>{unavailable&&<span>{stock===undefined?'Stok təyin edilməyib':'Stokda yoxdur'}</span>}</div><div className="pos-product-body"><small>#{product.id} · {categoryLabel(product.category,'az')}</small><b>{product.name}</b><div className="pos-product-meta"><strong>{money(priceOf(product))}</strong><span>{stock===undefined?'—':`${stock} ədəd`}</span></div><button type="button" onClick={()=>addProduct(product)} disabled={unavailable||busy}><Plus size={16}/> Əlavə et</button></div></article>})}</div>
    {!searchProducts.length&&<p className="pos-empty">Məhsul tapılmadı</p>}
   </section>
   <aside className="sale-panel" aria-label="Cari satış"><div className="sale-panel-head"><div><p className="eyebrow">Cari satış</p><h3>{cartDetails.length} məhsul · {totalQuantity} ədəd</h3></div><ShoppingCart size={22}/></div><div className="sale-lines">{cartDetails.length?cartDetails.map(line=>{const stock=getStock(line.product)||0;return <article className="sale-line" key={line.productId}><div className="sale-line-title"><div><b>{line.product.name}</b><span>{money(line.unitPrice)} × {line.quantity}</span></div><button type="button" className="icon-button" onClick={()=>setQuantity(line.productId,0)} aria-label={`${line.product.name} sil`}><X size={16}/></button></div><div className="quantity-row"><button type="button" className="quantity-button" onClick={()=>setQuantity(line.productId,line.quantity-1)} aria-label="Azalt"><Minus size={16}/></button><input type="number" min="1" max={stock} step="1" inputMode="numeric" value={line.quantity} onChange={event=>setQuantity(line.productId,Number(event.target.value))} aria-label={`${line.product.name} miqdar`}/><button type="button" className="quantity-button" onClick={()=>setQuantity(line.productId,line.quantity+1)} disabled={line.quantity>=stock} aria-label="Artır"><Plus size={16}/></button><strong>{money(line.lineTotal)}</strong></div></article>}):<div className="sale-empty"><ShoppingCart size={30}/><b>Satış boşdur</b><span>Məhsul seçin</span></div>}</div><div className="sale-total"><span>CƏMİ</span><strong>{money(total)}</strong><small>{totalQuantity} ədəd</small></div><button type="button" className="sale-confirm" onClick={()=>setConfirming(true)} disabled={!cart.length||busy}>SATIŞI TƏSDİQLƏ <ChevronRight size={18}/></button></aside>
  </div>
  <div className="mobile-sale-bar"><div><span>Cəmi</span><strong>{money(total)}</strong></div><button type="button" onClick={()=>setConfirming(true)} disabled={!cart.length||busy}>SATILDI</button></div>
  {confirming&&<div className="modal" role="dialog" aria-modal="true" aria-label="Satışı təsdiqlə"><div className="panel confirm-sale"><ReceiptText size={28}/><p className="eyebrow">Yekun təsdiq</p><h2>Satışı təsdiqləyirsiniz?</h2><div className="confirm-summary"><span>{cartDetails.length} məhsul</span><span>{totalQuantity} ədəd</span><strong>{money(total)}</strong></div><footer><button type="button" className="secondary" onClick={()=>setConfirming(false)} disabled={busy}><ChevronLeft size={17}/> Geri</button><button type="button" onClick={submitSale} disabled={busy}>{busy?'Yadda saxlanılır…':'SATIŞI TƏSDİQLƏ'}</button></footer></div></div>}
 </section>;

 if(mode==='stock')return <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Anbar</p><h2>Stok</h2><p className="meta">Məhsul qalığı və dəyişiklik tarixçəsi</p></div></div>{error&&<p className="error">{error}</p>}{message&&<p className="status">{message}</p>}<div className="stock-layout"><div><div className="pos-controls"><label className="search-field"><Search size={18}/><input value={stockQuery} onChange={event=>setStockQuery(event.target.value)} placeholder="Məhsul axtar..."/></label><select value={stockCategory} onChange={event=>setStockCategory(event.target.value)}><option value="">Bütün kateqoriyalar</option>{categories.map(item=><option key={item.id} value={item.id}>{item.az}</option>)}</select></div><div className="stock-list">{stockProducts.map(product=>{const stock=getStock(product);return <article className="stock-item" key={product.id}><img src={product.images[0]||'/logo.jpeg'} alt=""/><div><small>#{product.id} · {categoryLabel(product.category,'az')}</small><b>{product.name}</b><span className={stock&&stock>0?'available':'unavailable'}>{stock===undefined?'Stok təyin edilməyib':stock>0?'Stokda var':'Stokda yoxdur'}</span></div><label>Stok sayı<input type="number" min="0" step="1" inputMode="numeric" value={stockDraft[product.id]??(stock===undefined?'':String(stock))} placeholder="0" onChange={event=>setStockDraft(current=>({...current,[product.id]:event.target.value.replace(/[^0-9]/g,'')}))}/></label><button type="button" onClick={()=>saveStock(product)} disabled={catalogBusy}>Yadda saxla</button></article>})}</div></div><aside className="stock-history"><div className="sale-panel-head"><div><p className="eyebrow">Audit</p><h3>Stok tarixçəsi</h3></div><Package size={21}/></div>{loading?<p className="pos-empty">Yüklənir…</p>:data.stockHistory.length?<div className="history-list">{[...data.stockHistory].sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt)).slice(0,100).map(entry=><StockHistory key={entry.id} entry={entry}/>)}</div>:<p className="pos-empty">Stok tarixçəsi boşdur</p>}</aside></div></section>;

 if(mode==='sales')return <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Satış tarixçəsi</p><h2>Satışlar</h2><p className="meta">Tamamlanmış və ləğv edilmiş əməliyyatlar</p></div><button type="button" onClick={onOpenSale}><Plus size={17}/> Yeni satış</button></div><DateFilters value={dateFilter} onChange={setDateFilter} start={customStart} end={customEnd} setStart={setCustomStart} setEnd={setCustomEnd}/>{error&&<p className="error">{error}</p>}{message&&<p className="status">{message}</p>}{loading?<p className="pos-empty">Yüklənir…</p>:filteredSales.length?<div className="sales-table-wrap"><table className="sales-table"><thead><tr><th>Tarix</th><th>Məhsullar</th><th>Miqdar</th><th>Məbləğ</th><th>Status</th></tr></thead><tbody>{filteredSales.map(sale=><tr key={sale.id} onClick={()=>setSelected(sale)} tabIndex={0} onKeyDown={event=>{if(event.key==='Enter')setSelected(sale)}}><td><b>#{sale.id}</b><span>{DATE_TIME.format(new Date(sale.createdAt))}</span></td><td>{compactProducts(sale)}</td><td>{sale.totalQuantity} ədəd</td><td><strong>{money(sale.total)}</strong></td><td><span className={`sale-status ${sale.status}`}>{sale.status==='completed'?'Satıldı':'Ləğv edildi'}</span></td></tr>)}</tbody></table></div>:<p className="pos-empty">Bu tarix aralığında satış yoxdur</p>}{selected&&<SaleDetails sale={selected} busy={busy} onClose={()=>setSelected(null)} onCancel={cancelSelected}/>}</section>;

 const todaySummary=summary(todaySales),weekSummary=summary(weekSales),monthSummary=summary(monthSales),filteredSummary=summary(filteredCompleted),allSummary=summary(completed);
 return <section className="admin-section"><div className="section-heading"><div><p className="eyebrow">Analitika</p><h2>Hesabatlar</h2><p className="meta">Satış və gəlir göstəriciləri</p></div><BarChart3 size={25}/></div><DateFilters value={dateFilter} onChange={setDateFilter} start={customStart} end={customEnd} setStart={setCustomStart} setEnd={setCustomEnd}/>{error&&<p className="error">{error}</p>}<div className="report-cards"><ReportCard label="BU GÜN" value={money(todaySummary.total)} note={`${todaySummary.count} satış`} icon={<CalendarDays size={20}/>}/><ReportCard label="BU HƏFTƏ" value={money(weekSummary.total)} note={`${weekSummary.count} satış`} icon={<TrendingUp size={20}/>}/><ReportCard label="BU AY" value={money(monthSummary.total)} note={`${monthSummary.count} satış`} icon={<BarChart3 size={20}/>}/><ReportCard label="ÜMUMİ SATIŞ" value={money(allSummary.total)} note={`${allSummary.count} satış`} icon={<ReceiptText size={20}/>}/></div><div className="report-grid"><section className="report-panel chart-panel"><div className="panel-heading"><div><p className="eyebrow">Gəlir</p><h3>{money(filteredSummary.total)}</h3><span>{filteredSummary.count} satış · {rangeStart} — {rangeEnd}</span></div><div className="segmented"><button type="button" className={grain==='day'?'active':''} onClick={()=>setGrain('day')}>Gün</button><button type="button" className={grain==='week'?'active':''} onClick={()=>setGrain('week')}>Həftə</button><button type="button" className={grain==='month'?'active':''} onClick={()=>setGrain('month')}>Ay</button></div></div>{chart.length?<div className="revenue-chart" aria-label="Gəlir qrafiki">{chart.map(item=><div className="chart-column" key={item.key} title={`${item.key}: ${money(item.revenue)}`}><span>{item.revenue?AZN.format(item.revenue):''}</span><div style={{height:`${Math.max(5,item.revenue/chartMax*100)}%`}}/><small>{item.label}</small></div>)}</div>:<p className="pos-empty">Qrafik üçün satış yoxdur</p>}</section><section className="report-panel"><div className="panel-heading"><div><p className="eyebrow">Reytinq</p><h3>Ən çox satılan məhsullar</h3></div></div>{bestSellers.length?<ol className="best-sellers">{bestSellers.map((item,index)=><li key={item.id}><span>{index+1}</span><div><b>{item.name}</b><small>{money(item.revenue)}</small></div><strong>{item.quantity} ədəd</strong></li>)}</ol>:<p className="pos-empty">Bu dövrdə məlumat yoxdur</p>}</section></div></section>;
}

function StockHistory({entry}:{entry:StockHistoryEntry}){const reason=entry.reason==='sale'?`Satış #${entry.saleId}`:entry.reason==='sale_cancel'?`Satış #${entry.saleId} ləğv edildi`:'Manual dəyişiklik';return <article><span>{DATE_TIME.format(new Date(entry.createdAt))}</span><b>{entry.productName}</b><strong>{entry.from===null?'—':entry.from} → {entry.to}</strong><small>{reason}</small></article>}
function ReportCard({label,value,note,icon}:{label:string;value:string;note:string;icon:React.ReactNode}){return <article className="report-card"><div>{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></article>}
function DateFilters({value,onChange,start,end,setStart,setEnd}:{value:DateFilter;onChange:(value:DateFilter)=>void;start:string;end:string;setStart:(value:string)=>void;setEnd:(value:string)=>void}){return <div className="date-filters"><div className="date-filter-buttons">{([['today','Bu gün'],['yesterday','Dünən'],['week','Bu həftə'],['month','Bu ay'],['30days','Son 30 gün'],['custom','Tarix aralığı']] as const).map(([key,label])=><button type="button" className={value===key?'active':''} key={key} onClick={()=>onChange(key)}>{label}</button>)}</div>{value==='custom'&&<div className="custom-dates"><label>Başlanğıc<input type="date" value={start} onChange={event=>setStart(event.target.value)}/></label><label>Son<input type="date" value={end} min={start} onChange={event=>setEnd(event.target.value)}/></label></div>}</div>}
function SaleDetails({sale,busy,onClose,onCancel}:{sale:Sale;busy:boolean;onClose:()=>void;onCancel:()=>void}){return <div className="modal" role="dialog" aria-modal="true" aria-label={`Satış #${sale.id}`}><div className="panel sale-details"><div className="sale-details-head"><div><p className="eyebrow">Satış #{sale.id}</p><h2>{sale.status==='completed'?'Satıldı':'Ləğv edildi'}</h2><span>{DATE_TIME.format(new Date(sale.createdAt))} · Asia/Baku</span></div><button type="button" className="icon-button" onClick={onClose} aria-label="Bağla"><X size={19}/></button></div><div className="detail-lines">{sale.items.map(item=><article key={item.productId}><div><b>{item.name}</b><span>{money(item.unitPrice)} × {item.quantity}</span></div><strong>{money(item.lineTotal)}</strong></article>)}</div><div className="sale-total"><span>CƏMİ</span><strong>{money(sale.total)}</strong><small>{sale.totalQuantity} ədəd</small></div><footer><button type="button" className="secondary" onClick={onClose}>Bağla</button>{sale.status==='completed'&&<button type="button" className="danger" onClick={onCancel} disabled={busy}>Satışı ləğv et</button>}</footer></div></div>}
