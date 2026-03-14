# AGENTS.md — Machine-Readable Demo Reference

> **This file is for AI coding agents.** Read this first before modifying any code in this repository.

## Repository Identity

- **Name:** Infini Demo
- **Type:** Showcase app for the Infini Design System & Dev Kit
- **Framework:** React 19 + TypeScript 5.9 + Vite 7
- **UI Library:** Mantine 7 + Infini Dev Kit components
- **API Mocking:** MSW 2 (Mock Service Worker)
- **Package manager:** pnpm (workspace linked to Infini-Dev-Kit)

## Relationship to Infini Dev Kit

This app consumes `@infini-dev-kit/*` packages from the sibling `../Infini-Dev-Kit/` directory via TypeScript path aliases in `tsconfig.app.json` and Vite aliases in `vite.config.ts`.

**The Dev Kit is the source of truth for themes, components, hooks, and utilities.** This repo is a consumer — it should never duplicate or override Dev Kit logic.

## Commands

```
pnpm dev        # Start dev server (localhost:5173)
pnpm build      # tsc -b && vite build
pnpm preview    # Serve production bundle locally
```

## File Index

### Root

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point |
| `vite.config.ts` | Vite config with `@infini-dev-kit/*` path aliases |
| `tsconfig.app.json` | TypeScript config with `@infini-dev-kit/*` path aliases |
| `tsconfig.json` | Root tsconfig (references app + node) |
| `eslint.config.js` | ESLint flat config |
| `package.json` | Dependencies and scripts |
| `README.md` | Human-readable documentation |
| `AGENTS.md` | This file — agent-readable reference |

### src/ — Application Source

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component — theme switching, page routing, View Transitions |
| `src/main.tsx` | Entry point — MSW bootstrap + React mount |
| `src/index.css` | Global styles (scrollbar, view transitions, motion-off) |

### src/mocks/ — MSW Mock API

| File | Purpose |
|------|---------|
| `src/mocks/browser.ts` | MSW browser worker setup |
| `src/mocks/handlers.ts` | Mock API route handlers (6 endpoints) |

**Mock endpoints:**

| Route | Method | Scenario |
|-------|--------|----------|
| `/api/users` | GET | 200 — list of users |
| `/api/users/:id` | GET | 200 / 404 — single user or RFC 7807 error |
| `/api/validate` | POST | 400 — validation error with field-level errors |
| `/api/protected` | GET | 401 — unauthorized error |
| `/api/slow` | GET | 200 after 3s delay — timeout testing |
| `/api/retry` | GET | 429/200 alternating — retry logic testing |

### src/pages/ — Page Components

| File | Purpose |
|------|---------|
| `src/pages/index.ts` | Barrel exports for pages |
| `src/pages/ApiLab.tsx` | Interactive API client with request/response traces |
| `src/pages/ThemeCharts.tsx` | Standalone ECharts visualization component (used by ZoneCharts) |

### src/pages/theme-lab/ — ThemeLab Zone System

ThemeLab is organized into **zones** — each zone showcases a different slice of the design system. The UI groups multiple zones into a smaller set of top-level tabs so the navigation stays compact.

| File | Purpose |
|------|---------|
| `ThemeLab.tsx` | Zone orchestrator — groups zones into a smaller tab set |
| `types.ts` | `ZoneProps` interface (shared by all zones) |
| `data.ts` | Mock data for tables, trees, cascaders |
| `shared.module.css` | Cross-zone shared CSS module |

**Zone components:**

| Zone | File | What It Shows |
|------|------|---------------|
| Hero | `ZoneHero.tsx` | Intro banner |
| Foundation | `ZoneFoundation.tsx` | Palette, typography, spacing |
| Buttons | `ZoneButtons.tsx` | Buttons and toggles (depth, progress, social, depth toggle) |
| Inputs | `ZoneInputs.tsx` | Text inputs, selects, sliders, switches |
| Controls | `ZoneControls.tsx` | Color picker, tag input, date range picker |
| Navigation | `ZoneNavigation.tsx` | Tabs, breadcrumbs, pagination, steppers, sidebar |
| Feedback | `ZoneFeedback.tsx` | Alerts, notifications, modals, skeletons |
| DataDisplay | `ZoneDataDisplay.tsx` | Stat cards, timelines, tables, kanban, calendar |
| Layout | `ZoneLayout.tsx` | Page header, split view, responsive grid |
| Visual Effects | `ZoneVisualEffects.tsx` | Cards, backgrounds, text effects, borders |
| Extras | `ZoneExtras.tsx` | Confetti, reveal on scroll, command palette |
| Charts | `ZoneCharts.tsx` | ECharts visualizations |
| Motion | `ZoneMotion.tsx` | Spring / keyframe animations, parallax, stagger |
| Internals | `ZoneInternals.tsx` | Dev-facing tokens & contracts |

