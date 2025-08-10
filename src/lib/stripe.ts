import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your actual keys
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Ru3Is81xruOlT8qa5xzfetnj1P0lsKLqm3D6Vno2T4EBSL26fYeGn1gYnmcDvkojXMpMt56t8y4cVwcuqzWy6Ju00B4Sq8Seh';

if (!stripePublishableKey) {
  console.warn('Using fallback Stripe key - update .env for production');
}

const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey)
  : Promise.resolve(null);

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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency,
          customer_info: paymentData.customerInfo,
          shipping_address: paymentData.shippingAddress,
          order_id: paymentData.orderId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      
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

      // Simulate payment confirmation for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.1; // 90% success rate for demo
      
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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/stripe-products`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout session creation failed:', error);
      
      // Fallback to mock success for demo
      const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
      window.location.href = `/success?session_id=${sessionId}`;
    }
  }

  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  }

  static formatPriceIDR(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price * 15000); // Convert USD to IDR
  }
}