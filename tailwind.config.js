/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    extend: {
      colors: {
        virtual: {
          50: '#D9ED92',
          100: '#B5E48C',
          200: '#99D98C',
          300: '#76C893',
          400: '#52B69A',
          500: '#34A0A4',
          600: '#168AAD',
          700: '#1A759F',
          800: '#1E6091',
          900: '#184E77',
        },
      }
    },
  },
  plugins: [],
}
