import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

import CartIdNew from "./cart-id-new.js";
import CartIdOld from "./cart-id-old.js";
suite
  .add("Cart#uuid", function () {
    new CartIdOld();
  })
  .add("Cart#crypto", function () {
    new CartIdNew();
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run();

// const data = {
//   products: [
//     {
//       id: "1234",
//       a: undefined,
//       b: undefined,
//       c: undefined,
//       d: undefined,
//     },
//     {
//       id: "4567",
//       a: undefined,
//       b: undefined,
//       c: undefined,
//       d: undefined,
//     },
//   ],
// };

// import CartPropNew from "./cart-rm-prop-new.js";
// import CartPropOld from "./cart-rm-prop-old.js";
// suite
//   .add("Cart#MapReduce", function () {
//     new CartPropOld(data);
//   })
//   .add("Cart#For", function () {
//     new CartPropNew(data);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

// import database from "../database.js";
// import CartPriceNew from "./cart-price-new.js";
// import CartPriceOld from "./cart-price-old.js";
// suite
//   .add("Cart#PriceMapReduce", function () {
//     new CartPriceOld(database);
//   })
//   .add("Cart#PriceFor", function () {
//     new CartPriceNew(database);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });
