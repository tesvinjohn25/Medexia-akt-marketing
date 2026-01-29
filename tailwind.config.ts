import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--bg-ink)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
