<div align="center">

# ✦ Infini Demo ✦

**Interactive showcase for the Infini Design System & Dev Kit**

> **AI agents:** Read [`AGENTS.md`](./AGENTS.md) first — it has a machine-readable file index, import patterns, and modification guides.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Mantine](https://img.shields.io/badge/Mantine-7-339AF0?logo=mantine&logoColor=white)](https://mantine.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

<br/>

> A living reference app — every theme, component, animation, and API pattern in the Infini ecosystem, runnable in one place.

</div>

---

## 🖼️ Preview

<div align="center">

<!-- Replace these with actual screenshots after running the app -->

| ThemeLab — Default | ThemeLab — Cyberpunk | ApiLab |
|:--:|:--:|:--:|
| ![ThemeLab Default](docs/preview-theme-default.png) | ![ThemeLab Cyberpunk](docs/preview-theme-cyberpunk.png) | ![ApiLab](docs/preview-apilab.png) |

<sub>📸 <em>Screenshots not yet captured — run the app and add them to <code>docs/</code></em></sub>

</div>

---

## 🧭 What is this?

Infini Demo is a **two-page** React app that lets you see and interact with everything the Infini platform offers:

<table>
<tr>
<td width="50%">

### 🎨 ThemeLab

Visual playground for the design system — colors, typography, spacing, controls, data components, charts, motion, and more — all rendered **live** under any selected theme.

</td>
<td width="50%">

### 🔌 ApiLab

Interactive API client that fires real (mocked) HTTP requests and displays request/response traces — error handling, retries, and distributed trace context.

</td>
</tr>
</table>

---

## ⚡ Key Capabilities

| | Feature | Description |
|:--|:--------|:------------|
| 🎭 | **Multi-theme switching** | Swap between all 6 theme variants (`default`, `chibi`, `cyberpunk`, `neu-brutalism`, `black-gold`, `red-gold`) at runtime — fonts, colors, shadows, and motion contracts all update instantly |
| 🎬 | **Motion system** | Four motion levels (`off` · `minimum` · `reduced` · `full`) cascade through every animation via CSS custom properties |
| ✨ | **View Transitions** | Smooth cross-fade when switching themes, powered by the View Transition API |
| 📜 | **Scroll-reactive vars** | Certain themes inject `--scroll-y` into `:root` to drive parallax and glitch effects |
| 🧪 | **MSW mocking** | Deterministic API responses — success, validation (400), auth (401), timeouts, retries — no backend needed |
| 🔗 | **Trace context** | Every API call carries a `traceparent` header, viewable in the ApiLab response log |

---

## 🏗️ How it works

```
┌──────────────────────────────────────────────────────────┐
│  App.tsx                                                 │
│                                                          │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  KitApp    │  │ ThemeToolbar │  │  Page Router     │  │
│  │  (provider)│  │ (switcher)   │  │  (AnimateP.)     │  │
│  └─────┬──────┘  └──────┬───────┘  └────────┬─────────┘  │
│        │                │                   │            │
│        ▼                ▼                   ▼            │
│  Infini Dev Kit    Theme state         ThemeLab / ApiLab │
│  (bridge, theme,   (reactive,          (10 zones /       │
│   motion, fonts)    CSS vars)           API scenarios)    │
└──────────────────────────────────────────────────────────┘
```

1. **`main.tsx`** boots MSW (in dev) then mounts the React tree
2. **`KitApp`** wraps the app with the theme bridge — a reactive store holding theme ID, motion preferences, and resolved design tokens
3. **`ThemeToolbar`** picks theme + motion level → triggers a View Transition, dynamically loads fonts, enables scroll-reactive CSS vars
4. **`ThemeLab`** renders **14 zones**, each showcasing a slice of the design system:

   | Zone | What it shows |
   |:-----|:--------------|
   | 🏠 Hero | Intro banner, headline effects, magnetic elements |
   | 🎨 Foundation | Palette, typography, spacing, counters, borders |
   | 🔘 Buttons | Button variants (motion, depth, shimmer, liquid, glitch, progress, social) |
   | ✏️ Inputs | Text inputs, selects, sliders, switches |
   | 🎛️ Controls | Color picker, tag input, date range picker |
   | 🧭 Navigation | Tabs, marquee, stepper |
   | 💬 Feedback | Number ticker, result states, ring progress |
   | 📊 Data Display | Stat cards, timelines, tables, kanban, calendar |
   | 📐 Layout | Page header, split view, responsive grid |
   | ✨ Visual Effects | Cards, backgrounds, text effects, borders, code blocks |
   | 🎁 Extras | Confetti, reveal on scroll, command palette |
   | 📈 Charts | ECharts visualizations, theme-aware |
   | 🎬 Motion | Spring / keyframe animations, parallax, stagger, cursor |
   | 🔧 Internals | Dev-facing tokens & contracts |

5. **`ApiLab`** fires requests against MSW handlers, displaying raw traces and parsed responses

---

## 🧰 Tech Stack

<div align="center">

| | Technology | Version | Role |
|:--|:----------|:--------|:-----|
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="16"/> | React | 19 | UI framework |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="16"/> | TypeScript | 5.9 | Type safety |
| <img src="https://cdn.simpleicons.org/vite/646CFF" width="16"/> | Vite | 7 | Build tool |
| <img src="https://cdn.simpleicons.org/mantine/339AF0" width="16" /> | Mantine | 7 | Component library |
| 🎬 | Motion | 12 | Animations (Framer Motion) |
| <img src="https://cdn.simpleicons.org/apacheecharts/AA344D" width="16"/> | ECharts | 6 | Data visualization |
| 🔷 | Tabler Icons | 3 | Icon set |
| 🧪 | MSW | 2 | API mocking |
| 📦 | Infini Dev Kit | workspace | Design system + utilities |

</div>

---

## 📋 Prerequisites

- **Node.js** >= 20
- **pnpm** — this is a workspace monorepo (`workspace:*` deps won't resolve with npm)
- The parent monorepo (**Infini-Dev-Kit**) must be set up first so `@infini-dev-kit/*` packages are available

---

## 🚀 Getting Started

```bash
# 1 · Clone the repo (and the sibling Infini-Dev-Kit)
git clone <repo-url> Infini-Demo
git clone <dev-kit-url> Infini-Dev-Kit   # must sit next to Infini-Demo

# 2 · Install dependencies
cd Infini-Demo
pnpm install

# 3 · Start the demo app
pnpm dev
```

Dev server starts at **`http://localhost:5173`**.

### Build for production

```bash
pnpm build     # tsc -b && vite build
pnpm preview   # serve production bundle locally
```

### Security defaults

- Dev and preview responses include baseline security headers (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `COOP`).
- CSP is configured to allow local module scripts, HMR websocket connections, and Google Fonts used by theme font loading.
- MSW unhandled requests default to `error` in development. To override explicitly, set `VITE_MSW_UNHANDLED_REQUEST=warn` or `VITE_MSW_UNHANDLED_REQUEST=bypass`.
- For production deployment, mirror these headers at the edge/CDN and add `Strict-Transport-Security` on HTTPS hosts.

---

## 📁 Project Structure

```
src/
├── App.tsx                    # 🏠 Root — theme switching, page routing, transitions
├── main.tsx                   # ⚡ Entry — MSW bootstrap + React mount
├── index.css                  # 🎨 Global styles (scrollbar, view transitions)
├── mocks/
│   ├── browser.ts             # 🧪 MSW browser worker setup
│   └── handlers.ts            # 📡 Mock API route handlers
└── pages/
    ├── ApiLab.tsx              # 🔌 API testing interface
    ├── index.ts                # 📦 Page barrel exports
    └── theme-lab/
        ├── ThemeLab.tsx        # 🎯 Zone orchestrator
        ├── data.ts             # 📊 Mock data (tables, trees, cascaders)
        ├── types.ts            # 🔷 Shared ZoneProps interface
        ├── shared.module.css   # 🎨 Cross-zone CSS module
        ├── Zone*.tsx           # 🧩 14 zone components
        └── Zone*.module.css    # 💅 Per-zone CSS modules
```

---

## 📸 Adding Screenshots

To populate the preview section above:

```bash
# 1. Run the dev server
pnpm dev

# 2. Take screenshots of:
#    - ThemeLab with default theme  →  docs/preview-theme-default.png
#    - ThemeLab with cyberpunk theme →  docs/preview-theme-cyberpunk.png
#    - ApiLab interface              →  docs/preview-apilab.png

# 3. Create the docs folder and add images
mkdir docs
# ... save screenshots there
```

---

<div align="center">

## 📄 License

[MIT](./LICENSE) · Built with the **Infini Design System**


</div>
