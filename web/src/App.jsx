import { useState } from "react";
import AnalysisPage from "./features/analysis/AnalysisPage";
import TransactionsPage from "./features/transactions/TransactionsPage";
import CategoriesPage from "./features/categories/CategoriesPage";
import AddTransactionForm from "./features/transactions/AddTransactionForm";
import Modal from "./components/Modal";
import FloatingButton from "./components/FloatingButton";
import { useFinance } from "./context/FinanceContext";
import BottomNav from "./components/BottomNav";

function App() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categorias, addTransaction } = useFinance();

 return (
  <div className="min-h-screen bg-gray-100 pb-20">

    {/* CONTENIDO PRINCIPAL */}
    <div className="relative overflow-hidden">
  <div
    key={activeTab}
    className="animate-tabTransition"
  >
    {activeTab === "analysis" && <AnalysisPage />}
    {activeTab === "transactions" && <TransactionsPage />}
    {activeTab === "categories" && <CategoriesPage />}
  </div>
</div>

    {/* FAB */}
    <FloatingButton
  isOpen={isModalOpen}
  onClick={() => setIsModalOpen(true)}
/>

    {/* MODAL */}
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Nueva Transacción"
    >
      <AddTransactionForm
        categorias={categorias}
        onAdd={(nueva) => {
          addTransaction(nueva);
          setIsModalOpen(false);
        }}
      />
    </Modal>

    {/* BOTTOM NAV */}
    <BottomNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />

  </div>
);
}

export default App;