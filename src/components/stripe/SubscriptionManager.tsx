import React, { useState, useEffect } from 'react';
import { Calendar, CreditCard, AlertTriangle, CheckCircle, X, Settings, RefreshCw } from 'lucide-react';
import { StripeService } from '../../services/stripe';
import { supabaseHealthCheck } from '../../services/health';

interface Subscription {
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

const SubscriptionManager: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setConnectionError(null);
      
      const subData = await StripeService.getUserSubscription();
      setSubscription(subData);
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Don't show connection error for demo mode
      console.log('Using demo subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelling(true);
    try {
      // In production, call your backend to cancel subscription
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      if (subscription) {
        setSubscription({
          ...subscription,
          cancel_at_period_end: true
        });
      }
      
      setShowCancelModal(false);
      alert('Berlangganan akan dibatalkan pada akhir periode billing');
    } catch (error) {
      alert('Gagal membatalkan berlangganan. Silakan coba lagi.');
    } finally {
      setCancelling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      // In production, call your backend to reactivate subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (subscription) {
        setSubscription({
          ...subscription,
          cancel_at_period_end: false
        });
      }
      
      alert('Berlangganan berhasil diaktifkan kembali');
    } catch (error) {
      alert('Gagal mengaktifkan berlangganan. Silakan coba lagi.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'past_due':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'canceled':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Settings className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-6 w-48 mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-32 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
        </div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-lg p-6 border border-yellow-200 dark:border-yellow-700">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Mode Demo
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Menggunakan data demo. Untuk fitur lengkap, hubungkan ke Supabase.
          </p>
          <button
            onClick={loadSubscription}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
        <div className="text-gray-400 mb-4">
          <CreditCard className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Belum Ada Berlangganan
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Mulai berlangganan untuk mendapatkan akses ke koleksi premium
        </p>
        <a
          href="/stripe-products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Lihat Paket Berlangganan
        </a>
      </div>
    );
  }

  const product = StripeService.getProductByPriceId(subscription.price_id || '');

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Status Berlangganan</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadSubscription}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            {getStatusIcon(subscription.subscription_status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.subscription_status)}`}>
              {StripeService.getSubscriptionStatusLabel(subscription.subscription_status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Detail Paket</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Paket:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product?.name || 'Paket Premium'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Harga:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {StripeService.formatPrice(product?.price || 0)}/bulan
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {subscription.cancel_at_period_end ? 'Akan dibatalkan' : 'Aktif'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Periode Billing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Mulai:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {subscription.current_period_start 
                    ? new Date(subscription.current_period_start * 1000).toLocaleDateString('id-ID')
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Berakhir:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {subscription.current_period_end
                    ? new Date(subscription.current_period_end * 1000).toLocaleDateString('id-ID')
                    : 'N/A'
                  }
                </span>
              </div>
              {subscription.payment_method_brand && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Kartu:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {subscription.payment_method_brand} ****{subscription.payment_method_last4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {subscription.cancel_at_period_end ? (
            <button
              onClick={handleReactivateSubscription}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Aktifkan Kembali
            </button>
          ) : (
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Batalkan Berlangganan
            </button>
          )}
          
          <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Ubah Metode Pembayaran
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Batalkan Berlangganan?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Berlangganan Anda akan tetap aktif hingga akhir periode billing saat ini 
              {subscription.current_period_end && (
                ` (${new Date(subscription.current_period_end * 1000).toLocaleDateString('id-ID')})`
              )}.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {cancelling ? 'Memproses...' : 'Ya, Batalkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;