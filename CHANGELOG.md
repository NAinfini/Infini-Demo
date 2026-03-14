# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ThemeLab page with 14 interactive zones showcasing the Infini Design System
  - Hero, Foundation, Buttons, Inputs, Controls, Navigation, Feedback, DataDisplay, Layout, Visual Effects, Extras, Charts, Motion, Internals
- ApiLab page with live API testing interface and mock scenarios
- Multi-theme switching with View Transition API support
- Motion preference system (off / minimum / reduced / full)
- Scroll-reactive CSS variables for parallax effects
- Dynamic font loading per theme variant
- MSW integration for deterministic API mocking (success, 400, 401, timeout, retry)
- Distributed trace context (`traceparent`) on all API calls
- CSS Modules for per-zone styling
- ECharts integration with theme-aware chart rendering

### Technical
- React 19 + TypeScript 5.9 + Vite 7
- Mantine 7 UI library with Infini residual overrides
- Motion 12 for declarative animations
- Workspace dependency on `@infini-dev-kit/frontend`, `@infini-dev-kit/utils`, and `@infini-dev-kit/api-client`
