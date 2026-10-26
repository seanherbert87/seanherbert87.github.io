/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // Tighter corners site-wide
    borderRadius: {
      none: '0',
      sm: '1px',
      DEFAULT: '2px',
      md: '3px',
      lg: '4px',
      xl: '6px',
      full: '9999px',
    },
    extend: {
      colors: {
        // Pale sage accent
        primary: {
          50: '#f2f7f0',
          100: '#e4efe0',
          200: '#cbe0c3',
          300: '#a9cb9e',
          400: '#84b077',
          500: '#649458',
          600: '#4e7744',
          700: '#3f5f38',
          800: '#344d2f',
          900: '#2b3f28',
        },
        // Green-tinted neutrals
        gray: {
          50: '#f4f7f2',
          100: '#ebf0e8',
          200: '#dce4d8',
          300: '#c5d0c0',
          400: '#98a692',
          500: '#6e7c69',
          600: '#525e4f',
          700: '#3c463a',
          800: '#252c24',
          900: '#171c16',
          950: '#0f130e',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
