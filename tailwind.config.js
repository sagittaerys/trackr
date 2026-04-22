/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        'primary-light': '#818CF8',
        'primary-dark': '#4F46E5',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        surface: '#F8FAFC',
        border: '#E2E8F0',
        muted: '#94A3B8',
      },
    },
  },
  plugins: [],
}