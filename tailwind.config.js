module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    safelist: [
      'print:block',
      'print:shadow-none',
      'print:page-break-after',
      'no-print'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  