/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-adamina)"],
        sans: ["var(--font-poppins)"],
        stencil: ["var(--font-stencil)"],
      },
    },
  },
  plugins: [],
};
