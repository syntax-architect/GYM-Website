/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mineral: {
          DEFAULT: '#F5F2EA',
          50: '#FAF8F4',
          100: '#F5F2EA',
          200: '#E8E3D5',
          300: '#DAD2BC',
          400: '#C7BBA0',
          500: '#B0A182',
        },
        persimmon: {
          DEFAULT: '#FF6747',
          light: '#FF886F',
          dark: '#E04E2F',
          glow: 'rgba(255, 103, 71, 0.25)',
        },
        periwinkle: {
          DEFAULT: '#8177FF',
          light: '#A29BFF',
          dark: '#6256E0',
          glow: 'rgba(129, 119, 255, 0.25)',
        },
        botanical: {
          DEFAULT: '#174D3B',
          light: '#23654E',
          dark: '#0F3428',
          deep: '#0B241C',
        },
        carbon: {
          DEFAULT: '#20231F',
          muted: '#4C514A',
          subtle: '#787E75',
          border: 'rgba(32, 35, 31, 0.12)',
        },
        cloud: {
          DEFAULT: '#DDE8F8',
          light: '#EEF4FD',
          dark: '#C2D5F0',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'persimmon-subtle': '0 10px 30px -10px rgba(255, 103, 71, 0.3)',
        'periwinkle-subtle': '0 10px 30px -10px rgba(129, 119, 255, 0.3)',
        'sculptural': '0 25px 50px -12px rgba(32, 35, 31, 0.08), 0 0 0 1px rgba(32, 35, 31, 0.04)',
        'editorial': '0 20px 40px -15px rgba(23, 77, 59, 0.08)',
      }
    },
  },
  plugins: [],
}
