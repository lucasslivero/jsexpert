import fs from "fs";
import fsPromises from "fs/promises";

export async function createLayersIfNotExists({ mainPath, defaultFolder, layers }) {
  const defaultPath = `${mainPath}/${defaultFolder}`;
  const foldersToCreate = layers.filter((layer) => !fs.existsSync(layer));
  const results = foldersToCreate.map((folder) =>
    fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true })
  );
  return Promise.all(results);
}
