import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        lc: { raw: "(min-height : 500px)" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
