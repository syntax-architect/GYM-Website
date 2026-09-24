/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gym: {
          black: '#0a0a0a',
          charcoal: '#121212',
          charcoalLight: '#1f1f1f',
          orange: '#FF4500', // Neon Orange
          orangeHover: '#FF5500',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
