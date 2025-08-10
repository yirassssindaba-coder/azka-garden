import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Crown, Package, CreditCard, Calendar, Star, Shield, Zap, X, CheckCircle } from 'lucide-react';
import { stripeProducts, StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { StripeService } from '../services/stripe';
import StripeCheckout from '../components/stripe/StripeCheckout';
import SubscriptionManager from '../components/stripe/SubscriptionManager';
import { useNewsletter } from '../contexts/NewsletterContext';

const StripeProducts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<StripeProduct | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { isSubscribed, subscriberEmail } = useNewsletter();

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
    if (!isSubscribed) {
      alert('Silakan berlangganan newsletter terlebih dahulu untuk mengakses produk premium. Scroll ke bawah dan masukkan email Anda di bagian Newsletter.');
      return;
    }
    
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk melakukan pembelian');
      return;
    }

    setSelectedProduct(product);
    setShowCheckout(true);
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Leaf className="h-16 w-16 text-green-200" />
              <Crown className="h-16 w-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Koleksi Premium Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Tanaman hias berkualitas tinggi dengan sistem pembayaran yang aman dan fleksibel
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span className="text-green-100 text-sm">Pembayaran Aman</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-green-100 text-sm">Kualitas Terjamin</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <span className="text-green-100 text-sm">Pengiriman Cepat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Subscription Manager */}
        {isAuthenticated && subscription && (
          <div className="mb-8">
            <SubscriptionManager />
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <div key={product.priceId} className="bg-green-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-black">
              <div className="relative">
                <div className="h-48 bg-green-100 flex items-center justify-center border-b border-black">
                  <div className="text-6xl">{getCategoryIcon(product.name)}</div>
                </div>
                
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-medium border border-black">
                    {getCategoryFromName(product.name)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getCareLevel(product.description) === 'Mudah' 
                      ? 'bg-green-100 text-green-800'
                      : getCareLevel(product.description) === 'Sulit'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </div>
                    {product.mode === 'subscription' && (
                      <div className="text-sm text-gray-500">per bulan</div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    USD ${product.price}
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(product)}
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center border border-black"
                >
                  {product.mode === 'subscription' ? (
                    <Calendar className="h-5 w-5 mr-2" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 mr-2" />
                  )}
                  Beli Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        {isAuthenticated && orders.length > 0 && (
          <div className="mt-16 bg-green-50 rounded-xl shadow-lg p-6 border-2 border-black">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pembelian</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.order_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full border border-black">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Order #{order.checkout_session_id.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(order.order_date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${(order.amount_total / 100).toFixed(2)}
                    </div>
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      order.order_status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
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
        {!isAuthenticated && !isSubscribed && (
          <div className="mt-16 bg-red-50 rounded-xl p-8 text-center mobile-card mobile-padding">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mobile-text-sm">
              Berlangganan Newsletter untuk Akses Premium
            </h3>
            <p className="text-gray-600 mb-6 mobile-text-xs">
              Masukkan email Anda di bagian Newsletter di bawah untuk mengakses koleksi premium dan sistem berlangganan tanaman hias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mobile-btn"
              >
                Berlangganan Newsletter
              </button>
            </div>
          </div>
        )}
        
        {!isAuthenticated && isSubscribed && (
          <div className="mt-16 bg-green-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mobile-text-sm">
              Mulai Berlangganan Tanaman Premium
            </h3>
            <p className="text-gray-600 mb-6 mobile-text-xs">
              Login untuk mengakses koleksi premium dan sistem berlangganan tanaman hias
            </p>
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2 justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Newsletter: {subscriberEmail}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mobile-btn"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Login & Mulai Berlangganan
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors mobile-btn"
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        )}
        
        {/* Subscribed User - Show Products Available for Purchase */}
        {isAuthenticated && isSubscribed && (
          <div className="mt-16 bg-green-50 rounded-2xl p-8 text-center border-2 border-black shadow-xl">
            <div className="bg-white rounded-xl p-6 mb-6 border border-black">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg border border-black">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Akses Premium Aktif</h3>
                  <p className="text-gray-700 font-medium">Newsletter: {subscriberEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg border border-black">
                  <Shield className="h-5 w-5 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Pembayaran Aman</div>
                  <div className="text-gray-600">SSL & Enkripsi</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-black">
                  <Star className="h-5 w-5 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Kualitas Terjamin</div>
                  <div className="text-gray-600">Garansi Hidup</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-black">
                  <Zap className="h-5 w-5 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Pengiriman Cepat</div>
                  <div className="text-gray-600">1-3 Hari</div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 font-medium">
              🎉 Selamat! Anda dapat membeli semua produk premium di bawah ini
            </p>
          </div>
        )}
      </div>

      {/* Stripe Checkout Modal */}
      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Checkout</h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <StripeCheckout
                priceId={selectedProduct.priceId}
                productName={selectedProduct.name}
                amount={selectedProduct.price}
                mode={selectedProduct.mode}
                onSuccess={() => {
                  setShowCheckout(false);
                  setSelectedProduct(null);
                }}
                onError={(error) => {
                  alert(error);
                  setShowCheckout(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeProducts;