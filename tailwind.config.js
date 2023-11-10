/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "rgb(253, 224, 71)",
        secondary: "#ff4b2b",
        "secondary-gold": "rgb(234, 179, 8)",
        "light-red": "#fdf2f2",
        background: "rgb(238,240,243)",
      },
      height: {
        calc: "calc(100vh - 150px)",
      },
    },
  },
  plugins: [],
};
