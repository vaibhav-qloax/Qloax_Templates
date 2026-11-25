import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette: light blue, gold, pink and dark gray on a warm off-white light theme.
        ink: "#2a2a2a",
        navy: "#2a2a2a", // primary dark (text, buttons, dark band)
        blue: { DEFAULT: "#4b7be5", deep: "#2f5bc4", soft: "#e6edfc" },
        amber: "#e4a800", // gold
        pink: "#d85d8a",
        paper: "#f6f5f2",
        mist: "#eeece7",
        surface: "#fbfaf8",
        line: "#e0ddd6",
        mute: "#6b6863",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.045em",
        tight: "-0.025em",
        label: "0.16em",
      },
      maxWidth: {
        site: "88rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
