import { HiOutlineArrowRight } from "react-icons/hi2";

export default function TradeInBanner() {
  return (
    <section id="trade-in" className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          ¿Tenés un iPhone usado?
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Cotizá tu equipo en segundos y usalo como parte de pago para tu próximo iPhone.
        </p>
        <a
          href="/cotizador"
          className="inline-flex items-center gap-2 bg-[#c462ab] text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#b0559a] transition-all shadow-lg shadow-[#c462ab]/20 hover:shadow-[#c462ab]/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          Cotizar mi iPhone
          <HiOutlineArrowRight aria-hidden="true" className="size-5" />
        </a>
      </div>
    </section>
  );
}
