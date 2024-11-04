import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      },
      baseUrl: 'http://localhost:3000', // Set your base URL here
      supportFile: 'cypress/support/e2e.ts', // Path to your support file
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});