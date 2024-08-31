import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createFile } from "../../src/createFile.js";
import { createLayersIfNotExists } from "../../src/createLayers.js";
import Util from "../../src/util.js";

function generateFilePath({ mainPath, defaultFolder, layers, componentName }) {
  return layers.map((layer) => {
    const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
    return join(mainPath, defaultFolder, layer, filename);
  });
}

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    (method) => method !== "constructor"
  );
}

describe("#Integration - Files - Folders Structure", () => {
  const config = {
    defaultFolder: "src",
    mainPath: "",
    layers: ["service", "factory", "repository"].sort(),
    componentName: "heroes",
  };
  const packageJSONPath = join("./test/integration/mocks/package.json");

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
    await fsPromises.copyFile(packageJSONPath, join(config.mainPath, "package.json"));
    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Repository class should have CRUD methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };
    await createFile(myConfig);

    const [repositoryFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const instance = new Repository();
    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual("Method not implemented !");

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.update);
    expectNotImplemented(instance.delete);
  });
  test("Service class should have the same signature of repository and call all its methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };
    await createFile(myConfig);
    const [repositoryFile, serviceFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const repository = new Repository();
    const service = new Service({ repository });

    const repositoryMethods = getAllFunctionsFromInstance(repository);
    repositoryMethods.forEach((method) => jest.spyOn(repository, method).mockResolvedValue());
    getAllFunctionsFromInstance(service).forEach((method) => service[method].call(service, []));
    repositoryMethods.forEach((method) => expect(repository[method]).toHaveBeenCalled());
  });
  test("Factory instance should match layers", async () => {
    const myConfig = {
      ...config,
    };
    await createFile(myConfig);
    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);
    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
