# Infini Demo

[中文（默认）](./README.md) | **English**

`Infini-Demo` is the interactive showcase application for `Infini-Dev-Kit`. It is used to verify the theme system, shared components, motion layer, and API lab in one place.

Default entry document: Chinese `README.md`.

> AI agents should read [`AGENTS.md`](./AGENTS.md) first.

## Preview

| Theme Lab · Default | Theme Lab · Cyberpunk | API Lab |
| --- | --- | --- |
| ![Theme Lab Default](./docs/images/theme-lab-default-zh.png) | ![Theme Lab Cyberpunk](./docs/images/theme-lab-cyberpunk-zh.png) | ![API Lab](./docs/images/api-lab-zh.png) |

## What This Repo Is For

`Infini-Demo` currently focuses on two pages:

- `ThemeLab`
  Used to inspect themes, fonts, colors, buttons, data display components, layout, visual effects, and internal tokens.
- `ApiLab`
  Used to demonstrate `createApiClient()` requests, error handling, request logs, and MSW-backed mock responses.

The screenshots and the default README entry both use the Chinese UI.

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7
- Mantine 8
- Motion 12
- ECharts 6
- MSW 2
- Local workspace dependency on `@infini-dev-kit/*`

## Quick Start

Prerequisites:

- Node.js 20+
- pnpm 10+
- A sibling `Infini-Dev-Kit` directory next to this repo

Directory layout:

```text
GitHub/
├── Infini-Dev-Kit/
└── Infini-Demo/
```

Start the demo:

```bash
cd Infini-Demo
pnpm install
pnpm dev
```

Default local address:

```text
http://localhost:5173
```

## Common Commands

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

## Repository Layout

```text
src/
├── App.tsx
├── main.tsx
├── components/
├── i18n/
├── mocks/
├── pages/
│   ├── ApiLab.tsx
│   └── theme-lab/
├── providers/
└── theme/
```

## What You Can Validate Here

- Theme switching across:
  `default`, `chibi`, `cyberpunk`, `neu-brutalism`, `black-gold`, `red-gold`
- Motion switching across:
  `off`, `minimum`, `reduced`, `full`
- Theme fonts and tokens under the Chinese UI
- Base button skins and composed effects
- API request logs, error responses, and endpoint coverage behavior

## Relationship To Dev Kit

This repo is a consumer and validation surface for `Infini-Dev-Kit`. It should not duplicate Dev Kit theme logic, shared components, or common utilities. Shared behavior should be fixed in `Infini-Dev-Kit` first, then verified here.

## Screenshot Assets

The README preview uses:

- [`docs/images/theme-lab-default-zh.png`](./docs/images/theme-lab-default-zh.png)
- [`docs/images/theme-lab-cyberpunk-zh.png`](./docs/images/theme-lab-cyberpunk-zh.png)
- [`docs/images/api-lab-zh.png`](./docs/images/api-lab-zh.png)

## License

[MIT](./LICENSE)
