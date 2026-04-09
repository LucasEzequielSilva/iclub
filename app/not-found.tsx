export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-slate-500 mb-8">Esta página no existe.</p>
      <a
        href="/"
        className="px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
}
