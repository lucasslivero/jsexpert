import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

const order = new Order({
  customerId: "f6043ac0-8a57-4ffd-b278-01d1252a31f9",
  amount: 800.0,
  products: [{ description: "Apartment" }],
});
const orderBusiness = new OrderBusiness();
console.info("OrderCreated", orderBusiness.create(order));
