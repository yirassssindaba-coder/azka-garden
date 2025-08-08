// Mock Stripe implementation for development
const stripePromise = Promise.resolve({
  elements: () => ({
    create: () => ({
      mount: () => {},
      on: () => {},
      destroy: () => {}
    }),
    getElement: () => null
  }),
  createPaymentMethod: () => Promise.resolve({
    paymentMethod: { id: 'pm_mock' },
    error: null
  }),
  confirmCardPayment: () => Promise.resolve({
    paymentIntent: { status: 'succeeded' },
    error: null
  })
});

export default stripePromise;

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface StripePaymentData {
  orderId: string;
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: any;
}

export class StripeService {
  static async createPaymentIntent(paymentData: StripePaymentData): Promise<PaymentIntent> {
    // Simulate Stripe API call
    const mockPaymentIntent: PaymentIntent = {
      id: 'pi_' + Date.now(),
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: 'requires_payment_method',
      client_secret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 9)
    };

    return mockPaymentIntent;
  }

  static async confirmPayment(paymentIntentId: string): Promise<{ success: boolean; error?: string }> {
    // Simulate payment confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Pembayaran gagal. Silakan coba lagi atau gunakan metode pembayaran lain.' 
      };
    }
  }
}