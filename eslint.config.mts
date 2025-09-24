// eslint.config.mts
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // JS files
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
    ...js.configs.recommended,
    ...prettierConfig,
  },

  // TS files
  ...tseslint.configs.recommended,

  // Prettier plugin for all files
  {
    files: ['src/**/*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}'],
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn', // or "error"
    },
  },
])
