/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
        sarthak_d: {
          DEFAULT: "#201c14",
        },
        foreground: "rgb(240, 10%, 3.9%)",
      },
    },
  },
  plugins: [],
}
