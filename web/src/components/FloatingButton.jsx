function FloatingButton({ onClick, isOpen }) {
  return (
    <div className="fixed bottom-20 right-5 z-50">
      <button
        onClick={onClick}
        className={`w-14 h-14 rounded-full shadow-xl text-white text-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-blue-500 rotate-45"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        +
      </button>
    </div>
  );
}

export default FloatingButton;