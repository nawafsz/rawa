/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f9f4',
          100: '#e3f1e3',
          200: '#c5e2c5',
          300: '#96c896',
          400: '#62a562',
          500: '#3e883e',
          600: '#2d6d2d',
          700: '#255625',
          800: '#214421',
          900: '#1c391c',
          950: '#0d1f0d',
        },
        secondary: {
          50: '#fbf7f1',
          100: '#f5ecdc',
          200: '#ebd8ba',
          300: '#decfa1',
          400: '#d0ba75',
          500: '#bfa354',
          600: '#a68743',
          700: '#856738',
          800: '#6e5334',
          900: '#5a452e',
          950: '#322416',
        }
      },
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "repeating-linear-gradient(45deg, #e3f1e3 0px, #e3f1e3 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, #e3f1e3 0px, #e3f1e3 1px, transparent 1px, transparent 20px)",
      }
    },
  },
  plugins: [],
}
