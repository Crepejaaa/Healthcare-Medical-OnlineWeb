'use client';

interface ResultModalProps {
  isOpen: boolean;
  type: 'success' | 'warning' | 'emergency';
  icon: string;
  title: string;
  message: string;
  onClose: () => void;
}

export default function ResultModal({ isOpen, type, icon, title, message, onClose }: ResultModalProps) {
  const titleColorClass =
    type === 'emergency'
      ? 'text-red-600 pulse-alert'
      : type === 'warning'
        ? 'text-orange-600'
        : 'text-green-600';

  return (
    <div
      className={`modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="text-6xl mb-4 transition-transform hover:scale-110">{icon}</div>
        <h4 className={`text-2xl font-bold mb-3 ${titleColorClass}`}>{title}</h4>
        <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-line">{message}</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all btn-ripple active:scale-95 cursor-pointer"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
