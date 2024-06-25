import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapater.js";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";

describe("#rickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyBRL", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(result).toEqual([]);

    expect(brlIntegration).toHaveBeenCalled();
  });
});
