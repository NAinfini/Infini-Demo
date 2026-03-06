import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@mantine/core", "@mantine/hooks"],
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "@mantine/core": path.resolve(__dirname, "node_modules/@mantine/core"),
      "@mantine/hooks": path.resolve(__dirname, "node_modules/@mantine/hooks"),
      "@mantine/notifications": path.resolve(__dirname, "node_modules/@mantine/notifications"),
      "@mantine/dates": path.resolve(__dirname, "node_modules/@mantine/dates"),
      "motion": path.resolve(__dirname, "node_modules/motion"),
      "@infini-dev-kit/api-client": path.resolve(__dirname, "../Infini-Dev-Kit/api-client"),
      "@infini-dev-kit/frontend": path.resolve(__dirname, "../Infini-Dev-Kit/frontend"),
      "@infini-dev-kit/utils": path.resolve(__dirname, "../Infini-Dev-Kit/utils"),
    },
  },
});
