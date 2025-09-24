import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS files
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", "prettier"],
    languageOptions: { globals: globals.browser },
  },
  // TS files
  tseslint.configs.recommended,
  // Prettier plugin for all JS/TS
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}"],
    plugins: { prettier: require("eslint-plugin-prettier") },
    rules: {
      "prettier/prettier": ["warn"], // or "error"
    },
  },
]);
