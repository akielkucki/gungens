module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          accent: '#F5CC00',
        },
        dark: {
          DEFAULT: '#121212',
          darker: '#0A0A0A',
        },
      },
    },
  },
  plugins: [],
}
