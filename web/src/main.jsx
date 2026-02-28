import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </React.StrictMode>
);