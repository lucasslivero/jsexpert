export default class PaymentSubscriber {
  #observers = new Set();

  notify(data) {
    this.#observers.forEach((observer) => observer.update(data));
  }

  unsubscribe(observable) {
    this.#observers.delete(observable);
  }

  subscribe(observable) {
    this.#observers.add(observable);
  }
}
