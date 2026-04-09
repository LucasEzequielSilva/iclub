"use client";

import { FaWhatsapp } from "react-icons/fa";
import { formatPrice, getWhatsAppLink, type Product } from "@/data/products";

export default function StickyBottomBar({ product }: { product: Product }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-slate-900 font-medium truncate">
            {product.name} {product.capacity}
          </p>
          <p className="text-lg text-slate-900 font-semibold">
            {formatPrice(product.price)}
          </p>
        </div>
        <a
          href={getWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer shrink-0 flex items-center gap-2 px-5 py-3 min-h-[44px] bg-[#c462ab] hover:bg-[#b0559a] active:bg-[#9a4a87] text-white rounded-full text-sm font-semibold transition-colors"
        >
          <FaWhatsapp className="w-5 h-5" />
          Consultar
        </a>
      </div>
    </div>
  );
}
