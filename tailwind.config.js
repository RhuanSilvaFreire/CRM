/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',
        'primary-dark': '#3730a3',
        'sidebar': '#1e293b',
        'sidebar-active': '#334155',
      }
    },
  },
  plugins: [],
}
