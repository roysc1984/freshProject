module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    jest: true,
    mocha: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'no-inline-styles', 'prettier'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  ignorePatterns: [
    'node_modules',
    'package.json',
    'package-lock.json',
    'metro.config.js',
    'index.js',
    'app.json',
    '__mocks__',
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-inline-styles/no-inline-styles': 2,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-void': ['error', { allowAsStatement: true }],
    'max-len': [2, { code: 120 }],
    'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],
    'react/jsx-key': [2, { checkFragmentShorthand: true }],
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 1,
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'eslint@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    'no-case-declarations': 'off',
  },
};
