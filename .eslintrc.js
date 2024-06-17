module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'next',
    'prettier',
    'plugin:@next/next/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
  }
}
