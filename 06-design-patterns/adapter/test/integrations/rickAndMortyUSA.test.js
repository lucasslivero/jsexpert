import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";
import Character from "../../src/entities/character.js";

describe("#rickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharactersXML should return a list of Character Entity", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");
    const {
      results: { element: results = [] },
    } = await parseStringPromise(response, {
      explicitRoot: false,
      explicitArray: false,
    });
    const defaultFormat = Array.isArray(results) ? results : [results];
    const expected = defaultFormat.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(expected).toStrictEqual(result);
  });
  test("#getCharactersJSON should return an empty list if the API return nothing", async () => {
    const response = await fs.readFile("./test/mocks/characters-empty.xml");
    const {
      results: { element: results = [] },
    } = await parseStringPromise(response, {
      explicitRoot: false,
      explicitArray: false,
    });
    const defaultFormat = Array.isArray(results) ? results : [results];
    const expected = defaultFormat.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(expected).toStrictEqual(result);
  });
});
