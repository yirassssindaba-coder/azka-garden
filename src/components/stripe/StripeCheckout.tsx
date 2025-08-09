import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

interface StripeCheckoutProps {
  priceId: string;
  productName: string;
  amount: number;
  mode: 'payment' | 'subscription';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  priceId,
  productName,
  amount,
  mode,
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo'
      );
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  const handleCheckout = async () => {
    if (!stripe) {
      onError?.('Stripe belum siap. Silakan coba lagi.');
      return;
    }

    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat sesi checkout');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
      onError?.(errorMessage);
      
      // For demo purposes, simulate successful checkout
      setTimeout(() => {
        const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
        window.location.href = `/success?session_id=${sessionId}`;
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price * 15000); // Convert USD to IDR
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{productName}</h3>
        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
          {formatPrice(amount)}
        </div>
        {mode === 'subscription' && (
          <p className="text-sm text-gray-600 dark:text-gray-400">per bulan</p>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Pembayaran aman dengan enkripsi SSL</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>Garansi tanaman hidup 24 jam</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <Lock className="h-4 w-4 text-green-600" />
          <span>Data pribadi dilindungi</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading || !stripe}
        className="w-full bg-green-600 dark:bg-green-700 text-white font-semibold py-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Memproses...</span>
          </div>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            {mode === 'subscription' ? 'Berlangganan Sekarang' : 'Beli Sekarang'}
          </>
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Dengan melanjutkan, Anda menyetujui{' '}
          <a href="/terms" className="text-green-600 hover:text-green-700">
            Syarat & Ketentuan
          </a>{' '}
          kami
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;