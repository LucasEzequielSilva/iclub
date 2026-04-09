"use client";

import { useCurrency } from "./CurrencyProvider";

export default function BlueDollarTicker() {
  const { blueRate, loading } = useCurrency();

  if (loading || !blueRate) return null;

  return (
    <div className="w-full bg-[#c462ab]/[0.06] border-b border-[#c462ab]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-center gap-2 sm:gap-3 text-xs">
        <span className="flex size-1.5 rounded-full bg-[#c462ab] animate-pulse" />
        <span className="text-[#c462ab] font-medium tabular-nums">
          Dólar Blue: ${new Intl.NumberFormat("de-DE").format(blueRate)}
        </span>
        <span className="text-slate-400 hidden sm:inline">·</span>
        <span className="text-slate-400 hidden sm:inline">
          Todos los precios se actualizan en tiempo real
        </span>
        <span className="text-slate-400 sm:hidden">
          · Actualizado
        </span>
      </div>
    </div>
  );
}
