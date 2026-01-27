# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and page-level UI (e.g., `app/page.tsx`, `app/layout.tsx`).
- `components/`: Reusable UI components organized by feature (e.g., `components/reports/ReportCard.tsx`).
- `lib/`: Shared utilities, data helpers, and context providers (e.g., `lib/utils.ts`, `lib/mock-data.ts`).
- `app/globals.css`: Global styles and Tailwind layers.
- Root configs: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands
Run commands from the repo root with npm:
```bash
npm run dev     # Start Next.js dev server (Turbopack)
npm run build   # Production build
npm run start   # Run the production server after build
npm run lint    # Run Next.js ESLint checks
```

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js 15) with Tailwind CSS.
- Indentation: 2 spaces in `.ts`/`.tsx` files.
- Components: PascalCase file and component names (e.g., `ReportCard.tsx`).
- Utilities: camelCase functions in `lib/`; shared classnames use `cn` helper (`lib/utils.ts`).
- Styling: prefer Tailwind utility classes; keep long class lists grouped logically.

## Testing Guidelines
- No test runner is configured in this repo.
- If adding tests, introduce a standard framework (e.g., Vitest or Jest) and document new scripts in `package.json`.
- Name tests with `.test.ts(x)` or `.spec.ts(x)` and co-locate near the feature or use a top-level `tests/` directory.

## Commit & Pull Request Guidelines
- No git history is available in this repository, so no established commit convention is visible.
- Use concise, imperative commit messages (e.g., `Add report scheduling modal`).
- PRs should include: a clear summary, linked issues (if any), and screenshots for UI changes.

## Configuration & Secrets
- Use `.env.local` for local environment variables (Next.js convention) and keep secrets out of version control.
