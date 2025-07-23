import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '15': '3.75rem',
        '30': '7.5rem',
      },
      width: {
        '15': '3.75rem',
        '30': '7.5rem',
      },
      height: {
        '15': '3.75rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;