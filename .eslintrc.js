module.exports = {
  env: {
    es2021: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'func-names': 0,
    'no-underscore-dangle': [2, { allow: true }],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal'],
      },
    ],
  },

  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
