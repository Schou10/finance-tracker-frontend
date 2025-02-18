module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/react-in-jsx-scope": "off", // Not needed for React 17+
    "no-console": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true },
    ],
    "jsx-a11y/anchor-is-valid": "off",
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", "public/"],
};