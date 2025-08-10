import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || 'Terjadi kesalahan pada pembayaran');
        onError(error.message || 'Terjadi kesalahan pada pembayaran');
      } else {
        setMessage('Terjadi kesalahan yang tidak terduga');
        onError('Terjadi kesalahan yang tidak terduga');
      }
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">Informasi Pembayaran</h3>
        </div>
        
        <PaymentElement options={paymentElementOptions} />
      </div>

      {message && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400 text-sm">{message}</p>
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
        disabled={isLoading || !stripe || !elements}
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
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

export default CheckoutForm;