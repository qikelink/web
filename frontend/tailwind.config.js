// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        mainbackground: "#141516",
        whitebackground: "#FFFFFF",
        darktext: "#808191",
        lighttext: "#FFFFFF",
        verifiedblue: "#08A0F7",
        white: "#fff",
        red: "#EC5252",
        indigo: '#6C5ECF'
      },

      fontFamily: {
        "poppins": "Poppins",
        "roboto": "Roboto",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
