import { Product } from "./product.js";

export class Cart {
  constructor({ at, products }) {
    this.id = crypto.randomUUID();
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice();
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(productsEntities));
  }

  getCartPrice() {
    return this.products.map((products) => products.price).reduce((prev, next) => prev + next, 0);
  }
}
