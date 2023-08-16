const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // to-do: ENV for baseURL
    baseUrl: 'https://morgan-development-online-store.myshopify.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  experimentalWebKitSupport: true
});
