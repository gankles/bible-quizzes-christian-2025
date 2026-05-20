import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Bible-themed color palette (parchment-inspired)
        primary: "#8B7355",        // Warm brown (parchment)
        "primary-light": "#F5F1E8", // Light cream
        "primary-dark": "#5C4A3A",  // Dark brown
        sacred: "#C9A961",          // Gold accent (sacred/divine)
        "sacred-light": "#F8F3E3",  // Light gold
        scripture: "#2C3E50",       // Deep blue-gray (text)
        grace: "#E8DCC4",           // Soft beige
        background: "var(--background)",
        foreground: "var(--foreground)",

        ink: "#2C3E50",
        "ink-muted": "#4A5568",
        "ink-light": "#718096",
        "gold-dark": "#A8883E",
        "royal-blue": "#3B82F6",

        // Dark mode variants
        "dark-bg": "#1a1612",
        "dark-surface": "#2b2520",
        "dark-border": "#3d342c",
      },
      fontFamily: {
        serif: ["var(--font-crimson)", "Georgia", "serif"],  // For Bible text
        display: ["var(--font-merriweather)", "serif"],         // For headings
        sans: ["var(--font-open-sans)", "Open Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",    // 8px
        lg: "1rem",           // 16px
        xl: "1.5rem",         // 24px
        "2xl": "2rem",        // 32px
        full: "9999px",       // Fully rounded
      },
      maxWidth: {
        content: "1200px",
        article: "760px",
        wide: "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
