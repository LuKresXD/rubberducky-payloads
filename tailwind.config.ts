import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'leaguespartan': ['League Spartan', 'sans-serif'],
        'poppins' : ['Poppins', 'sans-serif'],
      },
      colors: {
        text: '#ffffff',
        background: '#0a0a0a',
        primary: '#111111',
        secondary: '#1F1F1F',
        accent: '#333333',
      },
      borderWidth: {
        1: '1px',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-20deg)' },
          '75%': { transform: 'rotate(20deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'wave': 'wave 0.8s linear',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
