import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar, ArrowRight, Leaf } from 'lucide-react';
import { StripeService } from '../services/stripe';

const StripeSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      loadSuccessData();
    }
  }, [sessionId]);

  const loadSuccessData = async () => {
    try {
      // Refresh user subscription data
      const subscriptionData = await StripeService.getUserSubscription();
      setSubscription(subscriptionData);
    } catch (error) {
      console.error('Error loading success data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memproses pembayaran Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
          {/* Success Icon */}
          <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pembayaran Berhasil!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Terima kasih atas kepercayaan Anda pada Azka Garden. Pesanan Anda sedang diproses dengan penuh perhatian.
          </p>

          {/* Order Details */}
          {sessionId && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Session ID:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{sessionId.slice(-12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tanggal:</span>
                  <span className="text-gray-900 dark:text-white">{new Date().toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    Berhasil
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Info */}
          {subscription && subscription.subscription_status === 'active' && (
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Berlangganan Aktif
                </h3>
              </div>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                {subscription.price_id && StripeService.getProductByPriceId(subscription.price_id)?.name}
              </p>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Periode berlangganan Anda akan diperpanjang otomatis setiap bulan.
                Anda dapat mengelola berlangganan melalui halaman profil.
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Langkah Selanjutnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <Package className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Persiapan Pengiriman</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tim kami akan mempersiapkan tanaman Anda dengan packaging khusus
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Panduan Perawatan</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Anda akan menerima panduan perawatan lengkap via email
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Konfirmasi Email</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Receipt dan detail pesanan telah dikirim ke email Anda
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/stripe-products"
              className="flex-1 bg-green-600 dark:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors flex items-center justify-center"
            >
              Jelajahi Koleksi Lainnya
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/profile"
              className="flex-1 border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition-colors flex items-center justify-center"
            >
              Kelola Berlangganan
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ada pertanyaan tentang pesanan Anda?
            </p>
            <a
              href="https://wa.me/6289635086182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
            >
              Hubungi Customer Service
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeSuccess;