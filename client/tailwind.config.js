/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        small: "501px",
        sm: "650px",
        md: "768px",
        lg: "1025px",
        xl: "1441px",
        xxl: "1920px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
