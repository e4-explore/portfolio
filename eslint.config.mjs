import { defineConfig, globalIgnores } from "eslint/config"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

export default defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([
    ".next/**",
    ".next-dev-*/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Common in marketing/portfolio copy.
      "react/no-unescaped-entities": "off",
      // Common pattern for hydration-safe UI (e.g. theme toggles) in Next.js apps.
      "react-hooks/set-state-in-effect": "off",
    },
  },
])

