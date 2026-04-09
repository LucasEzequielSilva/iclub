import type { Product } from "@/data/products";

const conditionStyles: Record<
  Product["condition"],
  { classes: string; dot: string }
> = {
  Sellado: {
    classes: "bg-[#c462ab]/10 text-[#c462ab] border-[#c462ab]/20",
    dot: "bg-[#c462ab]",
  },
  "A+": {
    classes: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dot: "bg-blue-500",
  },
  A: {
    classes: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    dot: "bg-yellow-500",
  },
};

export default function ProductHeader({ product }: { product: Product }) {
  const style = conditionStyles[product.condition];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border ${style.classes}`}
        >
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          {product.condition}
        </span>
        <span className="text-xs text-slate-400">
          {product.capacity} &middot; {product.color}
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-900 leading-tight text-balance">
        {product.category === "android" || product.category === "consolas" ? product.name : `Apple ${product.name}`}
      </h1>
    </div>
  );
}
