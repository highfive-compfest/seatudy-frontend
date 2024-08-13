import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        lc: { raw: "(min-height : 500px)" },
      },
      colors: {
        blue: {
          DEFAULT: "#B0E0E6", // Powder Blue (creamy sky blue)
          50: "#F5FAFB", // Very light creamy blue
          100: "#E3F2FD", // Light creamy sky blue
          200: "#B3E5FC", // Slightly creamy sky blue
          300: "#81D4FA", // Light creamy sky blue
          400: "#4FC3F7", // Medium creamy sky blue
          500: "#1E88E5", // Darker creamy sky blue
          600: "#1976D2", // Slightly darker creamy sky blue
          700: "#1565C0", // Darker creamy sky blue
          800: "#0D47A1", // Very dark creamy sky blue
          900: "#0A3C6C", // Darkest creamy sky blue
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), nextui()],
};

export default config;
