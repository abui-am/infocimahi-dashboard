/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "airbnb-typescript",
        "plugin:tailwindcss/recommended",
        "next/core-web-vitals",
        "plugin:prettier/recommended",
      ],
      files: ["*.ts", "*.tsx", "*.mjs"],
      plugins: [
        "@typescript-eslint",
        "unused-imports",
        "tailwindcss",
        "simple-import-sort",
      ],
      rules: {
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
              prefer: "type-imports",
              fixStyle: "inline-type-imports",
            },
          ],
        "react/require-default-props": "off",
        "react/function-component-definition": "off",
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
          },
        ],
        "no-void" : "off",
        "react/no-array-index-key": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@next/next/no-img-element": "off",
        "react/display-name": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-console": "warn",
        "react/jsx-props-no-spreading": "off",
        // no-extraneous-dependencies conflict with rtl being installed in dev
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
        "import/no-anonymous-default-export": "off",
        "no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
          },
        ],
        "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
        "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
        "prettier/prettier": [
          "error",
          {
            singleQuote: true,
            endOfLine: "auto",
          },
        ],
        "@typescript-eslint/no-use-before-define": "off",
        "react/no-unstable-nested-components": [
          "warn",
          {
            allowAsProps: true,
          },
        ],
        "tailwindcss/no-custom-classname": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  globals: {
    JSX: "readonly",
  },
  extends: ["airbnb", "next/core-web-vitals", "plugin:prettier/recommended"],
};

module.exports = config;
