import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  define: { 'import.meta.vitest': false },
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['tests/setup.ts'],
    includeSource: ['**/*.ts'],
    //=>にマッチするファイルだけtest include: ['**/testUtils.test.ts'],
    threads: false,
    hookTimeout: 15000,
  },
})
