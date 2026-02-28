import { useState } from "react";

function AddTransactionForm({ categorias, onAdd }) {
  const [tipo, setTipo] = useState("gasto");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [descripcion, setDescripcion] = useState("");

  const listaCategorias =
    tipo === "gasto"
      ? categorias.gastos
      : categorias.ingresos;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!monto || !categoria) return;

    onAdd({
      id: Date.now(),
      tipo,
      monto: parseFloat(monto),
      categoria,
      fecha,
      descripcion
    });

    setMonto("");
    setDescripcion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fadeIn"
    >
      {/* SEGMENT TIPO */}
      <div className="bg-gray-200 p-1 rounded-full flex shadow-inner">
        <button
          type="button"
          onClick={() => setTipo("gasto")}
          className={`flex-1 py-2 rounded-full transition ${
            tipo === "gasto"
              ? "bg-red-500 text-white shadow"
              : "text-gray-600"
          }`}
        >
          💸 Gasto
        </button>

        <button
          type="button"
          onClick={() => setTipo("ingreso")}
          className={`flex-1 py-2 rounded-full transition ${
            tipo === "ingreso"
              ? "bg-green-500 text-white shadow"
              : "text-gray-600"
          }`}
        >
          💰 Ingreso
        </button>
      </div>

      {/* CATEGORÍA */}
      <div>
        <label className="text-sm text-gray-500">
          Categoría
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full mt-1 p-3 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Selecciona categoría</option>
          {listaCategorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* MONTO */}
      <div>
        <label className="text-sm text-gray-500">
          Monto
        </label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="0.00"
          className="w-full mt-1 p-3 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* FECHA */}
      <div>
        <label className="text-sm text-gray-500">
          Fecha
        </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full mt-1 p-3 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div>
        <label className="text-sm text-gray-500">
          Descripción (opcional)
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: Uber al trabajo"
          className="w-full mt-1 p-3 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
          rows={2}
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
      >
        Agregar Transacción
      </button>
    </form>
  );
}

export default AddTransactionForm;