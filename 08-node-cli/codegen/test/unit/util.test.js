import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import Util from "../../src/util.js";

describe("#Util - String", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#UpperCaseFirstLetter should transform the first letter in upperCase", () => {
    const data = "hello";
    const expected = "Hello";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
  test("#LowerCaseFirstLetter should transform the first letter in lowerCase", () => {
    const data = "Hello";
    const expected = "hello";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
  test("#UpperCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
  test("#LowerCaseFirstLetter given an empty string it should return empty", () => {
    const data = "";
    const expected = "";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toStrictEqual(expected);
  });
});
