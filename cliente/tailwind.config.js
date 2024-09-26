/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FAF9FF",
          100: "#DEDBFF",
          200: "#C2BEFF",
          300: "#A5A1FF",
          400: "#8685FF",
          500: "#696CFF",
          600: "#585BEB",
          700: "#484BD6",
          800: "#3A3DC2",
          900: "#2D31AD",
        },
      },
      fontFamily: {
        amaranth: "Amaranth",
        poppins: "Poppins",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
    },
  },
  plugins: [],
};
