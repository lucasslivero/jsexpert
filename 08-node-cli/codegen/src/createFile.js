import fsPromises from "fs/promises";
import templates from "./templates/index.js";
import Util from "./util.js";

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };
  return dependencies[layer].map(Util.lowerCaseFirstLetter);
};

async function writeFiles(files) {
  return Promise.all(files.map(({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)));
}

export async function createFile({ mainPath, defaultFolder, layers, componentName }) {
  const keys = Object.keys(templates);
  const pendingWriteFiles = [];
  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key.includes(layer));
    if (!chosenTemplate) {
      return { error: "the chosen layer doesn't have template" };
    }

    const template = templates[chosenTemplate];
    const targetFolder = `${mainPath}/${defaultFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);
    const { fileName: txtFileName, template: txtFile } = template(componentName, ...dependencies);
    const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(txtFileName)}.js`;
    pendingWriteFiles.push({ fileName, txtFile });
  }

  await writeFiles(pendingWriteFiles);
  return { success: true };
}
