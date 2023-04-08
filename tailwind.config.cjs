/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xs: '30em',
      sm: '48em',
      // => @media (min-width: 640px) { ... }

      md: '64em',
      // => @media (min-width: 768px) { ... }

      lg: '74em',
      // => @media (min-width: 1024px) { ... }

      xl: '90em',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

module.exports = config;
