/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/style/tailwind.css',
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'none'
}
