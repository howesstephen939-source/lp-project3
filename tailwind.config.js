/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          400: '#94a3b8',
          500: '#64748b',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
        },
        emerald: {
          300: '#6ee7b7',
        },
        rose: {
          300: '#f9a8d4',
          500: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'hero': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}