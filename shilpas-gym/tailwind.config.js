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
          DEFAULT: '#F4F1EA',
          50: '#FAF8F5',
          100: '#F4F1EA',
          200: '#E8E2D5',
          300: '#D8CFC0',
          400: '#C2B6A1',
          500: '#A69880',
        },
        persimmon: {
          DEFAULT: '#D9381E',
          light: '#E8523A',
          dark: '#B82B14',
          glow: 'rgba(217, 56, 30, 0.28)',
        },
        periwinkle: {
          DEFAULT: '#C5A059',
          light: '#D9B978',
          dark: '#A3803E',
          glow: 'rgba(197, 160, 89, 0.25)',
        },
        botanical: {
          DEFAULT: '#141311',
          light: '#22201D',
          dark: '#0C0B0A',
          deep: '#070706',
        },
        carbon: {
          DEFAULT: '#0D0D0E',
          muted: '#4A4843',
          subtle: '#78746C',
          border: 'rgba(13, 13, 14, 0.12)',
        },
        cloud: {
          DEFAULT: '#E6DEC8',
          light: '#F5F0E4',
          dark: '#CFC3A6',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'persimmon-subtle': '0 12px 32px -10px rgba(217, 56, 30, 0.38)',
        'periwinkle-subtle': '0 12px 32px -10px rgba(197, 160, 89, 0.3)',
        'sculptural': '0 25px 50px -12px rgba(13, 13, 14, 0.10), 0 0 0 1px rgba(13, 13, 14, 0.06)',
        'editorial': '0 20px 40px -15px rgba(13, 13, 14, 0.12)',
      }
    },
  },
  plugins: [],
}
