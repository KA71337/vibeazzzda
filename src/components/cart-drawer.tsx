'use client';
import Link from 'next/link';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowRight,Minus,Plus,ShoppingBag,Trash2,X} from 'lucide-react';
import {useEffect} from 'react';
import {products} from '@/data/products';
import {isInStock} from '@/lib/stock';
import {priceOf,useStore} from './store';
import {ProductImageFrame} from './product-image-frame';

/**
 * Shopping drawer: slides in from the right on desktop, takes the full screen
 * on phones. Reads/writes the same cart state as the /cart page.
 */
export function CartDrawer() {
  const {drawer, setDrawer, cart, setQty, remove, t} = useStore();
  const items = cart.map(c => ({c, p: products.find(p => p.id === c.id)!})).filter(x => x.p);
  const total = items.reduce((s, x) => s + priceOf(x.p) * x.c.qty, 0);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer, setDrawer]);

  return (
    <AnimatePresence>
      {drawer && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            aria-label={t.close}
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={() => setDrawer(false)}
            className="absolute inset-0 w-full bg-black/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog" aria-modal="true" aria-label={t.cart}
            initial={{x: '100%'}} animate={{x: 0}} exit={{x: '100%'}}
            transition={{type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1]}}
            className="absolute right-0 top-0 flex h-dvh w-full flex-col bg-white sm:w-[26.5rem] sm:rounded-l-[2rem]"
          >
            <header className="flex items-center justify-between border-b border-black/5 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white"><ShoppingBag size={16}/></span>
                <b className="text-lg">{t.cart}</b>
              </div>
              <button aria-label={t.close} onClick={() => setDrawer(false)} className="rounded-full p-2.5 transition hover:bg-gray-100"><X size={20}/></button>
            </header>

            {items.length === 0 ? (
              <div className="grid flex-1 place-items-center px-6 text-center">
                <div>
                  <ShoppingBag size={40} className="mx-auto text-gray-300"/>
                  <p className="mt-4 text-gray-500">{t.emptyCart}</p>
                  <Link href="/catalog/" onClick={() => setDrawer(false)} className="btn btn-dark mt-6">{t.goCatalog}</Link>
                </div>
              </div>
            ) : (
              <>
                <div className="nice-scroll flex-1 overflow-y-auto px-6 py-4">
                  <ul className="grid gap-3">
                    {items.map(({p, c}) => (
                      <li key={p.id} className="flex gap-3.5 rounded-3xl border border-black/5 p-3">
                        <Link href={`/product/${p.id}/`} onClick={() => setDrawer(false)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                          <ProductImageFrame src={p.images[0]} alt={p.name} sizes="80px" variant="compact" inStock={isInStock(p)} statusLabel={t.outOfStock}/>
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link href={`/product/${p.id}/`} onClick={() => setDrawer(false)} className="line-clamp-2 text-sm font-semibold">{p.name}</Link>
                          {!isInStock(p)&&<span className="mt-1 inline-flex rounded-md bg-gray-200 px-2 py-1 text-[10px] font-bold text-gray-600">{t.outOfStock}</span>}
                          <div className="mt-1 flex items-baseline gap-2">
                            <b className="text-sm">{priceOf(p)} AZN</b>
                            {p.newPrice !== null && <s className="text-xs text-gray-400">{p.price} AZN</s>}
                          </div>
                          <div className="mt-2 flex items-center gap-1.5">
                            <button aria-label="−" onClick={() => setQty(p.id, c.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 transition hover:border-black"><Minus size={13}/></button>
                            <span className="w-7 text-center text-sm font-bold">{c.qty}</span>
                            <button disabled={!isInStock(p)} aria-label={t.increase} onClick={() => setQty(p.id, c.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 transition hover:border-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"><Plus size={13}/></button>
                            <button aria-label={t.remove} onClick={() => remove(p.id)} className="ml-auto rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"><Trash2 size={16}/></button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <footer className="border-t border-black/5 px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-gray-500">{t.total}</span>
                    <b className="text-2xl tracking-tight">{total} AZN</b>
                  </div>
                  <Link href="/cart/" onClick={() => setDrawer(false)} className="btn btn-dark mt-4 w-full">{t.getLink} <ArrowRight size={17}/></Link>
                  <button onClick={() => setDrawer(false)} className="mt-2 w-full py-2 text-sm font-semibold text-gray-500 transition hover:text-black">{t.continueShopping}</button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
