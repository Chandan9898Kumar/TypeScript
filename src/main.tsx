import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeManager from "./Context/ThemeManager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <ThemeManager>
        <App />
      </ThemeManager>
    </main>
  </StrictMode>
);
