import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored third-party code served as static files (three.js for the 3D ability card).
    "public/vendor/**",
    // Supabase Edge Functions run on Deno with their own imports; they are not part of the Next.js app.
    "supabase/**",
  ]),
]);

export default eslintConfig;
