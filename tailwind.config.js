/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // look in layout, sections, snippets, templates, customers folders for files with .liquid extension
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/customers/*.liquid',
    './templates/*.liquid'
  ],
  theme: {
    extend: {
      height: {
        '94' : '22rem'
      }
    },
  },
  plugins: [],
}