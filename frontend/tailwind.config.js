/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#111827',
        'card-dark': '#1F2937',
        'text-light': '#F9FAFB',
        'highlight': '#22C55E',
        'highlight-hover': '#16A34A',
      },
    },
  },
  plugins: [],
}

