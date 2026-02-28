import { useMemo, useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import { calcularBalance } from "../../services/financeService";
import FinanceChart from "../../components/FinanceChart";
import AnimatedNumber from "../../components/AnimatedNumber";
import { exportarExcel } from "../../services/exportService";
import MonthDropdown from "../../components/MonthDropdown";

function AnalysisPage() {
  const { transaccionesFiltradas, filtro } = useFinance();
  const meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const tituloPeriodo =
  filtro.tipo === "mes"
    ? `📅 ${meses[filtro.mes]} ${filtro.anio}`
    : filtro.tipo === "rango"
    ? "📅 Rango personalizado"
    : "📅 Todas las transacciones";

  const [animate, setAnimate] = useState(false);

useEffect(() => {
  setAnimate(false);
  const timeout = setTimeout(() => {
    setAnimate(true);
  }, 50);

  return () => clearTimeout(timeout);
}, [transaccionesFiltradas]);

  const resumen = useMemo(() => {
    return calcularBalance(transaccionesFiltradas);
  }, [transaccionesFiltradas]);

 return (
  <div>
    <MonthDropdown />
    {/* Encabezado del periodo */}
    <div className="flex justify-between items-center mb-2 px-4">
    </div>

    {/* Contenido animado */}
    <div
      className={`p-4 space-y-4 transition-all duration-500 ${
        animate
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
      }`}
    >
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">Balance Total</p>
        <h2
          className={`text-3xl font-bold ${
            resumen.balance >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          $<AnimatedNumber value={resumen.balance} />
        </h2>
      </div>

      {/* resto de cards */}

      <button
        onClick={() =>
          exportarExcel(transaccionesFiltradas, filtro)
        }
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold transition hover:bg-green-700"
      >
        📥 Exportar a Excel
      </button>

      <FinanceChart transacciones={transaccionesFiltradas} />
    </div>
  </div>
)};
export default AnalysisPage;