import { useEffect, useState } from "react";

function Modal({ isOpen, onClose, title, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setVisible(false), 200);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-md bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* CONTENT */}
      <div
        className={`relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all duration-300 ${
          isOpen
            ? "translate-y-0 scale-100"
            : "translate-y-10 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;