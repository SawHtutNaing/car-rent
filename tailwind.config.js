/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#121212",
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      darkGray: "#1E1E1E",
      accent: "#2C2C2C",
      primary: "#f5b301",
      primarySoft: "#fed053",
      primaryDark: "#dfa70c",
      green: "#1B9C85",
      red: "#D71313",
    },
    extends: {
      dropShadow: {
        "3xl": "0 35px 35px gray ",
      },
    },
  },
};
