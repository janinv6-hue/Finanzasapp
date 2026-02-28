import { useFinance } from "../../context/FinanceContext";

function TransactionsPage() {
  const { transaccionesFiltradas, deleteTransaction } = useFinance();

  if (transaccionesFiltradas.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        📝 No hay transacciones aún
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {transaccionesFiltradas.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-gray-800">
              {t.tipo === "ingreso" ? "💰 Ingreso" : "💸 Gasto"}
            </p>

            <p className="text-sm text-gray-500">
              {t.categoria} •{" "}
              {new Date(t.fecha).toLocaleDateString("es-MX")}
            </p>

            {t.descripcion && (
              <p className="text-xs text-gray-400 mt-1">
                {t.descripcion}
              </p>
            )}
          </div>

          <div className="text-right">
            <p
              className={`font-bold ${
                t.tipo === "ingreso"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {t.tipo === "ingreso" ? "+" : "-"}$
              {t.monto.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </p>

            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-xs text-red-500 mt-1"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionsPage;