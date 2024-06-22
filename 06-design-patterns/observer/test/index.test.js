import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import Payment from "../src/events/payment.js";
import Marketing from "../src/observers/marketing.js";
import Shipment from "../src/observers/shipment.js";
import PaymentSubscriber from "../src/subscribers/paymentSubscriber.js";

describe("Test Suite for Observer Pattern", () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });
  test("#PaymentSubscriber notify observers", () => {
    const subscriber = new PaymentSubscriber();
    const observer = {
      update: jest.fn(),
    };

    const data = "Hello world";
    const expected = data;

    subscriber.subscribe(observer);
    subscriber.notify(data);

    expect(observer.update).toBeCalledWith(expected);
  });
  test("#PaymentSubscriber should not notify unsubscribed observers", () => {
    const subscriber = new PaymentSubscriber();
    const observer = {
      update: jest.fn(),
    };

    const data = "Hello world";

    subscriber.subscribe(observer);
    subscriber.unsubscribe(observer);
    subscriber.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });
  test("#PaymentSubscriber should notify observer after a credit card transaction", () => {
    const subscriber = new PaymentSubscriber();
    const payment = new Payment(subscriber);

    const paymentSubscriberNotifySpy = jest.spyOn(
      payment.paymentSubscriber,
      payment.paymentSubscriber.notify.name
    );
    const data = { userName: "Lucas Livero", id: Date.now() };
    payment.creditCard(data);

    expect(paymentSubscriberNotifySpy).toBeCalledWith(data);
  });
  test("#All should notify subscribers after a credit card payment", () => {
    const subscriber = new PaymentSubscriber();
    const shipment = new Shipment();
    const marketing = new Marketing();

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);

    subscriber.subscribe(shipment);
    subscriber.subscribe(marketing);

    const payment = new Payment(subscriber);
    const data = { userName: "Lucas Livero", id: Date.now() };
    payment.creditCard(data);

    expect(shipmentSpy).toBeCalledWith(data);
    expect(marketingSpy).toBeCalledWith(data);
  });
});
