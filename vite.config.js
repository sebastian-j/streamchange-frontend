import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  base: '/giveaway/',
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    reporters: ['default', 'github-actions'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'cobertura'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'giveaway-assets/js/[name]-[hash].js',
        chunkFileNames: 'giveaway-assets/js/[name]-[hash].js',

        assetFileNames: 'giveaway-assets/assets/[name]-[hash][extname]',
      },
    },
  },
});
