/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0f1729",
        "secondary": "#1e293b",
        "background-light": "#f6f7f8",
        "background-dark": "#0f1729",
        "surface-dark": "#1e293b",
        "border-dark": "#334155",
        "accent-blue": "#3b82f6",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
