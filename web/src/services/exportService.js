import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import { calcularBalance } from "./financeService";

export const exportarExcel = (transacciones, filtro) => {
  if (!transacciones.length) return;

  const gastos = transacciones.filter(t => t.tipo === "gasto");
  const ingresos = transacciones.filter(t => t.tipo === "ingreso");
  const resumen = calcularBalance(transacciones);

  const wb = XLSX.utils.book_new();
  const ws = {};

  const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  const tituloPeriodo =
    filtro?.tipo === "mes"
      ? `${meses[filtro.mes]} ${filtro.anio}`
      : "Reporte personalizado";

  let row = 1;

  const writeCell = (address, value, style = {}) => {
    ws[address] = { v: value, s: style };
  };

  const currencyStyle = {
    numFmt: '"$"#,##0.00'
  };

  const headerStyle = {
    font: { bold: true, sz: 14 }
  };

  const sectionHeaderStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "DDDDDD" } }
  };

  // =============================
  // TÍTULO
  // =============================
  writeCell(`A${row}`, "REPORTE FINANCIERO", {
    font: { bold: true, sz: 18 }
  });
  row += 2;

  writeCell(`A${row}`, `Periodo: ${tituloPeriodo}`, headerStyle);
  row += 2;

  // =============================
  // GASTOS
  // =============================
  writeCell(`A${row}`, "GASTOS", {
    font: { bold: true, sz: 14 },
    fill: { fgColor: { rgb: "FFC7CE" } }
  });
  row++;

  ["Fecha","Importe","Descripción","Categoría"].forEach((h, i) => {
    writeCell(
      `${String.fromCharCode(65+i)}${row}`,
      h,
      sectionHeaderStyle
    );
  });

  row++;

  gastos.forEach(t => {
    writeCell(`A${row}`, new Date(t.fecha).toLocaleDateString("es-MX"));
    writeCell(`B${row}`, t.monto, currencyStyle);
    writeCell(`C${row}`, t.descripcion || "");
    writeCell(`D${row}`, t.categoria);
    row++;
  });

  writeCell(`A${row}`, "Total Gastos", headerStyle);
  writeCell(`B${row}`, resumen.gastos, {
    ...currencyStyle,
    font: { bold: true }
  });

  row += 3;

  // =============================
  // INGRESOS
  // =============================
  writeCell(`A${row}`, "GANANCIAS", {
    font: { bold: true, sz: 14 },
    fill: { fgColor: { rgb: "C6EFCE" } }
  });

  row++;

  ["Fecha","Importe","Descripción","Categoría"].forEach((h, i) => {
    writeCell(
      `${String.fromCharCode(65+i)}${row}`,
      h,
      sectionHeaderStyle
    );
  });

  row++;

  ingresos.forEach(t => {
    writeCell(`A${row}`, new Date(t.fecha).toLocaleDateString("es-MX"));
    writeCell(`B${row}`, t.monto, currencyStyle);
    writeCell(`C${row}`, t.descripcion || "");
    writeCell(`D${row}`, t.categoria);
    row++;
  });

  writeCell(`A${row}`, "Total Ingresos", headerStyle);
  writeCell(`B${row}`, resumen.ingresos, {
    ...currencyStyle,
    font: { bold: true }
  });

  row += 3;

  // =============================
  // BALANCE FINAL
  // =============================
  writeCell(`A${row}`, "BALANCE FINAL", {
    font: { bold: true, sz: 14 }
  });

  writeCell(`B${row}`, resumen.balance, {
    ...currencyStyle,
    font: { bold: true, sz: 14 },
    fill: {
      fgColor: {
        rgb: resumen.balance >= 0 ? "C6EFCE" : "FFC7CE"
      }
    }
  });

  ws["!cols"] = [
    { wch: 12 },
    { wch: 15 },
    { wch: 30 },
    { wch: 20 }
  ];

  ws["!ref"] = `A1:D${row}`;

  XLSX.utils.book_append_sheet(wb, ws, "Finanzas");

  // =============================
  // HOJA RESUMEN
  // =============================
  const wsResumen = {};
  let r = 1;

  const writeResumen = (addr, value, style = {}) => {
    wsResumen[addr] = { v: value, s: style };
  };

  writeResumen(`A${r}`, "RESUMEN FINANCIERO", {
    font: { bold: true, sz: 18 }
  });

  r += 2;

  writeResumen(`A${r}`, "Total Ingresos");
  writeResumen(`B${r}`, resumen.ingresos, currencyStyle);
  r++;

  writeResumen(`A${r}`, "Total Gastos");
  writeResumen(`B${r}`, resumen.gastos, currencyStyle);
  r++;

  writeResumen(`A${r}`, "Balance Final", {
    font: { bold: true }
  });

  writeResumen(`B${r}`, resumen.balance, {
    ...currencyStyle,
    font: { bold: true, sz: 14 },
    fill: {
      fgColor: {
        rgb: resumen.balance >= 0 ? "C6EFCE" : "FFC7CE"
      }
    }
  });

  r += 3;

  writeResumen(`A${r}`, "Tipo", { font: { bold: true } });
  writeResumen(`B${r}`, "Monto", { font: { bold: true } });
  r++;

  writeResumen(`A${r}`, "Ingresos");
  writeResumen(`B${r}`, resumen.ingresos, currencyStyle);
  r++;

  writeResumen(`A${r}`, "Gastos");
  writeResumen(`B${r}`, resumen.gastos, currencyStyle);

  wsResumen["!cols"] = [
    { wch: 20 },
    { wch: 18 }
  ];

  wsResumen["!ref"] = `A1:B${r}`;

  XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");

  // =============================
  // EXPORTAR
  // =============================
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream"
  });

  saveAs(blob, `Finanzas_${tituloPeriodo}.xlsx`);
};