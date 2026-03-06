# Contributing to Infini Demo

Thank you for your interest in contributing. This document outlines the rules and expectations for all contributors. **Read the entire document before submitting any code.**

## Ground rules

1. **No drive-by PRs.** Open an issue first to discuss the change. PRs without a linked issue will be closed.
2. **One concern per PR.** Each pull request must address exactly one feature, bug fix, or refactor. Do not bundle unrelated changes.
3. **Keep the demo faithful.** This app exists to showcase the Infini Design System *as-is*. Do not introduce custom styling, components, or patterns that deviate from `@infini-dev-kit/frontend`.

## Branch strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready, always deployable |
| `feat/<name>` | New zone, page, or capability |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Tooling, CI, docs |

- Branch from `main`. Rebase onto `main` before requesting review.
- No merge commits — use **rebase and fast-forward** only.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) strictly:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Allowed types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `ci`

**Scope** must be one of: `theme-lab`, `api-lab`, `app`, `build`, `deps`, `docs`

Examples:
```
feat(theme-lab): add ZoneAccessibility zone
fix(api-lab): correct retry counter reset on success
chore(deps): bump mantine to 7.18.0
```

Commits that do not follow this format will be rejected by CI.

## Code standards

### TypeScript
- **Strict mode** — no `any`, no `@ts-ignore`, no `@ts-expect-error` without a linked issue number.
- All exports must have explicit types. No inferred return types on exported functions.
- Prefer `interface` over `type` for object shapes.

### React
- Function components only — no class components.
- Props must use the shared `ZoneProps` interface (for zones) or a dedicated `*Props` interface declared in the same file.
- No inline styles. Use CSS Modules (`*.module.css`).
- No `useEffect` for derived state — use `useMemo` or computed values.

### CSS
- All zone styles must use CSS Modules. Global CSS is only permitted in `index.css`.
- Use design tokens (CSS custom properties from the theme) — never hardcode colors, spacing, or font sizes.
- No `!important`.

### File naming
- Components: `PascalCase.tsx` (e.g. `ZoneMotion.tsx`)
- CSS Modules: `PascalCase.module.css` (e.g. `ZoneMotion.module.css`)
- Utilities / data: `camelCase.ts` (e.g. `data.ts`, `types.ts`)
- No `index.ts` barrel files except at `src/pages/index.ts`.

## Adding a new zone

1. Create `src/pages/theme-lab/ZoneYourName.tsx` implementing the `ZoneProps` interface.
2. Create `src/pages/theme-lab/ZoneYourName.module.css`.
3. Import and render the zone in `ThemeLab.tsx` in the correct visual order.
4. Add mock data (if needed) to `data.ts`.
5. Update `CHANGELOG.md` under `[Unreleased]`.

## Testing

- Run `pnpm build` before pushing — the build must pass with zero TypeScript errors.
- Visually verify your change under **at least two themes** and **two motion levels** (e.g. `full` and `off`).
- If your change affects the ApiLab, verify all six mock scenarios still produce correct output.

## Pull request checklist

Before requesting review, confirm:

- [ ] Issue is linked in the PR description
- [ ] Branch is rebased on latest `main`
- [ ] `pnpm build` passes with zero errors
- [ ] Commit messages follow Conventional Commits
- [ ] No `any`, `@ts-ignore`, `!important`, or hardcoded design values
- [ ] Tested under >= 2 themes and >= 2 motion levels
- [ ] `CHANGELOG.md` updated under `[Unreleased]`
- [ ] No unrelated changes included

## Review process

- All PRs require **at least one approving review** before merge.
- Reviewers will check for design system compliance, code quality, and visual correctness.
- Address all review comments. Do not resolve conversations yourself — let the reviewer resolve them.

## What will get your PR rejected

- Skipping the issue-first rule
- Bundling multiple concerns
- Breaking existing themes or zones
- Introducing dependencies without prior discussion
- Ignoring TypeScript strict mode
- Hardcoded styles instead of design tokens
- Incomplete changelog entry

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
