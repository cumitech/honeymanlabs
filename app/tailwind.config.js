/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./App.{js,jsx,ts,tsx}', './index.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FDF6EA',
        foreground: '#1B1200',
        primary: '#FFA500',
        secondary: '#FF6B00',
        accent: '#815100',
        muted: '#6B4B20',
      },
      fontFamily: {
        sans: ['DMSans_400Regular'],
        'sans-medium': ['DMSans_500Medium'],
        'sans-bold': ['DMSans_700Bold'],
        display: ['PlayfairDisplay_700Bold'],
        'display-semibold': ['PlayfairDisplay_600SemiBold'],
        'display-medium': ['PlayfairDisplay_500Medium'],
        accent: ['BebasNeue_400Regular'],
      },
    },
  },
  plugins: [],
}
