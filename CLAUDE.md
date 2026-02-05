# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nexus is an institutional administrator dashboard for McGraw Hill products (Connect, ALEKS, SimNet, Sharpen). Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### App Router Structure
- `/` - Reports library hub (main page)
- `/home` - Dashboard with modules overview and AI search
- `/licenses` - License allocation and management
- `/enrollment` - LMS sync status, course/product enrollment views
- `/enrollment/[courseId]` - Individual course details with student roster
- `/scheduled` - Scheduled reports management
- `/downloads` - Generated reports download center
- `/login` - Authentication page (no sidebar)

### Key Directories
- `app/` - Next.js App Router pages
- `components/` - React components organized by feature (layout, ui, reports, filters, licenses, enrollment, home)
- `lib/context.tsx` - ReportProvider with global state for reports, scheduled reports, generated reports
- `lib/mock-data.ts` - Type definitions and mock data (all data is mocked, no backend)
- `lib/utils.ts` - `cn()` utility for merging Tailwind classes
- `lib/design-tokens.ts` - Centralized design tokens for colors, spacing, and button sizes

### State Management
Global state via React Context (`useReports()` hook):
- `reports`, `scheduledReports`, `generatedReports` - data arrays
- `generateReport()`, `scheduleReport()`, `deleteScheduledReport()`, `toggleScheduledReport()` - actions
- `isGenerating` - loading state

### Styling System

**CSS Variables** (defined in `globals.css`):
- `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--muted-foreground`
- Light mode only (dark mode completely removed)

**McGraw Hill Brand Colors** (via tailwind.config.ts):
- Red: `#E21A23` (reserved for brand accents only, NOT buttons)
- Connect Purple: `#4A3B8A`
- SIMnet Green: `#10B981` (changed from violet)
- Sharpen Pink: `#F08080`
- ALEKS: Uses MH Red `#E21A23`

**Button System** (NEW):
Import `Button` from `@/components/ui/Button`:
```tsx
<Button variant="primary" size="md" isLoading={false}>
  Action
</Button>
```

**Button Variants**:
- `primary`: Navy blue (`#1E3A8A`) - main actions
- `secondary`: Border + navy on hover - alternative actions
- `tertiary`: Text only - low-priority actions
- `warning`: Amber (`#F59E0B`) - caution actions
- `negative`: Red (`#EF4444`) - destructive actions
- `positive`: Green (`#10B981`) - success states

**Button Sizes**:
- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-sm` (default)
- `lg`: `px-6 py-2.5 text-base`

**Button Features**:
- `isLoading`: Shows spinner, disables button
- `leftIcon` / `rightIcon`: Icon support with auto spacing
- `fullWidth`: Stretch to container width
- `asChild`: Render as child (e.g., `<Link>` wrapper)
- No scale animations (uses subtle shadows instead)

**Design Tokens** (via `lib/design-tokens.ts`):
- Centralized color definitions with states (rest, hover, active, disabled)
- Transition timing: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Focus ring: Blue (`#3B82F6`) for accessibility

**Heading Component** (NEW):
Import `Heading` from `@/components/ui/Heading`:
```tsx
<Heading as="h1" className="mb-4">
  Page Title
</Heading>
```

**Typography**:
- Display font: Poppins (headings, via `font-display`)
- Body font: Source Sans Pro
- Focus ring color: Blue (`#3B82F6`, not red)
- Scrollbar gradient: Neutral gray (not red)

### Component Patterns

**Button Component**: Always use `<Button>` from `@/components/ui/Button` instead of `<button>` tags:
```tsx
<Button variant="primary" size="md" leftIcon={<Icon />} isLoading={false}>
  Action Text
</Button>
```

**Heading Component**: Use `<Heading>` from `@/components/ui/Heading` for consistent typography:
```tsx
<Heading as="h1" className="mb-6">Page Title</Heading>
<Heading as="h2" className="mb-4">Section Title</Heading>
```

**Modal Pattern**: Use reusable `<Modal>` component with props: `isOpen`, `onClose`, `title`, `size`

**Class Utilities**: Always use `cn()` for conditional Tailwind classes:
```tsx
cn("base-class", isActive && "active-class")
```

**Animations**: Use built-in classes like `animate-slideUp`, `animate-fadeIn` with staggered delays:
```tsx
style={{ animationDelay: `${index * 100}ms` }}
```

**Important**: NO `hover:scale-*` animations anywhere. Button hover effects use color changes and subtle shadows only.

### Data Models
Key types in `lib/mock-data.ts`:
- `Product`: "Connect" | "ALEKS" | "SIMnet" | "Sharpen"
- `Report`, `ScheduledReport`, `GeneratedReport`
- `License`, `StudentLicense`
- `Course`, `StudentEnrollment`

Helper functions: `getProductColor()`, `getProductBorderColor()`, `formatFrequency()`, `getLicenseStats()`, `getEnrollmentStats()`

**Product Color Mapping**:
- Connect: Purple (`#4A3B8A`)
- ALEKS: Red (`#E21A23`)
- SIMnet: Green (`#10B981`)
- Sharpen: Pink (`#F08080`)

### User Roles
- `platform_admin`, `institutional_admin`, `billing_admin`
- Access levels: "full" | "view_only" | "none"
- Sidebar shows access indicators and hides restricted actions
