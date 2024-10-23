export default class Cart {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice();
  }

  getCartPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }

    return total;
  }
}
