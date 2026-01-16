/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        medical: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BADFFF',
          500: '#007AFF', // Azul médico principal
          600: '#0062CC',
          900: '#002F66',
        },
        whatsapp: {
          500: '#25D366',
          600: '#128C7E',
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}