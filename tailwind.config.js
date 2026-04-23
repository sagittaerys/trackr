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
        primary: '#1B3FA0',
        'primary-light': '#2D55C8',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        surface: '#F2F4F7',
        card: '#FFFFFF',
        border: '#E5E7EB',
        muted: '#6B7280',
        dark: '#111827',
      },
    },
  },
  plugins: [],
}