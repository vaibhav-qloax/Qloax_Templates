import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        "bg-card": "#090909",
        "bg-elevated": "#111111",
        "qloax-red": "#C40024",
        "qloax-red-bright": "#E0002A",
        "qloax-dark": "#050505",
        // Template 2 Enterprise Slate Palette
        "t2-bg": "#090D16",
        "t2-card": "#131D31",
        "t2-text": "#F1F5F9",
        "t2-border": "#1E293B",
        "t2-accent": "#3B82F6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
