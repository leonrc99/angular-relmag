/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "hp-image": "url('/assets/images/hp-image.png')",
        "sword-image": "url('/assets/images/sword-image.png')",
      },
    },
  },
  plugins: [],
};
