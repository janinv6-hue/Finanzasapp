import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { filtrarPorFecha } from "../services/financeService";
import {
  loadTransactions,
  saveTransactions,
  loadCategorias,
  saveCategorias,
} from "../utils/storage";
import { CATEGORIAS_INICIALES } from "../constants/categorias";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // 🔹 Transacciones
  const [transacciones, setTransacciones] = useState(
    () => loadTransactions() || []
  );

  // 🔹 Categorías
  const [categorias, setCategorias] = useState(
    () => loadCategorias() || CATEGORIAS_INICIALES
  );

  // 🔹 Filtro global (mes actual por defecto)
  const [filtro, setFiltro] = useState(() => ({
    tipo: "mes",
    mes: new Date().getMonth(),
    anio: new Date().getFullYear(),
  }));

  // 🔄 Auto-actualizar si cambia el mes real
useEffect(() => {
  const checkMonthChange = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (
      filtro.tipo === "mes" &&
      (filtro.mes !== currentMonth || filtro.anio !== currentYear)
    ) {
      setFiltro({
        tipo: "mes",
        mes: currentMonth,
        anio: currentYear,
      });
    }
  };

  const interval = setInterval(checkMonthChange, 60000);

  return () => clearInterval(interval);
}, [filtro]);

  // 🔹 Persistencia
  useEffect(() => {
    saveTransactions(transacciones);
  }, [transacciones]);

  useEffect(() => {
    saveCategorias(categorias);
  }, [categorias]);

  // 🔹 Transacciones filtradas
  const transaccionesFiltradas = useMemo(() => {
    return filtrarPorFecha(transacciones, filtro);
  }, [transacciones, filtro]);

  // 🔹 Métodos

  const addTransaction = (nueva) => {
    setTransacciones((prev) => [nueva, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransacciones((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  const addCategoria = (tipo, nombre) => {
    setCategorias((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo], nombre],
    }));
  };

  const deleteCategoria = (tipo, nombre) => {
    setCategorias((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((c) => c !== nombre),
    }));
  };

  return (
    <FinanceContext.Provider
      value={{
        transacciones,
        transaccionesFiltradas,
        categorias,
        filtro,
        setFiltro,
        addTransaction,
        deleteTransaction,
        addCategoria,
        deleteCategoria,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);