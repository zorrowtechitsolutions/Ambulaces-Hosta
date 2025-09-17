/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        hostaGreen: "#059669", // emerald-600
        hostaLight: "#ecfdf5", // emerald-50
      },
    },
  },
  plugins: [],
}