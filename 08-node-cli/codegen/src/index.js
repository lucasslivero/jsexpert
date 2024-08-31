#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createFile } from "./createFile.js";
import { createLayersIfNotExists } from "./createLayers.js";

const {
  argv: { componentName },
} = yargs(hideBin(process.argv))
  .command("skeleton", "create project skeleton", (builder) => {
    return builder
      .option("component-name", {
        alias: "c",
        demandOption: true,
        describe: "Component's name",
        type: "array",
      })
      .example("skeleton --component-name product", "Create a project with a single domain")
      .example(
        "skeleton -c product -c person -c colors",
        "Create a project with a list of domains"
      );
  })
  .epilog("copyright 2024 - Lucas Livero Corp");

const env = process.env.NODE_ENV;
const defaultFolder = env === "dev" ? "tmp" : "src";
const layers = ["repository", "service", "factory"].sort();
const config = {
  layers,
  defaultFolder,
  mainPath: ".",
};

await createLayersIfNotExists(config);
const pendingWriteFiles = [];
for (const domain of componentName) {
  const result = createFile({
    ...config,
    componentName: domain,
  });
  pendingWriteFiles.push(result);
}
await Promise.all(pendingWriteFiles);
