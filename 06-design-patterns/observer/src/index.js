import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubscriber from "./subscribers/paymentSubscriber.js";

const subscribe = new PaymentSubscriber();

const marketing = new Marketing();
subscribe.subscribe(marketing);

const shipment = new Shipment();
subscribe.subscribe(shipment);

const payment = new Payment(subscribe);
payment.creditCard({ userName: "Lucas Livero", id: Date.now() });

subscribe.unsubscribe(marketing);
payment.creditCard({ userName: "Bob Marley", id: Date.now() });
