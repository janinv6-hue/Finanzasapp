import { useState, useRef } from "react";
import { useFinance } from "../context/FinanceContext";

const meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function MonthDropdown() {
  const { filtro, setFiltro } = useFinance();
  const [open, setOpen] = useState(false);
  const touchStartX = useRef(null);

  if (filtro.tipo !== "mes") return null;

  const cambiarMes = (mes) => {
    setFiltro({
      tipo: "mes",
      mes,
      anio: filtro.anio
    });
    setOpen(false);
  };

  const cambiarAnio = (direccion) => {
    setFiltro({
      ...filtro,
      anio: filtro.anio + direccion
    });
  };

  // Swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) cambiarAnio(-1);   // swipe right
    if (diff < -50) cambiarAnio(1);   // swipe left

    touchStartX.current = null;
  };

  return (
    <div className="relative mb-3 z-50">
      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="px-6 py-2 rounded-full bg-white shadow-md border border-gray-200 flex items-center gap-2 transition hover:shadow-lg active:scale-95"
      >
        <span className="text-sm font-semibold text-gray-700">
          📅 {meses[filtro.mes]} {filtro.anio}
        </span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute top-14 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-4 animate-fadeIn z-50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Año selector */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => cambiarAnio(-1)}
              className="text-gray-400 hover:text-black"
            >
              ◀
            </button>

            <span className="font-semibold text-gray-700">
              {filtro.anio}
            </span>

            <button
              onClick={() => cambiarAnio(1)}
              className="text-gray-400 hover:text-black"
            >
              ▶
            </button>
          </div>

          {/* Meses */}
          <div className="grid grid-cols-3 gap-2">
            {meses.map((mes, index) => (
              <button
                key={mes}
                onClick={() => cambiarMes(index)}
                className={`text-xs px-2 py-2 rounded-lg transition ${
                  index === filtro.mes
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {mes.slice(0,3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthDropdown;