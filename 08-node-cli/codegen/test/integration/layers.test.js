import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createLayersIfNotExists } from "../../src/createLayers.js";

async function getFolders({ mainPath, defaultFolder }) {
  return await fsPromises.readdir(join(mainPath, defaultFolder));
}

describe("#Integration - Layers - Folders Structure", () => {
  const config = {
    defaultFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
  };
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Should not create folders if it exists", async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  test("Should create folders if it doesn't exists", async () => {
    const beforeRun = await getFolders(config);
    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(afterRun).toEqual(beforeRun);
  });
});
