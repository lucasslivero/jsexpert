export default class Cart {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice();
  }

  getCartPrice() {
    return this.products.map((products) => products.price).reduce((prev, next) => prev + next, 0);
  }
}
