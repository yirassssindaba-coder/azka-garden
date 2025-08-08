import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Crown, Package, CreditCard, Calendar } from 'lucide-react';
import { stripeProducts, StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { StripeService } from '../services/stripe';

const StripeProducts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Mock subscription and orders data
      setSubscription({
        price_id: 'price_premium_monthly',
        subscription_status: 'active',
        current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days from now
      });
      setOrders([
        {
          order_id: 1,
          checkout_session_id: 'cs_test_example123',
          amount_total: 2333, // $23.33 in cents
          order_status: 'completed',
          order_date: new Date().toISOString()
        }
      ]);
    }
  }, [isAuthenticated]);


  const handlePurchase = async (product: StripeProduct) => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk melakukan pembelian');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate successful checkout
      const sessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
      window.location.href = `${window.location.origin}/stripe-success?session_id=${sessionId}`;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name: string) => {
    if (name.toLowerCase().includes('bonsai')) return '🌳';
    if (name.toLowerCase().includes('pot')) return '🏺';
    if (name.toLowerCase().includes('batu')) return '🪨';
    if (name.toLowerCase().includes('media')) return '🌱';
    if (name.toLowerCase().includes('kaktus')) return '🌵';
    return '🌿';
  };

  const getCareLevel = (description: string) => {
    if (description.includes('pemula') || description.includes('mudah dirawat')) return 'Mudah';
    if (description.includes('perawatan khusus') || description.includes('bonsai')) return 'Sulit';
    return 'Sedang';
  };

  const getCategoryFromName = (name: string) => {
    if (name.toLowerCase().includes('bonsai')) return 'Bonsai';
    if (name.toLowerCase().includes('pot')) return 'Pot & Aksesoris';
    if (name.toLowerCase().includes('batu')) return 'Dekorasi Taman';
    if (name.toLowerCase().includes('media')) return 'Media Tanam';
    if (name.toLowerCase().includes('kaktus')) return 'Kaktus & Sukulen';
    return 'Tanaman Hias';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price * 15000); // Convert USD to IDR (approximate rate)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Koleksi Premium Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Tanaman hias berkualitas tinggi dengan sistem berlangganan untuk perawatan berkelanjutan
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* User Subscription Status */}
        {isAuthenticated && subscription && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Crown className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Status Berlangganan</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {subscription.price_id ? (
                      <>
                        <span className="font-medium">
                          {StripeService.getProductByPriceId(subscription.price_id)?.name || 'Paket Berlangganan'}
                        </span>
                        {' - '}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subscription.subscription_status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {StripeService.getSubscriptionStatusLabel(subscription.subscription_status)}
                        </span>
                      </>
                    ) : (
                      'Belum ada berlangganan aktif'
                    )}
                  </p>
                </div>
              </div>
              {subscription.current_period_end && (
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Berlaku hingga</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {new Date(subscription.current_period_end * 1000).toLocaleDateString('id-ID')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <div key={product.priceId} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 flex items-center justify-center">
                  <div className="text-6xl">{getCategoryIcon(product.name)}</div>
                </div>
                
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium">
                    {getCategoryFromName(product.name)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getCareLevel(product.description) === 'Mudah' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : getCareLevel(product.description) === 'Sulit'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {getCareLevel(product.description)}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.mode === 'subscription' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {product.mode === 'subscription' ? 'Berlangganan' : 'Sekali Bayar'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatPrice(product.price)}
                    </div>
                    {product.mode === 'subscription' && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">per bulan</div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    USD ${product.price}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(product)}
                  disabled={loading}
                  className="w-full bg-green-600 dark:bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    'Memproses...'
                  ) : (
                    <>
                      {product.mode === 'subscription' ? (
                        <Calendar className="h-5 w-5 mr-2" />
                      ) : (
                        <ShoppingCart className="h-5 w-5 mr-2" />
                      )}
                      {product.mode === 'subscription' ? 'Berlangganan Sekarang' : 'Beli Sekarang'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        {isAuthenticated && orders.length > 0 && (
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Riwayat Pembelian</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.order_id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Order #{order.checkout_session_id.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.order_date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ${(order.amount_total / 100).toFixed(2)}
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      order.order_status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {StripeService.getOrderStatusLabel(order.order_status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Authentication CTA */}
        {!isAuthenticated && (
          <div className="mt-16 bg-green-50 dark:bg-green-900 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Mulai Berlangganan Tanaman Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Login untuk mengakses koleksi premium dan sistem berlangganan tanaman hias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Login & Mulai Berlangganan
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 dark:text-green-400 font-semibold rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeProducts;