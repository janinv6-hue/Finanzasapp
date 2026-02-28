import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";

function CategoriesPage() {
  const { categorias, addCategoria, deleteCategoria } = useFinance();
  const [tipoActivo, setTipoActivo] = useState("gasto");
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const lista =
    tipoActivo === "gasto"
      ? categorias.gastos
      : categorias.ingresos;

  return (
    <div className="p-5 space-y-6">

      {/* SEGMENT CONTROL */}
      <div className="bg-gray-200 p-1 rounded-full flex">
        <button
          onClick={() => setTipoActivo("gasto")}
          className={`flex-1 py-2 rounded-full transition ${
            tipoActivo === "gasto"
              ? "bg-red-500 text-white shadow"
              : "text-gray-600"
          }`}
        >
          💸 Gastos
        </button>

        <button
          onClick={() => setTipoActivo("ingreso")}
          className={`flex-1 py-2 rounded-full transition ${
            tipoActivo === "ingreso"
              ? "bg-green-500 text-white shadow"
              : "text-gray-600"
          }`}
        >
          💰 Ingresos
        </button>
      </div>

      {/* INPUT NUEVA CATEGORÍA */}
      <div className="flex gap-3">
        <input
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          className="flex-1 p-3 rounded-xl border bg-white shadow-sm"
        />

        <button
          onClick={() => {
            if (!nuevaCategoria.trim()) return;
            addCategoria(tipoActivo, nuevaCategoria);
            setNuevaCategoria("");
          }}
          className="px-5 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-3">
        {lista.map((cat) => (
          <div
            key={cat}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center transition hover:shadow-md"
          >
            <span className="font-medium text-gray-800">
              {cat}
            </span>

            <button
              onClick={() => deleteCategoria(tipoActivo, cat)}
              className="text-red-500 text-sm hover:scale-105 transition"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;