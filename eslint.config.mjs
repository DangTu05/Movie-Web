import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": 1,
      "no-lonely-if": 1,
      "no-unused-vars": 1,
      "no-trailing-spaces": 1,
      "no-multi-spaces": 1,
      "no-multiple-empty-lines": 1,
      "space-before-blocks": ["error", "always"],
      "object-curly-spacing": [1, "always"],
      indent: ["warn", 2],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "array-bracket-spacing": 1,
      "linebreak-style": 0,
      "no-unexpected-multiline": "warn",
      "keyword-spacing": 1,
      "comma-dangle": 0,
      "comma-spacing": 1,
      "arrow-spacing": 1,
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          trailingComma: "none",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          printWidth: 120,
          singleQuote: false,
          semi: true
        }
      ],
      env: {
        browser: true
      }
    },
    ignores: ["**/node_modules/", "**/dist/"]
  }
];
