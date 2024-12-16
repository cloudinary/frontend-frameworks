module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['standard', 'standard-react', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:storybook/recommended'],
  env: {
    node: true
  },
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: '16'
    }
  },
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/no-unused-prop-types': 0,
    'import/export': 0,
    'no-unused-vars': 'off',
    semi: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/switch-exhaustiveness-check': 'error'
  }
};
