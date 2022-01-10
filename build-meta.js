const { copySync, readdirSync } = require("fs-extra");
const path = require("path");

readdirSync(path.resolve(__dirname, "./src/components/"), {
  withFileTypes: true,
})
  .filter((dir) => dir.isDirectory())
  .forEach(({ name: folderName }) => {
    readdirSync(
      path.resolve(__dirname, "./src/components/" + folderName)
    ).forEach((file) => {
      if (
        file === "package.json" ||
        file.endsWith("d.ts") ||
        file.endsWith("vue")
      ) {
        copySync(
          path.resolve(__dirname, "./src/components/" + folderName) +
            "/" +
            file,
          "dist/" + folderName + "/" + file
        );
      }
    });
  });

copySync(
  path.resolve(__dirname, "./src/components/ts-helpers.d.ts"),
  "dist/ts-helpers.d.ts"
);
copySync(path.resolve(__dirname, "./package-build.json"), "dist/package.json");
copySync(path.resolve(__dirname, "./README.md"), "dist/README.md");
copySync(path.resolve(__dirname, "./LICENSE.md"), "dist/LICENSE.md");
