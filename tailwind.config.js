/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'light-background': '#fBfBfB',
        'light-text': '#333333',
        'light-secondary-text': '#666666',
        'light-highlight': '#007BFF',
        'light-border': '#DDDDDD',
        'light-card-background': '#F8F9FA',

        // Dark mode colors
        'dark-background': '#121212',
        'dark-text': '#FFFFFF',
        'dark-secondary-text': '#BBBBBB',
        'dark-highlight': '#82B1FF',
        'dark-border': '#333333',
        'dark-card-background': '#1E1E1E',

        // Alert colors
        'alert-sunny': '#FFD700',
        'alert-rainy': '#00BFFF',

        // Light
        'light-alert-cloudy': '#B0C4DE',
        'light-alert-storm': '#FF4500',

        // Dark
        'dark-alert-cloudy': '#708090',
        'dark-alert-storm': '#FF6347',

        // Switch colors
        'light-pink-switch': '#ff9c8c',
        'dark-pink-switch': '#fe5786'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      container: {
        padding: '2em',
        center: true,
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      boxShadow: {
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}