import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import fsPromises from "fs/promises";
import { createFile } from "../../src/createFile.js";
import templates from "../../src/templates/index.js";

describe("#Files Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  const config = {
    mainPath: "./",
    defaultFolder: "src",
    layers: defaultLayers,
    componentName: "heroes",
  };
  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#Should not create file structure on inexistent templates", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };
    const expected = { error: "the chosen layer doesn't have template" };
    const result = await createFile(myConfig);
    expect(result).toStrictEqual(expected);
  });
  test("Repository should not add any additional dependencies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });
    const myConfig = {
      ...config,
      layers: ["repository"],
    };
    const expected = { success: true };
    const result = await createFile(myConfig);
    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName);
  });
  test("Service should have repository as dependency", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };
    const expected = { success: true };
    const result = await createFile(myConfig);
    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer);
  });
  test("Factory should have repository and service as dependency", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });
    const myConfig = {
      ...config,
    };
    const expected = { success: true };
    const result = await createFile(myConfig);
    expect(result).toStrictEqual(expected);

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
