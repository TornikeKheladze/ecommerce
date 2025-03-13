/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "*.{jsx,tsx}", "src/**/*{jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainBg: "#EDE8F5",
        customBlack: "#0d0c22",
      },
    },
  },
  plugins: [],
};
