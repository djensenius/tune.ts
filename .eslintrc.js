module.exports = {
  globals: {
    performance: 'readonly',
    __DEV__: 'readonly',
    fetch: false,
  },
  root: true,
  env: { 'jest/globals': true, browser: true },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: '9999999999999999',
    },
    'import/resolver': {
      webpack: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'promise/prefer-await-to-then': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1 }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-shadow': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': ['error', { code: 120 }],
    indent: ['error', 2],
    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
    }],
  },
  overrides: [{
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-param-reassign': [2, { props: false }],
      'max-len': ['error', { code: 200 }],
    },
  }],
};
