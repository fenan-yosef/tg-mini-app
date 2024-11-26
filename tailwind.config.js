/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all JSX/TSX files are included
    "./src/app/**/*.{js,ts,jsx,tsx}", // Include files in the app directory for Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
