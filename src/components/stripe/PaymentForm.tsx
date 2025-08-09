import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  customerInfo
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe belum siap. Silakan coba lagi.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Elemen kartu tidak ditemukan.');
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Create payment intent (this would typically be done on your server)
      const paymentIntent = await createPaymentIntent(amount, currency, paymentMethod.id);

      // Confirm payment
      const { error: confirmError, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (confirmedPaymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        onSuccess(confirmedPaymentIntent);
      } else {
        throw new Error('Pembayaran tidak berhasil');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada pembayaran';
      setPaymentError(errorMessage);
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const createPaymentIntent = async (amount: number, currency: string, paymentMethodId: string) => {
    // This would typically call your backend API
    // For demo purposes, we'll return a mock payment intent
    return {
      id: 'pi_' + Date.now(),
      client_secret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 9),
      amount,
      currency,
      status: 'requires_confirmation'
    };
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#666EE8',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Pembayaran Berhasil!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Terima kasih atas pembayaran Anda. Pesanan sedang diproses.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">Informasi Kartu</h3>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {paymentError && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400 text-sm">{paymentError}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            Pembayaran Anda diproses dengan aman menggunakan enkripsi SSL 256-bit
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {processing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Memproses Pembayaran...</span>
          </div>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-2" />
            Bayar {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(amount)}
          </>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;