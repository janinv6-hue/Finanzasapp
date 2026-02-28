const STORAGE_KEY = "mis_finanzas_transacciones";

export function saveTransactions(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadTransactions() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

const CATEGORIAS_KEY = "mis_finanzas_categorias";

export function saveCategorias(data) {
  localStorage.setItem(CATEGORIAS_KEY, JSON.stringify(data));
}

export function loadCategorias() {
  const stored = localStorage.getItem(CATEGORIAS_KEY);
  return stored ? JSON.parse(stored) : null;
}