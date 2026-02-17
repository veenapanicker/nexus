# Axis Design System & Requirements

## Overview

This document outlines the design system specifications, component requirements, and architectural decisions for the Axis institutional administrator dashboard.

---

## Design System (Updated Feb 2026)

### Visual Design Philosophy

- **Brand-First**: McGraw Hill brand colors (red) reserved for accents, not interactive elements
- **Light Mode Only**: No dark mode CSS (completely removed)
- **Accessible**: WCAG-compliant focus rings, proper contrast ratios
- **Subtle Motion**: No aggressive `hover:scale` animations; uses color shifts and shadows instead
- **Typography-Driven**: Poppins for display, Source Sans Pro for body text

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| McGraw Hill Red | #E21A23 | Brand accents, product tags, logos |
| Connect Purple | #4A3B8A | Connect product identifier |
| SIMnet Green | #10B981 | SIMnet product identifier |
| Sharpen Pink | #F08080 | Sharpen product identifier |
| Primary Navy | #1E3A8A | Primary buttons |
| Primary Navy (Hover) | #1E40AF | Primary button hover state |
| Focus Blue | #3B82F6 | Accessibility focus rings |
| Neutral Gray | #9CA3AF - #6B7280 | Scrollbars, borders, disabled states |

### Typography

- **Display Font**: Poppins (headings, brand presence)
- **Body Font**: Source Sans Pro (readable, accessible)
- **Letter Spacing**:
  - h1: -0.5px
  - h2: -0.25px
  - Body: Normal

---

## Component Library

### Button Component

**Location**: `components/ui/Button.tsx`

**Variants**:
1. **Primary** (Navy Blue)
   - Rest: `#1E3A8A`
   - Hover: `#1E40AF` + `shadow-md`
   - Active: `#1E3A8A`
   - Disabled: `#93C5FD` with 60% opacity

2. **Secondary** (Border + Navy)
   - Border Rest: `#E5E7EB`
   - Border Hover: `#1E3A8A`
   - Background Hover: `#F9FAFB`
   - Text: `#1F2937`

3. **Tertiary** (Text Only)
   - Text Rest: `#1E3A8A`
   - Text Hover: `#1E40AF`
   - Background Hover: `#EFF6FF`

4. **Warning** (Amber)
   - Rest: `#F59E0B`
   - Hover: `#D97706`
   - Active: `#B45309`

5. **Negative** (Red)
   - Rest: `#EF4444`
   - Hover: `#DC2626`
   - Active: `#B91C1C`

6. **Positive** (Green)
   - Rest: `#10B981`
   - Hover: `#059669`
   - Active: `#047857`

**Sizes**:
- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-sm` (default)
- `lg`: `px-6 py-2.5 text-base`

**Features**:
- `isLoading`: Shows loading spinner, disables interaction
- `leftIcon` / `rightIcon`: Icon support with automatic spacing
- `fullWidth`: Stretch to container width
- `asChild`: Render as child element (for `<Link>` wrapping)
- `disabled`: Standard HTML disabled state
- Transition: 200ms `cubic-bezier(0.4, 0, 0.2, 1)`

**API**:
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "warning" | "negative" | "positive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
  className?: string;
}
```

### Heading Component

**Location**: `components/ui/Heading.tsx`

**Usage**:
```tsx
<Heading as="h1">Page Title</Heading>
<Heading as="h2">Section Title</Heading>
<Heading as="h3">Subsection</Heading>
```

**Features**:
- Uses `font-display` (Poppins) automatically
- Proper letter-spacing applied
- Semantic HTML output
- Support for className prop

### Design Tokens

**Location**: `lib/design-tokens.ts`

Centralized definitions for:
- Button colors (all variants, all states)
- Spacing scales
- Typography scales
- Transition timings
- Border radius values

---

## Product Specifications

### Product Names & Colors

| Product | Correct Name | Color | Hex |
|---------|--------------|-------|-----|
| Connect | Connect | Purple | #4A3B8A |
| ALEKS | ALEKS | Red | #E21A23 |
| SIMnet | SIMnet | Green | #10B981 |
| Sharpen | Sharpen | Pink | #F08080 |

**Important**: Product colors use dedicated Tailwind classes:
- `bg-axis-purple` / `border-axis-purple` (Connect)
- `bg-axis-red` / `border-axis-red` (ALEKS)
- `bg-axis-green` / `border-axis-green` (SIMnet)
- `bg-axis-pink` / `border-axis-pink` (Sharpen)

---

## Architecture Decisions

