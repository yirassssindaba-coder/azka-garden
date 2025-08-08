export class PaymentException extends Error {
  constructor(message: string, public paymentId?: string) {
    super(message);
    this.name = 'PaymentException';
  }
}