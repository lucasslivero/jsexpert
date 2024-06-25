import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapater.js";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";

describe("#rickAndMortyUSA", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyUSA", async () => {
    const USAIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(result).toEqual([]);

    expect(USAIntegration).toHaveBeenCalled();
  });
});
