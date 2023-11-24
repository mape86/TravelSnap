/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        system: {
          welcomeBg: "#2C3639",
          textWhite: "#fff",
          bgApp: "#213555",
          headlines: "#FF6000",
          linkItems: "#FFA559",
        },
      },
    },
  },
  plugins: [],
};

