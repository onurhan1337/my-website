const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: false
  },
  component: {
    testFiles: "**/*.test.{js,ts,jsx,tsx}",
    componentFolder: "components"

  }
})
