/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        brand: {
          dark: '#000000',
          gray: '#747474',
          dim: '#797979',
          border: '#363636',
          white: '#ffffff',
        }
      },
      fontFamily: {
        beausite: ['"Beausite Classic"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-figma': '-0.03em',
      }
    },
  },
  plugins: [],
}
