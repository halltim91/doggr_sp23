module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // This is so that we can use promisify on Node's http methods
    "default-param-last": "error",
    "newline-per-chained-call": "error",
    "no-return-await": "error",
    "no-console": "off",
    "consistent-return": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    // These flip based on dev convenience vs prod safety
    // Change "off" to "error" for prod config
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
}
