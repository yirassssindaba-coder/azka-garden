import { supabase } from '../lib/supabase';
import { stripeProducts, getProductByPriceId } from '../stripe-config';

export interface CheckoutSessionRequest {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export interface UserOrder {
  customer_id: string;
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: 'pending' | 'completed' | 'canceled';
  order_date: string;
}

export class StripeService {
  private static async getAuthToken(): Promise<string> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('User not authenticated');
      }
      return session.access_token;
    } catch (error) {
      // Fallback for demo mode
      return 'demo_token_' + Date.now();
    }
  }

  static async createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    try {
      const token = await this.getAuthToken();
      
      // Try to call Supabase edge function
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            price_id: request.priceId,
            mode: request.mode,
            success_url: request.successUrl,
            cancel_url: request.cancelUrl,
          }),
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (fetchError) {
        console.log('Supabase function not available, using fallback');
      }

      // Fallback for demo
      const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
      return {
        sessionId,
        url: `${request.successUrl.replace('{CHECKOUT_SESSION_ID}', sessionId)}`
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // Fallback for demo
      const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
      return {
        sessionId,
        url: `${request.successUrl.replace('{CHECKOUT_SESSION_ID}', sessionId)}`
      };
    }
  }

  static async getUserSubscription(): Promise<UserSubscription | null> {
    try {
      // Check session first
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', !!session);
      
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Fetch subscription failure detail', {
          url: import.meta.env.VITE_SUPABASE_URL,
          hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
          message: error?.message || error
        });
        
        if (error.message?.includes('Failed to fetch')) {
          // Network-level problem
          throw new Error('Network fetch to Supabase failed. Periksa URL/Key atau koneksi.');
        }
        
        // Only return mock for non-network errors (query issues)
        if (!error.message?.includes('Failed to fetch')) {
          console.log('Using mock data for demo (non-network error)');
          return {
            customer_id: 'cus_demo',
            subscription_id: 'sub_demo',
            subscription_status: 'active',
            price_id: 'price_1Rtp3SRMKiPOXCTjlAUBfQiI',
            current_period_start: Math.floor(Date.now() / 1000),
            current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
            cancel_at_period_end: false,
            payment_method_brand: 'visa',
            payment_method_last4: '4242'
          };
        }
        
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unhandled getUserSubscription error:', error);
      
      if ((error as any)?.message?.includes('Failed to fetch')) {
        throw new Error('Network connection to Supabase failed');
      }
      
      return null;
    }
  }

  static async getUserOrders(): Promise<UserOrder[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Getting orders for session:', !!session);
      
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Fetch orders failure detail', {
          url: import.meta.env.VITE_SUPABASE_URL,
          hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
          message: error?.message || error
        });
        
        if (error.message?.includes('Failed to fetch')) {
          throw new Error('Network fetch to Supabase failed');
        }
        
        // Only mock for non-network errors
        if (!error.message?.includes('Failed to fetch')) {
          return [
            {
              customer_id: 'cus_demo',
              order_id: 1,
              checkout_session_id: 'cs_test_demo123',
              payment_intent_id: 'pi_demo123',
              amount_subtotal: 2000,
              amount_total: 2333,
              currency: 'usd',
              payment_status: 'paid',
              order_status: 'completed',
              order_date: new Date().toISOString()
            }
          ];
        }
        
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unhandled getUserOrders error:', error);
      
      if ((error as any)?.message?.includes('Failed to fetch')) {
        throw new Error('Network connection to Supabase failed');
      }
      
      return [];
    }
  }

  static getProducts() {
    return stripeProducts;
  }

  static getProductByPriceId(priceId: string) {
    return getProductByPriceId(priceId);
  }

  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  }

  static getSubscriptionStatusLabel(status: string): string {
    switch (status) {
      case 'not_started':
        return 'Belum Dimulai';
      case 'incomplete':
        return 'Tidak Lengkap';
      case 'incomplete_expired':
        return 'Kadaluarsa';
      case 'trialing':
        return 'Masa Percobaan';
      case 'active':
        return 'Aktif';
      case 'past_due':
        return 'Terlambat';
      case 'canceled':
        return 'Dibatalkan';
      case 'unpaid':
        return 'Belum Dibayar';
      case 'paused':
        return 'Dijeda';
      default:
        return status;
    }
  }

  static getOrderStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'completed':
        return 'Selesai';
      case 'canceled':
        return 'Dibatalkan';
      default:
        return status;
    }
  }
}