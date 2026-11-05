/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#f6f3ee',
        card: '#ffffff',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27, 25, 20, 0.04), 0 4px 16px rgba(27, 25, 20, 0.06)',
      },
    },
  },
  plugins: [],
}
