'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {Check,ChevronDown} from 'lucide-react';

export type Option = {value: string; label: string};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  /** Rendered when no option matches `value`. */
  placeholder?: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Listbox that replaces the native <select> so the control can follow the site
 * design instead of the OS widget. Implements the WAI-ARIA collapsed listbox
 * pattern: roving focus stays on the button, the active option is advertised
 * through aria-activedescendant.
 */
export function Select({value, onChange, options, placeholder = '', label, icon, className = ''}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  const selected = options.findIndex(o => o.value === value);
  const current = selected >= 0 ? options[selected] : undefined;

  // Close on outside pointer or Escape, both while open only.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // Keep the highlighted option in view when navigating by keyboard.
  useEffect(() => {
    if (!open) return;
    list.current?.children[active]?.scrollIntoView({block: 'nearest'});
  }, [open, active]);

  const openAt = (index: number) => {
    setActive(index < 0 ? 0 : index);
    setOpen(true);
  };

  const commit = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      setOpen(false);
      return;
    }
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAt(selected);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commit(active);
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={label}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selected))}
        onKeyDown={onKeyDown}
        className="flex h-12 w-full items-center gap-2 rounded-2xl bg-white px-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-black"
      >
        {icon && <span className="shrink-0 text-gray-500">{icon}</span>}
        <span className={`flex-1 truncate ${current ? '' : 'text-gray-500'}`}>{current?.label ?? placeholder}</span>
        <ChevronDown size={17} className={`shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-72 overflow-y-auto overscroll-contain rounded-2xl border border-black/5 bg-white p-1.5 shadow-[0_12px_40px_rgba(0,0,0,.14)]"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onPointerEnter={() => setActive(i)}
                onClick={() => commit(i)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  i === active ? 'bg-gray-100' : ''
                } ${isSelected ? 'font-bold' : ''}`}
              >
                <span className="flex-1 truncate">{o.label}</span>
                {isSelected && <Check size={16} className="shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
