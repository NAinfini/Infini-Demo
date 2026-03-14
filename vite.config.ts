import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const CSP_BASE = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "worker-src 'self' blob:",
];

const META_CSP_BASE = CSP_BASE.filter((directive) => !directive.startsWith("frame-ancestors "));

const DEV_CSP = [
  ...CSP_BASE,
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' ws: wss:",
].join("; ");

const DEV_META_CSP = [
  ...META_CSP_BASE,
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' ws: wss:",
].join("; ");

const PROD_CSP = [
  ...CSP_BASE,
  "script-src 'self'",
  "connect-src 'self'",
].join("; ");

const PROD_META_CSP = [
  ...META_CSP_BASE,
  "script-src 'self'",
  "connect-src 'self'",
].join("; ");

const COMMON_HEADERS: Record<string, string> = {
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: "infini-demo-csp-meta",
      transformIndexHtml() {
        return [
          {
            attrs: {
              content: command === "serve" ? DEV_META_CSP : PROD_META_CSP,
              "http-equiv": "Content-Security-Policy",
            },
            injectTo: "head",
            tag: "meta",
          },
        ];
      },
    },
  ],
  server: {
    cors: false,
    headers: { ...COMMON_HEADERS, "Content-Security-Policy": DEV_CSP },
    fs: {
      allow: [".."],
    },
  },
  preview: {
    headers: { ...COMMON_HEADERS, "Content-Security-Policy": PROD_CSP },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@mantine/core", "@mantine/hooks"],
    alias: [
      { find: "react", replacement: path.resolve(__dirname, "node_modules/react") },
      { find: "react-dom", replacement: path.resolve(__dirname, "node_modules/react-dom") },
      { find: "@mantine/core", replacement: path.resolve(__dirname, "node_modules/@mantine/core") },
      { find: "@mantine/hooks", replacement: path.resolve(__dirname, "node_modules/@mantine/hooks") },
      { find: "@mantine/notifications", replacement: path.resolve(__dirname, "node_modules/@mantine/notifications") },
      { find: "@mantine/dates", replacement: path.resolve(__dirname, "node_modules/@mantine/dates") },
      { find: "motion", replacement: path.resolve(__dirname, "node_modules/motion") },

      // Backward-compatible bridge for the pre-workspace Dev Kit import surface.
      {
        find: "@infini-dev-kit/frontend/theme/tokens/mantine-residual.css",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/adapter-mantine/mantine-residual.css"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/tokens/mantine-variables",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/adapter-mantine/mantine-variables.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/tokens/locale-typography",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/adapter-mantine/locale-typography.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/theme-overrides",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/adapter-mantine/theme-overrides.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/tokens/control-glow",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/tokens/control-glow.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/tokens/font-loader",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/tokens/font-loader.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/theme-provider-bridge",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/theme-provider-bridge.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/theme-specs",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/theme-specs.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/theme-types",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/theme-types.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/motion-types",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/react/motion-types.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/theme/echarts",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core/echarts"),
      },
      {
        find: "@infini-dev-kit/frontend/components",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/react/components/index.ts"),
      },
      {
        find: "@infini-dev-kit/frontend/hooks",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/react/hooks/index.ts"),
      },
      {
        find: "@infini-dev-kit/frontend",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/react/index.ts"),
      },

      // Direct workspace package aliases for Dev Kit internals.
      {
        find: "@infini-dev-kit/api-client",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/api-client"),
      },
      {
        find: "@infini-dev-kit/utils",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/utils"),
      },
      {
        find: "@infini-dev-kit/react",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/react"),
      },
      {
        find: "@infini-dev-kit/theme-core",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/theme-core"),
      },
      {
        find: "@infini-dev-kit/adapter-mantine",
        replacement: path.resolve(__dirname, "../Infini-Dev-Kit/packages/adapter-mantine"),
      },
    ],
  },
}));
