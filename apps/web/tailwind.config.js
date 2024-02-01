import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        oswald: ['"Oswald"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        secondary: "#5dc7c2",
        light: "#fff",
        dark: "rgb(25, 29, 40)",
      },
    },
  },
  plugins: [],
};
