import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import fs from "fs";
import fsPromises from "fs/promises";
import { createLayersIfNotExists } from "../../src/createLayers.js";

describe("#Layers - Folder Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#Should create folders if it doesn't exists", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });
  test("#Should not create folders if it exists", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
