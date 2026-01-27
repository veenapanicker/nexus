import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // McGraw Hill-inspired typography
        display: ["Poppins", "sans-serif"],
        sans: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        // McGraw Hill brand colors
        mh: {
          red: "#E21A23",
          red_dark: "#B8131A",
          black: "#101010",
          white: "#FFFFFF",
        },
        // Nexus brand palette (refined with MH red)
        nexus: {
          primary: "#E21A23", // McGraw Hill red
          purple: {
            DEFAULT: "#4A3B8A",
            dark: "#3A2B7A",
            light: "#6A5BAA",
          },
          red: {
            DEFAULT: "#E21A23", // McGraw Hill red
            dark: "#B8131A",
            light: "#F04A52",
          },
          pink: {
            DEFAULT: "#F08080",
            dark: "#D85555",
            light: "#F5A5A5",
          },
          violet: {
            DEFAULT: "#7B4B94",
            dark: "#6B3B84",
            light: "#9B6BB4",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
        fadeIn: "fadeIn 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s infinite",
        bounce: "bounce 1s infinite",
        spin: "spin 1s linear infinite",
        scaleUp: "scaleUp 0.3s ease-out",
        pageTransition: "pageTransition 0.35s ease-out",
        loadingBar: "loadingBar 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        scaleUp: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        pageTransition: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        loadingBar: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(226, 26, 35, 0.3)",
        "glow-lg": "0 0 30px rgba(226, 26, 35, 0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;
