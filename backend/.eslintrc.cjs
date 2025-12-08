module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: 'script' },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['import'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.cjs'] }
    }
  }
}

