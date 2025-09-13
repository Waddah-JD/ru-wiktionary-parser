import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["**/build"] },
  {
    files: ["**/*.ts"],
    plugins: {
      js,
      "unused-imports": unusedImports,
      import: importPlugin,
    },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "off",
      "func-style": ["warn", "declaration"],
      "lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "never", prev: "field", next: "field" },
            { blankLine: "always", prev: "method", next: "method" },
          ],
        },
      ],
      "no-multi-spaces": "error",
      "import/extensions": ["error", "ignorePackages", { js: "always", ts: "never" }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "@typescript-eslint/naming-convention": ["warn", { selector: "import", format: ["camelCase", "PascalCase"] }],
      "@typescript-eslint/explicit-function-return-type": "error",
      "unused-imports/no-unused-imports": "error",
    },
  },
  tseslint.configs.recommended,
]);
