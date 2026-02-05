/**
 * Design Tokens
 * Centralized color, spacing, and typography definitions
 */

export const colors = {
  // Button variants - Primary (Navy Blue)
  button: {
    primary: {
      rest: "#1E3A8A",
      hover: "#1E40AF",
      active: "#1E3A8A",
      disabled: "#93C5FD",
    },
    secondary: {
      border: "#E5E7EB",
      borderHover: "#1E3A8A",
      text: "#1F2937",
      backgroundHover: "#F9FAFB",
    },
    tertiary: {
      text: "#1E3A8A",
      textHover: "#1E40AF",
      backgroundHover: "#EFF6FF",
    },
    warning: {
      rest: "#F59E0B",
      hover: "#D97706",
      active: "#B45309",
      disabled: "#FCD34D",
    },
    negative: {
      rest: "#EF4444",
      hover: "#DC2626",
      active: "#B91C1C",
      disabled: "#FECACA",
    },
    positive: {
      rest: "#10B981",
      hover: "#059669",
      active: "#047857",
      disabled: "#A7F3D0",
    },
  },
  // Disabled state (all variants)
  disabled: {
    background: "#F3F4F6",
    text: "#9CA3AF",
    border: "#E5E7EB",
  },
  // Focus state (accessibility)
  focus: "#3B82F6",
  focusRing: "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
  // Brand colors (EduTech + Product colors)
  brand: {
    mhRed: "#E21A23",
    mhRedDark: "#B8131A",
    connect: "#4A3B8A",
    aleks: "#E21A23",
    simnet: "#10B981",
    sharpen: "#F08080",
  },
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};

export const buttonSizes = {
  sm: {
    padding: "px-3 py-1.5",
    fontSize: "text-sm",
  },
  md: {
    padding: "px-4 py-2",
    fontSize: "text-sm",
  },
  lg: {
    padding: "px-6 py-2.5",
    fontSize: "text-base",
  },
};

export const transitions = {
  default: "transition-all duration-200",
  colors: "transition-colors duration-200",
};
