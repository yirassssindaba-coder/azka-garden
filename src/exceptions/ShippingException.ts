export class ShippingException extends Error {
  constructor(message: string, public shippingId?: string) {
    super(message);
    this.name = 'ShippingException';
  }
}