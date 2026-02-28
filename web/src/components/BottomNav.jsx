function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-40">
      <button
        onClick={() => setActiveTab("analysis")}
        className={`flex flex-col items-center text-xs ${
          activeTab === "analysis" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        📊
        Análisis
      </button>

      <button
        onClick={() => setActiveTab("transactions")}
        className={`flex flex-col items-center text-xs ${
          activeTab === "transactions" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        📝
        Historial
      </button>

      <button
        onClick={() => setActiveTab("categories")}
        className={`flex flex-col items-center text-xs ${
          activeTab === "categories" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        ⚙
        Categorías
      </button>
    </div>
  );
}

export default BottomNav;