"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/1173747929?text=" +
  encodeURIComponent("Hola! Vi la promo de iPads, quiero más info.");

export default function PromoModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem("promo_seen")) return;
    } catch {}
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setClosing(true);
    try { sessionStorage.setItem("promo_seen", "1"); } catch {}
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 300);
  };

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c462ab 0%, #9a4a87 50%, transparent 70%)" }}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100 animate-[fadeSlideIn_0.5s_ease-out]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="cursor-pointer absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-white rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Cerrar"
        >
          <HiOutlineXMark className="size-5" />
        </button>

        {/* Image */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block relative group">
          <Image
            src="/ipads/promo-ipad.png"
            alt="Promo iPads Seminuevos - iCLUB Store"
            width={400}
            height={710}
            className="w-full h-auto"
            priority
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#c462ab]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <FaWhatsapp className="size-10 text-white" />
            <span className="text-white font-bold text-lg uppercase tracking-wide">Pedir lista</span>
          </div>
        </a>

        {/* Bottom CTA bar */}
        <div className="bg-[#c462ab] px-4 py-3 flex items-center justify-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-semibold text-sm hover:underline"
          >
            <FaWhatsapp className="size-4" />
            Consultá por WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
