const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests', 
  testMatch: ['**/*.ts'],
  timeout: 30000, 
  retries: 2, 
  use: {
    baseURL: 'http://localhost:3000',
    headless: true, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    
  ],
});