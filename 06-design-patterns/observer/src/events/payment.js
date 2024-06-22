export default class Payment {
  constructor(paymentSubscriber) {
    this.paymentSubscriber = paymentSubscriber;
  }

  creditCard(paymentData) {
    console.log(`\na payment ocurred from ${paymentData.userName}`);
    this.paymentSubscriber.notify(paymentData);
  }
}
