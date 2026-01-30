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

### State Management
Global state via React Context (`useReports()` hook):
- `reports`, `scheduledReports`, `generatedReports` - data arrays
- `generateReport()`, `scheduleReport()`, `deleteScheduledReport()`, `toggleScheduledReport()` - actions
- `isGenerating` - loading state

### Styling System

**CSS Variables** (defined in `globals.css`):
- `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--muted-foreground`
- Supports light/dark mode via `prefers-color-scheme`

**McGraw Hill Brand Colors**:
- Red: `#E21A23` (reserved for brand accents only, NOT buttons)
- Connect Purple: `#4A3B8A`
- SimNet Violet: `#7B4B94`
- Sharpen Pink: `#F08080`
- ALEKS: Uses MH Red `#E21A23`

**Button Colors**:
- Primary buttons: `bg-[#60A5FA]` (light blue) with `hover:bg-[#3B82F6]`
- Secondary buttons: `border border-[var(--border)]` with hover states
- Red is reserved for brand accents (header strip, product tags), not interactive elements

**Typography**:
- Display font: Poppins (headings)
- Body font: Source Sans Pro

### Component Patterns

**Modal Pattern**: Use reusable `<Modal>` component with props: `isOpen`, `onClose`, `title`, `size`

**Class Utilities**: Always use `cn()` for conditional Tailwind classes:
```tsx
cn("base-class", isActive && "active-class")
```

**Animations**: Use built-in classes like `animate-slideUp`, `animate-fadeIn` with staggered delays:
```tsx
style={{ animationDelay: `${index * 100}ms` }}
```

### Data Models
Key types in `lib/mock-data.ts`:
- `Product`: "Connect" | "ALEKS" | "SimNet" | "Sharpen"
- `Report`, `ScheduledReport`, `GeneratedReport`
- `License`, `StudentLicense`
- `Course`, `StudentEnrollment`

Helper functions: `getProductColor()`, `formatFrequency()`, `getLicenseStats()`, `getEnrollmentStats()`

### User Roles
- `platform_admin`, `institutional_admin`, `billing_admin`
- Access levels: "full" | "view_only" | "none"
- Sidebar shows access indicators and hides restricted actions
