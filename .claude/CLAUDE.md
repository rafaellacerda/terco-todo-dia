# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server (Vite)
npm run build        # tsc -b && vite build — run this to typecheck, there is no separate typecheck script
npm run lint          # oxlint
npm run test           # vitest run (single run, used in CI/verification)
npm run test:watch     # vitest watch mode
npm run format          # biome format --write . (formatter only)
npm run format:check    # biome format . (check, no write — use in CI)
npx vitest run src/pages/home/home-page.test.tsx   # run a single test file
npx shadcn@latest add <component>                    # add a new shadcn/ui component
```

There is no ESLint/Prettier. Linting is `oxlint` only (`.oxlintrc.json`).
Formatting is Biome (`biome.json`), with Biome's own linter explicitly
disabled (`linter.enabled: false`) to avoid duplicating/conflicting with
`oxlint` — Biome is wired up as a formatter only. Style: single quotes in
JS/TS, double quotes in JSX, no semicolons (`asNeeded`), trailing commas,
2-space indent. The CSS formatter has `tailwindDirectives: true` enabled so
`@apply`/`@theme` in `src/assets/styles/globals.css` parse correctly.

## Architecture

### Stack

React 19 + TypeScript + Vite, Tailwind CSS v4, shadcn/ui (style `radix-nova`,
base color `neutral`), React Router v7, Zustand (client/global state),
TanStack Query (server state), Zod + React Hook Form, Vitest + Testing
Library.

### Routing and rendering

- `src/main.tsx` is the only entry point: wraps the app in
  `AppConfigContext.Provider` → `QueryClientProvider` → `RouterProvider`.
- `src/routes/app-router.tsx` defines the `createBrowserRouter` tree. The
  root route renders `AppLayout` and sets `errorElement` to
  `RouteErrorBoundary` — this single boundary handles both real render
  errors and unmatched paths (React Router throws a 404 `ErrorResponse`
  for non-matching routes, which `RouteErrorBoundary` already renders via
  `isRouteErrorResponse`). **Every new top-level route must set its own
  `errorElement`** (don't rely on bubbling past more than one route level).
- Pages are loaded through React Router's `lazy` route field (not
  `React.lazy`+`Suspense` manually): `lazy: async () => { const { XPage } =
  await import('@/pages/x/x-page'); return { Component: XPage } }`. Follow
  this pattern for every new page so it ends up in its own build chunk.
- `src/layout/app-layout.tsx` is the persistent shell (nav + `<Outlet />`)
  shared by all routes under `/`.

### Folder structure and ownership rules

- `src/components` — global, "dumb" components with **no screen-specific
  logic**. Anything tied to a specific page's business rules belongs next
  to that page instead (`src/pages/<page>/components/`), not here.
- `src/pages/<page>/` — one folder per screen; colocate page-local
  components, schemas, etc. inside it rather than in the global folders.
- `src/config` — environment access, the TanStack Query client
  (`query-client.ts`), and React contexts (`app-context.tsx`). This is also
  where new app-wide contexts/providers should be added.
- `src/stores` — Zustand stores for **app-wide** state (e.g. `use-ui-store.ts`
  for theme, `use-patients-store.ts` for data reused across screens).
  Screen-local UI stores do not belong here — see "State management
  patterns" below.
- `src/services` — API calls, kept separate from components/pages.
- `src/hooks`, `src/types`, `src/utils`, `src/enums` — shared, screen-agnostic
  code only.
- `src/test/setup.ts` — global Vitest setup (imports `@testing-library/jest-dom`),
  wired via `vitest.config.ts`'s `test.setupFiles`.

### State management patterns

- **Don't prop-drill open/close or selection callbacks between page-local
  components.** For screen-local UI state (a sheet/dialog's open flag,
  "which item is currently selected", a search query, etc.), create a small
  Zustand store scoped to that screen instead of threading
  `open`/`onOpenChange`/`onSave`/`onClick` props down through children.
- Colocate this store inside the page's own folder as
  `src/pages/<page>/use-<page>-ui-store.ts` — not in the global `src/stores`
  (that's reserved for state actually shared across screens, e.g. the
  patients data list). See `src/pages/pacientes/use-pacientes-ui-store.ts`
  for the reference shape.
- Child components read the store directly and call its actions
  (`openDetail(patient)`, `closeForm()`, …) instead of receiving callback
  props — this often means a component ends up taking few or even zero
  props. A row/list-item that still needs the underlying data keeps that as
  a prop (e.g. `patient`); only the control-flow callback is removed.
- Tests must reset every Zustand store touched by the component under test
  in `beforeEach` (both the page-local UI store and any global data store),
  since stores are module-level singletons that persist between test cases
  in the same file.

### Environment variables

Never read `import.meta.env.X` directly in feature code. All env vars are
declared and validated with Zod in `src/config/env.ts` and exposed through
the exported `env` object (e.g. `env.apiUrl`). Add new variables to the Zod
schema there, to `.env.example`, and to `.env`.

### TypeScript constraints

- `tsconfig.app.json` has `erasableSyntaxOnly: true`, which **forbids real
  TypeScript `enum` declarations** (they emit runtime code, not just
  erasable types). Use a `const` object + derived union type instead:
  ```ts
  export const Status = { Active: 'active', Inactive: 'inactive' } as const
  export type TStatus = (typeof Status)[keyof typeof Status]
  ```
- Type aliases are prefixed with `T` (no `I` prefix is used).
- Path alias `@/*` maps to `src/*` (declared in both `tsconfig.app.json` and
  `tsconfig.json`, and mirrored in `vite.config.ts` / `vitest.config.ts`
  resolve aliases — keep all of these in sync if the alias changes).

### React 19 patterns (required, not optional)

- Form state with async actions: `useActionState`, not local `useState` +
  manual `isPending`/`error` juggling.
- `useFormStatus` in a child of the `<form>` to read pending state — never
  pass `isPending` down as a prop from the parent.
- `useOptimistic` for instant UI feedback while a server action resolves.
- `use()` to read Promises and Context during render, including inside
  conditionals (this is why `AppConfigContext` is read with `use()` in
  `home-page.tsx` rather than `useContext`).
- **Never fetch data in `useEffect`.** Use TanStack Query for server state,
  or `use()` with Suspense for promise-based reads.

### shadcn/ui setup

- `components.json` aliases are customized: `utils` → `@/utils/cn` and
  `lib` → `@/utils` (the CLI's default `src/lib/utils.ts` was moved into
  the project's existing `utils/` folder as `cn.ts` to avoid having two
  parallel "utilities" locations). When running `shadcn add`, generated
  imports of `cn` should resolve to `@/utils/cn` automatically because of
  this alias — if a generated file imports from `@/lib/utils` instead,
  fix the import manually.
- Theme tokens and Tailwind imports live in `src/assets/styles/globals.css`
  (this is the `tailwind.css` shadcn writes to, configured via
  `components.json` → `tailwind.css`).

### Design system / theme tokens

`src/assets/styles/globals.css` defines the brand palette (`:root` for
light, `.dark` for dark) in OKLCH, derived from the Praxis Hub Physio
reference design (forest-green primary `#2b5145`) plus a black/graphite
dark theme (`background #0a0a0a`, `card/sidebar #19191b`). Key points for
anyone touching colors:

- `primary`, `accent`, and the custom `warm`/`warm-foreground` pair are the
  tokens tied to the brand (green for primary actions/active state, warm
  terracotta-on-peach for highlight badges like "IA"). Everything else
  (`secondary`, `muted`, `border`, `chart-*`, `sidebar-*`) is derived from
  the same hue family — change those in lockstep with `primary`/`accent`,
  don't pick unrelated colors for them.
- `warm`/`warm-foreground` is **not** a default shadcn slot — it was added
  by hand both as raw vars in `:root`/`.dark` and as
  `--color-warm`/`--color-warm-foreground` in the `@theme inline` block.
  If you add another custom semantic color, follow the same two-step
  pattern (raw var in `:root`/`.dark` + entry in `@theme inline`), or
  `bg-<name>`/`text-<name>-foreground` utilities won't be generated.
- Theme switching is class-based (`.dark` on `<html>`), driven by
  `useUiStore` (`src/stores/use-ui-store.ts`) + `useTheme`
  (`src/hooks/use-theme.ts`), not `prefers-color-scheme`.
- Gotcha: `--color-*` names only exist inside Tailwind's generated
  utilities (e.g. `bg-primary`) — they are **not** real runtime CSS custom
  properties. If you need a token's value outside of a Tailwind class
  (inline style, JS), reference the raw var instead (`var(--primary)`, not
  `var(--color-primary)`).

### Naming conventions

- **All code is written in English** — variable, function, type, and store
  names, file names, and folder names. This includes domain/page folders
  (`src/pages/patients/`, not `src/pages/pacientes/`) and the fields on
  domain types (`patient.name`, not `patient.nome`). The only Portuguese
  in the codebase is **user-facing copy** — labels, page titles, button
  text, mock content shown in the UI (the product is pt-BR) — never
  identifiers or paths. Don't mix the two within the same file/feature.
- Components: PascalCase, one per file.
- Hooks: `use` prefix (`useTheme`, `useUiStore`).
- Actions/mutations: `Action` or `Mutation` suffix (e.g. `createOrderAction`).
- Files: kebab-case (`home-page.tsx`, `app-router.tsx`).
- One test file per feature, named `*.test.tsx`, using Testing Library +
  `userEvent` (not `fireEvent`) and asserting behavior, not implementation
  details (no testing refs/lifecycle/internal state).