### No Dark Mode
- Dark mode CSS completely removed from `globals.css`
- CSS variables only define light mode values
- Reason: Simplified design system, faster performance, consistent brand experience

### No Scale Animations
- All `hover:scale-*` animations removed
- Replaced with:
  - Color transitions (200ms)
  - Subtle shadow effects (`shadow-sm`, `shadow-md`)
  - Occasional `translate-y-[-1px]` for depth
- Reason: More professional appearance, better performance, reduced motion sensitivity

### Navy Primary Color
- Changed from light blue (`#60A5FA`) to navy (`#1E3A8A`)
- Reason: Better contrast, more professional, follows design guide specifications

### Neutral Scrollbars
- Changed from red gradient to neutral gray
- Gradient: `linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)`
- Reason: Reduces visual noise, improves accessibility, better visual hierarchy

### Blue Focus Rings
- Changed from red to blue (`#3B82F6`)
- Reason: Accessibility standard, better distinction from error states

---

## Implementation Checklist

### Files Created (New)
- [ ] `components/ui/Button.tsx` - Button component library
- [ ] `components/ui/Heading.tsx` - Heading component
- [ ] `lib/design-tokens.ts` - Centralized design tokens

### Files Modified (Updated)
- [ ] `app/globals.css` - Removed dark mode, updated scrollbar, updated focus ring
- [ ] `tailwind.config.ts` - Added button colors, added green palette for SIMnet
- [ ] `lib/mock-data.ts` - Changed SimNet → SIMnet, updated color references
- [ ] All page files - Updated button usage to new Button component
- [ ] All modal files - Updated button usage to new Button component
- [ ] All component files - Updated button usage to new Button component

### Verification Steps

#### Visual Checks
1. **Button Styling**:
   - [ ] Primary buttons are navy with white text
   - [ ] Secondary buttons have gray borders, navy on hover
   - [ ] Hover effects use shadow, not scale
   - [ ] Focus rings are blue (not red)
   - [ ] Disabled buttons are grayed out

2. **Product Colors**:
   - [ ] Connect = Purple (#4A3B8A)
   - [ ] ALEKS = Red (#E21A23)
   - [ ] SIMnet = Green (#10B981)
   - [ ] Sharpen = Pink (#F08080)

3. **Page Titles**:
   - [ ] "Reporting Hub" (not "EDS Reporting Hub")
   - [ ] All page headers use consistent styling

4. **Scrollbars**:
   - [ ] Scrollbars are neutral gray (not red)
   - [ ] Gradient flows from lighter to darker gray

5. **Typography**:
   - [ ] Headings use Poppins font
   - [ ] Body text uses Source Sans Pro
   - [ ] Letter-spacing applied to headings

#### Functional Checks
1. **Keyboard Navigation**:
   - [ ] Tab through all buttons
   - [ ] Blue focus ring visible on each button
   - [ ] Enter/Space activates buttons
   - [ ] Focus never lost

2. **Loading States**:
   - [ ] Spinner appears on buttons with `isLoading={true}`
   - [ ] Button disabled during loading
   - [ ] Spinner color visible on navy background

3. **Icon Alignment**:
   - [ ] Left icons properly spaced
   - [ ] Right icons properly spaced
   - [ ] Gap between icon and text (gap-2)

4. **Modal Buttons**:
   - [ ] Cancel buttons are secondary variant
   - [ ] Submit buttons are primary variant
   - [ ] Proper button sizing inside modals

#### Performance Checks
1. **Bundle Size**:
   - [ ] New components don't significantly increase bundle size
   - [ ] Design tokens are tree-shakeable

2. **Animation Performance**:
   - [ ] No jank on button hover (no scale animations)
   - [ ] Smooth color transitions (200ms)
   - [ ] No performance issues on low-end devices

---

## Migration Guide (Feb 2026 Update)

### Old Button Code:
```tsx
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white">
  Click me
</button>
```

### New Button Code:
```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

### Old Heading Code:
```tsx
<h1 className="text-2xl font-bold font-display">Title</h1>
```

### New Heading Code:
```tsx
<Heading as="h1">Title</Heading>
```

---

## Future Considerations

- Component storybook for design system documentation
- Automated visual regression testing
- Accessibility audit documentation
- Design system versioning strategy
- Component API stability promise

---

## References

- **McGraw Hill Brand Guidelines**: Brand colors, logo usage, typography standards
- **WCAG 2.1 AA**: Accessibility compliance target
- **Tailwind CSS**: Primary utility framework
- **Next.js 15**: Framework and best practices
- **React 19**: Component patterns and hooks

