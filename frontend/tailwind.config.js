/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#07B2BD',
          600: '#07A3AE',
          700: '#0167AB',
        },
        secondary: {
          DEFAULT: '#0167AB',
          hover: '#07B2BD',
        },
        background: {
          DEFAULT: '#FEFEFE',
          secondary: '#FFFFFF',
        },
        text: {
          DEFAULT: '#000000',
          light: '#666666',
          muted: '#8a9297',
        },
        border: {
          DEFAULT: '#e1e3e4',
          light: '#d4d6d8',
        },
        success: '#008a00',
        warning: '#ffbd00',
        error: '#ff0000',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '1.4'],
        'sm': ['14px', '1.5'],
        'base': ['15px', '1.6'],
        'lg': ['18px', '1.5'],
        'xl': ['20px', '1.4'],
        '2xl': ['24px', '1.3'],
        '3xl': ['30px', '1.2'],
        '4xl': ['36px', '1.1'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

