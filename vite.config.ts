import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@infini-dev-kit/backend": path.resolve(__dirname, "../Infini-Dev-Kit/backend"),
      "@infini-dev-kit/frontend": path.resolve(__dirname, "../Infini-Dev-Kit/frontend"),
      "@infini-dev-kit/utils": path.resolve(__dirname, "../Infini-Dev-Kit/utils"),
    },
  },
});
