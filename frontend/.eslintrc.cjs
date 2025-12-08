module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off'
  }
}

