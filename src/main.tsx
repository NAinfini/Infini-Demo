import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

type MswUnhandledRequestMode = "bypass" | "warn" | "error";

function resolveUnhandledRequestMode(): MswUnhandledRequestMode {
  const value = import.meta.env.VITE_MSW_UNHANDLED_REQUEST?.toLowerCase();
  if (value === "bypass" || value === "warn" || value === "error") {
    return value;
  }

  return "warn";
}

async function boot() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({ onUnhandledRequest: resolveUnhandledRequestMode() });
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void boot();
