import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const fs = require("fs-extra");
const path = require("path");

let entries = [];

let core = {};

let coreDependencies = {
  "debuggervue/utils": "debuggervue.utils",
  "debuggervue/api": "debuggervue.api",
  "debuggervue/config": "debuggervue.config",
};

let globalDependencies = {
  vue: "Vue",
  ...coreDependencies,
};

function addEntry(folder, inFile, outFile) {
  let useCorePlugin = Object.keys(coreDependencies).some(
    (d) => d.replace("debuggervue/", "") === outFile
  );

  entries.push({
    input: "src/components/" + folder + "/" + inFile,
    output: [
      {
        format: "cjs",
        file: "dist/" + folder + "/" + outFile + ".cjs.js",
      },
      {
        format: "esm",
        file: "dist/" + folder + "/" + outFile + ".esm.js",
      },
      {
        format: "iife",
        name: "debuggervue." + folder,
        file: "dist/" + folder + "/" + outFile + ".js",
        globals: globalDependencies,
      },
    ],
    plugins: [vue(), postcss(), useCorePlugin && corePlugin()],
  });

  entries.push({
    input: "src/components/" + folder + "/" + inFile,
    output: [
      {
        format: "cjs",
        file: "dist/" + folder + "/" + outFile + ".cjs.min.js",
      },
      {
        format: "esm",
        file: "dist/" + folder + "/" + outFile + ".esm.min.js",
      },
      {
        format: "iife",
        name: "debuggervue." + folder,
        file: "dist/" + folder + "/" + outFile + ".min.js",
        globals: globalDependencies,
      },
    ],
    plugins: [
      vue(),
      peerDepsExternal(),
      postcss(),
      terser(),
      useCorePlugin && corePlugin(),
    ],
  });
}

function corePlugin() {
  return {
    name: "corePlugin",
    generateBundle(outputOptions, bundle) {
      if (outputOptions.format === "iife") {
        Object.keys(bundle).forEach((id) => {
          const chunk = bundle[id];
          const name = id.replace(".min.js", "").replace(".js", "");
          const filePath = `./dist/core/core${
            id.indexOf(".min.js") > 0 ? ".min.js" : ".js"
          }`;

          core[filePath]
            ? (core[filePath][name] = chunk.code)
            : (core[filePath] = { [`${name}`]: chunk.code });
        });
      }
    },
  };
}

function addCore() {
  const lastEntry = entries[entries.length - 1];

  lastEntry.plugins = [
    ...lastEntry.plugins,
    {
      name: "coreMergePlugin",
      generateBundle() {
        Object.entries(core).forEach(([filePath, value]) => {
          const code = Object.keys(coreDependencies).reduce((val, d) => {
            const name = d.replace("debuggervue/", "");
            val += value[name] + "\n";

            return val;
          }, "");

          fs.outputFile(
            path.resolve(__dirname, filePath),
            code,
            {},
            function (err) {
              if (err) {
                return console.error(err);
              }
            }
          );
        });
      },
    },
  ];
}

function addSFC() {
  fs.readdirSync(path.resolve(__dirname, "./src/components/"), {
    withFileTypes: true,
  })
    .filter((dir) => dir.isDirectory())
    .forEach(({ name: folderName }) => {
      fs.readdirSync(
        path.resolve(__dirname, "./src/components/" + folderName)
      ).forEach((file) => {
        let name = file.split(/(.vue)$|(.js)$/)[0].toLowerCase();
        if (/\.vue$/.test(file) && name === folderName) {
          addEntry(folderName, file, name);
        }
      });
    });
}

function addConfig() {
  addEntry("config", "DebuggerVue.js", "config");
}

function addUtils() {
  addEntry("utils", "Utils.js", "utils");
}

function addApi() {
  addEntry("api", "Api.js", "api");
}

addUtils();
addApi();
addConfig();
addSFC();
addCore();

export default entries;
