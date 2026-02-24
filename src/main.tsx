import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./theme-depth.css";
import "./theme-motion.css";
import App from './App.tsx'

async function boot() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void boot();
