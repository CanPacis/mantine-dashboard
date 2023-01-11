module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxBracketSameLine: true,
  quoteProps: 'consistent',
  trailingComma: 'es5',
  useTabs: false,
  arrowParens: 'avoid',
  bracketSpacing: true,
  importOrder: [
    '^.*(.css)$',
    '^react(.*)$',
    '^@mantine/(.*)$',
    '^@(pages|components|stores|utils|assets|config)/(.*)$',
    '^[./]',
    '<THIRD_PARTY_MODULES>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
};