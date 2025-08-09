import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo');

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
    try {
      // In production, this would call your backend API
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      // Fallback to mock for demo
      const mockPaymentIntent: PaymentIntent = {
        id: 'pi_' + Date.now(),
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: 'requires_payment_method',
        client_secret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 9)
      };

      return mockPaymentIntent;
    }
  }

  static async confirmPayment(paymentIntentId: string, paymentMethod?: any): Promise<{ success: boolean; error?: string }> {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

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
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Terjadi kesalahan pada pembayaran'
      };
    }
  }

  static async createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'payment') {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/stripe-products`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      // Fallback to mock success for demo
      const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
      window.location.href = `/success?session_id=${sessionId}`;
    }
  }
}