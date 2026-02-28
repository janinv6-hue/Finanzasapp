import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { agruparPorCategoria } from "../services/financeService";

function FinanceChart({ transacciones }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !transacciones?.length) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ingresosMap = {};
    const gastosMap = {};

    transacciones.forEach((t) => {
      if (t.tipo === "ingreso") {
        ingresosMap[t.categoria] =
          (ingresosMap[t.categoria] || 0) + t.monto;
      } else {
        gastosMap[t.categoria] =
          (gastosMap[t.categoria] || 0) + t.monto;
      }
    });

    const categorias = [
      ...new Set([
        ...Object.keys(ingresosMap),
        ...Object.keys(gastosMap),
      ]),
    ];

    const data = {
      labels: categorias,
      datasets: [
        {
          label: "Ingresos",
          data: categorias.map((c) => ingresosMap[c] || 0),
          backgroundColor: "#10B981",
          borderColor: "#ffffff",
          borderWidth: 2,
        },
        {
          label: "Gastos",
          data: categorias.map((c) => gastosMap[c] || 0),
          backgroundColor: "#EF4444",
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
          duration: 1000,
          easing: "easeOutQuart", // 👈 igual sensación que tu HTML
        },

        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || "";
                const value = context.parsed.y || 0;
                return `${label}: $${value.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}`;
              },
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value.toLocaleString("es-MX");
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [transacciones]);

  if (!transacciones?.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        📊 No hay datos
      </div>
    );
  }

  return (
    <div className="relative h-[280px] w-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default FinanceChart;