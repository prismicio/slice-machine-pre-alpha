module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'html-closing-bracket-newline': 'off',
    'valid-v-for': 'off', // breaks in my TextEditor
    'html-self-closing': 'off',
    'arrow-parens': ["error", "as-needed"]
  }
}
