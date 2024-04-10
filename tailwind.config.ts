import type { Config } from "tailwindcss";

const config: Config = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['"Rubik"', 'sans-serif'],
        'shadows-into-light': ['"Shadows Into Light"', 'cursive'],
        'cursive': ['"Shadows Into Light"', 'cursive'],
      },
      transitionProperty: {
        'bottom': 'bottom',
      },
      transitionDuration: {
        'slow': '0.5s',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "surface-color": "#212121",
        "light-secondary-text-color":"#333333",
        "input-search-background-color": "#181818",
        "body-background-color": "#181818",
        "input-search-border-color": "#2f2f2f",
        "primary-text-color": "#ffffff",
        "secondary-color": "#707579",
        "primary-color": "#8774e1",
        "profile-color": "#53edd6",
        "secondary-text-color": "#aaaaaa",
        "light-filled-secondary-text-color": "#2b2b2b",
        "message-out-background-color":"#8774e1",
        "border-color": "#0f0f0f",
        "message-highlighting-color" : "hsla(284.8192771084337, 49.74418604651163%, 37.59803921568628%, .4)",
        "danger-color": "#ff595a",
        "light-danger-color" : "rgba(255, 89, 90, 0.08)",
        "light-primary-color" : "rgba(135, 116, 225, 0.08)"
      }
    },
    screens: {
      "2xl": { max: "1535px" },
      
      "xl": { max: "1271px" },

      "lg": { max: "930px" },

      "md": { max: "767px" },

      "sm": { max: "600px" },
    },
  },
  plugins: [],
};
export default config;
