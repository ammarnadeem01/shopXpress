import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  plugin: [flowbite.plugin()],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        450: "450px",
        500: "500px",
        sm: "640px",
        md: "768px",
        800: "800px",
        900: "900px",
        1000: "1000px",
        lg: "1024px",
        1150: "1150px",
        xl: "1280px",
        1350: "1350px",
        "2xl": "1536px",
      },
    },
  },
};
