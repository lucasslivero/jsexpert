import { Product } from "../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) {
        continue;
      }

      // let newObject = {};
      // keys.forEach((key) => {
      //   if (!keys[key]) {
      //     return;
      //   }
      //   newObject[key] = keys[key];
      // });
      // productsEntities.push(new Product(newObject));

      // keys.forEach((key) => product[key] || delete product[key]);
      keys.forEach((key) => product[key] || Reflect.deleteProperty(product, key));
      productsEntities.push(new Product(product));

      // productsEntities.push(JSON.parse(JSON.stringify(new Product(product))));
    }

    return productsEntities;
  }
}
