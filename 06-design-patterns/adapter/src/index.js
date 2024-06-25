import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapater.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapater.js";

const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map((adapter) =>
  adapter.getCharacters()
);

const result = await Promise.allSettled(data);

const success = result
  .filter(({ status }) => status === "fulfilled")
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

const errors = result.filter(({ status }) => status === "rejected");

console.table(success);
console.table(errors);
