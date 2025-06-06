import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1296px",
      },
      fontSize: {
        "2xs": "12px",
        xs: "14px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
        "2xl": "36px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "56px",
        "6xl": "64px",
        "7xl": "72px",
        "8xl": "80px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;

export default config;
