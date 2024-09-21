/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#C48D5D",
      },
      backgroundImage: {
        main: "url('/background.png')",
      },
    },
  },
  plugins: [],
};
