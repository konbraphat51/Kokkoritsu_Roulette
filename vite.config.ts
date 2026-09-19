import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Deployed under https://<user>.github.io/<repo>/ on GitHub Pages,
// so assets must be resolved from a sub-path in production builds.
const repositoryName = 'Kokkoritsu_Roulette'

// Keyed on the mode rather than the command so that `vite preview`, which runs
// in production mode, serves the same sub-path the deployed site uses.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repositoryName}/` : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
  },
}))
