type OverlayProps = {
  inStock: boolean;
  label: string;
  compact?: boolean;
};

export function StockOverlay({inStock, label, compact = false}: OverlayProps) {
  return (
    <span
      aria-hidden={inStock}
      className={`pointer-events-none absolute inset-0 z-10 grid place-items-center transition-opacity duration-500 ease-out ${
        inStock ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span
        className={`max-w-[calc(100%-1rem)] border border-white/15 bg-black/70 text-center font-bold leading-tight text-white shadow-[0_10px_30px_rgba(0,0,0,.28)] backdrop-blur-md transition duration-500 ease-out ${
          compact ? 'rounded-lg px-2.5 py-1.5 text-[10px]' : 'rounded-xl px-4 py-2.5 text-xs sm:text-sm'
        } ${inStock ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {label}
      </span>
    </span>
  );
}

export function stockImageClass(inStock: boolean): string {
  return `transition-[filter,transform] duration-700 ease-out ${
    inStock ? 'grayscale-0 contrast-100 brightness-100' : 'grayscale contrast-[.88] brightness-[.92]'
  }`;
}
