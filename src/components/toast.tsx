'use client';
import {AnimatePresence,motion} from 'framer-motion';
import {Check} from 'lucide-react';
import {useStore} from './store';

/** Bottom-centered stack of short-lived notifications. */
export function Toasts() {
  const {toasts} = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{opacity: 0, y: 16, scale: 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 8, scale: 0.96}}
            transition={{duration: 0.22, ease: 'easeOut'}}
            className="flex items-center gap-2.5 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(0,0,0,.35)]"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15"><Check size={12}/></span>
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
