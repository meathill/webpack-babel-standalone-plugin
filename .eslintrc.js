module.exports = {
  "env": {
    "node": true,
    "es2021": true,
    commonjs: true,
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  plugins: ['sonarjs'],
  "extends": [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
  ],
};
