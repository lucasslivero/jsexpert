import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import Character from "../../src/entities/character.js";

describe("#rickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharactersJSON should return a list of Character Entity", async () => {
    const response = JSON.parse(await fs.readFile("./test/mocks/characters.json"));
    const expected = response.results.map((char) => new Character(char));
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
  test("#getCharactersJSON should return an empty list if the API return nothing", async () => {
    const response = JSON.parse(await fs.readFile("./test/mocks/characters-empty.json"));
    const expected = response.results;
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
});
