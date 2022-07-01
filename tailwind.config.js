/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{vue,jsx,ts,js}"],
  theme: {
    extend: {
      colors: {
        green: "rgb(186, 243, 185)",
        greenO: "rgb(28, 135, 74)",
        red: "rgb(204, 102, 108)",
        redO: "rgb(135, 28, 28)",
        yellow: "rgb(243, 240, 185)",
        yellowfuerte: "#fde047",
      },
    },
  },
  plugins: [],
};
