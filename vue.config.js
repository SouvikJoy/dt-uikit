const path = require("path");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/debuggervue/showcase/" : "/",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "debuggervue/card": path.resolve(
          __dirname,
          "src/components/card/Card.vue"
        ),
        "debuggervue/accordion": path.resolve(
          __dirname,
          "src/components/accordion/Accordion.vue"
        ),
        "debuggervue/accordiontab": path.resolve(
          __dirname,
          "src/components/accordiontab/AccordionTab.vue"
        ),
        "debuggervue/api": path.resolve(__dirname, "src/components/api/Api.js"),
      },
    },
    output: {
      libraryExport: "default",
    },
  },
  css: {
    extract: false,
  },
};
