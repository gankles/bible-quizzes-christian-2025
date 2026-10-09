'use client';

export default function PrintButton({ label = 'Download PDF' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors border border-white/20 text-sm font-semibold text-white"
    >
      {label}
    </button>
  );
}
