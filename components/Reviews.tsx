"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiStar, HiOutlineXMark, HiOutlinePencilSquare } from "react-icons/hi2";

interface Review {
  name: string;
  device: string;
  rating: number;
  comment?: string;
  date: string;
}

const INITIAL = 6;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <HiStar
          key={i}
          className={`size-3.5 ${i < count ? "text-yellow-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function ReviewFormModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canSubmit = name.trim() && device.trim() && rating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const now = new Date();
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    onSubmit({
      name: name.trim(),
      device: device.trim(),
      rating,
      comment: comment.trim() || undefined,
      date: `${months[now.getMonth()]} ${now.getFullYear()}`,
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Cerrar"
        >
          <HiOutlineXMark className="size-6" />
        </button>

        <div>
          <h3 className="text-xl font-medium text-slate-900">Dejá tu reseña</h3>
          <p className="text-sm text-slate-400 mt-1">Contanos tu experiencia con iCLUB.</p>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Puntuación</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="cursor-pointer p-0.5"
              >
                <HiStar className={`size-7 transition-colors ${star <= rating ? "text-yellow-400" : "text-slate-200 hover:text-slate-300"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c462ab]/50 text-sm"
        />

        {/* Device */}
        <input
          type="text"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          placeholder="Equipo comprado (ej: iPhone 14 Pro 128GB)"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c462ab]/50 text-sm"
        />

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comentario (opcional)"
          rows={3}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c462ab]/50 text-sm resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`cursor-pointer w-full py-3.5 rounded-full text-sm font-semibold transition-all ${
            canSubmit
              ? "bg-[#c462ab] text-white hover:bg-[#b0559a] active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          Enviar reseña
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function Reviews() {
  const [visible, setVisible] = useState(INITIAL);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load reviews from API on mount
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data: Review[]) => {
        if (Array.isArray(data)) {
          setAllReviews(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Auto-open modal if URL has #dejar-resena
  useEffect(() => {
    if (window.location.hash === "#dejar-resena") {
      setVisible(allReviews.length);
      setShowForm(true);
    }
  }, [allReviews.length]);

  const avg = allReviews.length > 0
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : "5.0";
  const expanded = visible >= allReviews.length;

  const handleSubmit = async (review: Review) => {
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
    } catch {}
    setAllReviews((prev) => [review, ...prev]);
  };

  return (
    <section id="resenas" className="py-20 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-3 text-balance">
              +500 equipos vendidos
            </h2>
            <p className="text-slate-500 text-pretty">
              Lo que dicen nuestros clientes.
            </p>
          </div>
          {allReviews.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-3xl font-bold text-slate-900">{avg}</span>
              <div>
                <Stars count={Math.round(Number(avg))} />
                <p className="text-xs text-slate-400 mt-0.5">{allReviews.length} reseñas</p>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        {allReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allReviews.slice(0, visible).map((review, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl p-5 space-y-3 hover:border-slate-300 transition-[border-color]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{review.name}</p>
                      <p className="text-xs text-slate-400">{review.date}</p>
                    </div>
                  </div>
                  <Stars count={review.rating} />
                </div>
                <p className="text-xs text-[#c462ab]/80 font-medium">
                  Compró: {review.device}
                </p>
                {review.comment && (
                  <p className="text-sm text-slate-500 leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : !loading ? (
          <p className="text-slate-400 text-center py-8">Sé el primero en dejar una reseña.</p>
        ) : null}

        {visible < allReviews.length ? (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible(allReviews.length)}
              className="cursor-pointer px-8 py-3.5 min-h-[44px] rounded-full border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-[transform,background-color] duration-150"
            >
              Ver todas las reseñas
            </button>
          </div>
        ) : allReviews.length > INITIAL && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible(INITIAL)}
              className="cursor-pointer px-8 py-3.5 min-h-[44px] rounded-full border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-[transform,background-color] duration-150"
            >
              Ver menos
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              window.history.replaceState(null, "", "#dejar-resena");
              setShowForm(true);
            }}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 text-sm transition-[border-color,background-color,color]"
          >
            <HiOutlinePencilSquare className="size-4" />
            Dejar una reseña
          </button>
        </div>

        {showForm && (
          <ReviewFormModal
            onClose={() => {
              setShowForm(false);
              window.history.replaceState(null, "", window.location.pathname);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </section>
  );
}
