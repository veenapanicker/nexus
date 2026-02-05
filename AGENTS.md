# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and page-level UI (e.g., `app/page.tsx`, `app/layout.tsx`).
- `components/`: Reusable UI components organized by feature (e.g., `components/reports/ReportCard.tsx`).
  - `components/ui/Button.tsx`: Button component library (6 variants, 3 sizes)
  - `components/ui/Heading.tsx`: Heading component for consistent typography
- `lib/`: Shared utilities, data helpers, and context providers.
  - `lib/utils.ts`: `cn()` utility for Tailwind classes
  - `lib/mock-data.ts`: Type definitions and mock data
  - `lib/design-tokens.ts`: Centralized design system tokens (colors, spacing, transitions)
  - `lib/context.tsx`: ReportProvider for global state
- `app/globals.css`: Global styles, CSS variables, Tailwind layers (light mode only, no dark mode).
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
- **Buttons**: ALWAYS use `<Button>` component from `@/components/ui/Button` instead of raw `<button>` tags.
- **Headings**: ALWAYS use `<Heading>` component from `@/components/ui/Heading` instead of raw `<h1>`, `<h2>`, etc.

## Button Component Usage
```tsx
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

// Basic usage
<Button variant="primary">Click me</Button>

// With icon
<Button variant="secondary" leftIcon={<ChevronRight />}>Next</Button>

// Loading state
<Button variant="primary" isLoading={isSubmitting}>
  Submit Report
</Button>

// Full width (modals)
<Button variant="primary" fullWidth>
  Confirm Action
</Button>

// As link
<Button variant="secondary" asChild>
  <Link href="/reports">View Reports</Link>
</Button>
```

**Variants**: primary | secondary | tertiary | warning | negative | positive
**Sizes**: sm | md (default) | lg
**Props**: variant, size, isLoading, leftIcon, rightIcon, fullWidth, asChild, disabled, className, and all HTML button attributes.

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