Each zone has a matching `Zone*.module.css` file for zone-specific styling.

**Current top-level tabs:** Foundation, Forms, Navigation, Feedback, Data & Charts, Effects, Internals.

## Import Path Patterns

### From Infini Dev Kit

These are the `@infini-dev-kit/*` imports used in this app. Path aliases are defined in `tsconfig.app.json` and `vite.config.ts`.

```ts
// Provider & context
import { KitApp, ThemeToolbar, useBridge, useThemeSnapshot } from "@infini-dev-kit/frontend/provider";

// Theme types
import type { ThemeId } from "@infini-dev-kit/frontend/theme/theme-specs";

// Components
import { RevealOnScroll, ScrollProgress } from "@infini-dev-kit/frontend/components";

// Hooks & variants
import { useThemeTransition } from "@infini-dev-kit/frontend/hooks";
import { getPageVariants } from "@infini-dev-kit/frontend/hooks/variants/page-variants";

// Mantine adapter
import { loadThemeFonts, preloadCommonFonts } from "@infini-dev-kit/frontend/theme/mantine/font-loader";

// Mantine residual CSS
import "@infini-dev-kit/frontend/theme/mantine/mantine-residual.css";

// ECharts adapter
import { buildEChartsTheme } from "@infini-dev-kit/frontend/theme/echarts/echarts-adapter";

// API client
import { ApiClientError, createApiClient } from "@infini-dev-kit/api-client";

// Utilities
import { createScrollReactiveVar, startViewTransition } from "@infini-dev-kit/utils";
import { contrastRatio, deriveHoverColor, pickReadableTextColor } from "@infini-dev-kit/utils/color";
import type { EffectiveMotionMode } from "@infini-dev-kit/utils/motion";
```

### Internal imports

```ts
// Pages
import { ApiLab, ThemeLab } from "./pages";

// Zone types
import type { ZoneProps } from "./types";

// Zone data
import { TABLE_DATA, TREE_DATA } from "./data";
```

## How to Modify This App

### Add a new zone to ThemeLab

1. Create `src/pages/theme-lab/ZoneYourName.tsx` implementing the `ZoneProps` interface
2. Create `src/pages/theme-lab/ZoneYourName.module.css` for zone-specific styles
3. Import and render the zone in `ThemeLab.tsx` (maintain zone order)
4. Update the zone table in this file

Zone template:
```tsx
import type { ZoneProps } from "./types";
import styles from "./ZoneYourName.module.css";

export function ZoneYourName({ zoneIndex }: ZoneProps) {
  return (
    <section className={styles.zone}>
      {/* zone content */}
    </section>
  );
}
```

### Add a new mock API endpoint

1. Add the handler in `src/mocks/handlers.ts`
2. Follow RFC 7807 format for error responses (type, title, status, detail, instance)
3. Update the mock endpoints table in this file

### Add a new page

1. Create `src/pages/YourPage.tsx`
2. Export from `src/pages/index.ts`
3. Add to `PAGE_ORDER` and routing logic in `App.tsx`
4. Add to `DemoPage` type if needed (defined in Dev Kit's ThemeToolbar)

## Path Alias Configuration

Aliases must be kept in sync between two files:

| File | Purpose |
|------|---------|
| `tsconfig.app.json` → `compilerOptions.paths` | TypeScript resolution |
| `vite.config.ts` → `resolve.alias` | Vite runtime resolution |

Both must point to the same directories in `../Infini-Dev-Kit/`.

## Agent Workflow Rules

When modifying this codebase, you **must** follow these practices:

### Track every file you touch

- Before making changes, list all files you intend to modify.
- After making changes, verify the app still compiles (`pnpm build`).
- If you modify imports from `@infini-dev-kit/*`, verify the path exists in the Dev Kit repo.
- When adding a new zone, update both `ThemeLab.tsx` and this AGENTS.md file.

### Verify before declaring done

- Run `pnpm build` — must succeed.
- If you modified a zone, visually verify under **at least two themes** and **two motion levels** (`full` and `off`).
- If you changed path aliases, verify both `tsconfig.app.json` and `vite.config.ts` are in sync.

### Keep files in sync

| When you change... | Also update... |
|---------------------|---------------|
| A zone component | `ThemeLab.tsx` rendering order |
| A page component | `src/pages/index.ts` barrel, `App.tsx` routing |
| A mock endpoint | `src/mocks/handlers.ts` |
| Path aliases | Both `tsconfig.app.json` AND `vite.config.ts` |
| Zone list | This AGENTS.md zone table |

### No orphaned files

- Every zone must be rendered in `ThemeLab.tsx`.
- Every page must be exported from `src/pages/index.ts`.
- Every mock handler must be registered in the `handlers` array.
- Delete files completely when removing — do not leave dead imports or commented-out references.
