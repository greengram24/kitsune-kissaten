import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        caramellatte: {
          "primary": "#9c6940",
          "primary-focus": "#7e5233",
          "primary-content": "#ffffff",
          "secondary": "#d6b49c",
          "secondary-focus": "#b58f7a",
          "secondary-content": "#3e2a1e",
          "accent": "#f3d3b5",
          "accent-focus": "#e7b98c",
          "accent-content": "#3e2a1e",
          "neutral": "#3e2a1e",
          "neutral-focus": "#2b1a11",
          "neutral-content": "#f7ede1",
          "base-100": "#fbf1ea",
          "base-200": "#f3e2d6",
          "base-300": "#e7d2c3",
          "base-content": "#3e2a1e",
          "info": "#8cb4c8",
          "success": "#8aa676",
          "warning": "#d69a3c",
          "error": "#c46b51",
        },
      },
    ],
  },
}