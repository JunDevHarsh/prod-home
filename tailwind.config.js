/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#4f7df3",
        pale_blue: "#c2d3ff",
        light_red: "#ff5263",
        gray: "#969696",
        dark_gray: "#151f29",
      },
      backgroundImage: {
        gradient: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
      },
      translate: {
        close_line_1: "translate(0px, 2px) rotate(45deg)",
        close_line_2: "translate(0, -1px) rotate(-45deg)",
      },
    },
  },
  plugins: [],
};
