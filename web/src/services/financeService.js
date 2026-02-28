// 🔹 Calcula ingresos, gastos y balance
export const calcularBalance = (transacciones) => {
  const ingresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .reduce((acc, t) => acc + t.monto, 0);

  const gastos = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((acc, t) => acc + t.monto, 0);

  return {
    ingresos,
    gastos,
    balance: ingresos - gastos,
  };
};

// 🔹 Agrupa por categoría (para gráfica futura)
export const agruparPorCategoria = (transacciones) => {
  const resultado = {};

  transacciones.forEach((t) => {
    if (!resultado[t.categoria]) {
      resultado[t.categoria] = {
        ingreso: 0,
        gasto: 0
      };
    }

    if (t.tipo === "ingreso") {
      resultado[t.categoria].ingreso += t.monto;
    } else {
      resultado[t.categoria].gasto += t.monto;
    }
  });

  return resultado;
};

// 🔹 Filtro por fecha (MES ACTUAL por defecto)
export const filtrarPorFecha = (transacciones, filtro) => {
  if (!filtro) return transacciones;

  if (filtro.tipo === "mes") {
    return transacciones.filter((t) => {
      const fecha = new Date(t.fecha);
      return (
        fecha.getMonth() === filtro.mes &&
        fecha.getFullYear() === filtro.anio
      );
    });
  }

  if (filtro.tipo === "rango") {
    if (!filtro.fechaInicio || !filtro.fechaFin)
      return transacciones;

    const inicio = new Date(filtro.fechaInicio);
    const fin = new Date(filtro.fechaFin);

    return transacciones.filter((t) => {
      const fecha = new Date(t.fecha);
      return fecha >= inicio && fecha <= fin;
    });
  }

  return transacciones;
};