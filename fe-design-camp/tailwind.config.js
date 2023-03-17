/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#213CCC",
        secondary: "#9900CC",
      },
    },
    container: {
      center: true,
      DEFAULT: "1rem",
      sm: "2rem",
      md: "3rem",
      lg: "4rem",
      xl: "5rem",
      "2xl": "6rem",
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
