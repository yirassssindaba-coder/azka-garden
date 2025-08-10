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
    // Langsung ke checkout tanpa requirement login atau newsletter
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const getCategoryIcon = (name: string) => {
    if (name.toLowerCase().includes('bonsai')) return 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg';
    if (name.toLowerCase().includes('pot')) return 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg';
    if (name.toLowerCase().includes('batu')) return 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg';
    if (name.toLowerCase().includes('media')) return 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg';
    if (name.toLowerCase().includes('kaktus')) return 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg';
    if (name.toLowerCase().includes('cemara')) return 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg';
    if (name.toLowerCase().includes('bunga') || name.toLowerCase().includes('alamanda') || name.toLowerCase().includes('gestrum')) return 'https://images.pexels.com/photos/1084200/pexels-photo-1084200.jpeg';
    if (name.toLowerCase().includes('lidah mertua')) return 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg';
    if (name.toLowerCase().includes('anthurium') || name.toLowerCase().includes('kuping gajah')) return 'https://images.pexels.com/photos/7084308/pexels-photo-7084308.jpeg';
    if (name.toLowerCase().includes('philodendron') || name.toLowerCase().includes('pakis')) return 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg';
    if (name.toLowerCase().includes('bringin') || name.toLowerCase().includes('sikas')) return 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg';
    return 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg';
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
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Leaf className="h-16 w-16 text-green-600" />
              <Crown className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-black">Koleksi Premium Azka Garden</h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              47+ Tanaman hias premium dengan sistem pembayaran Stripe yang aman dan berlangganan bulanan
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-black text-sm">Stripe SSL Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-green-600" />
                <span className="text-black text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="text-black text-sm">Monthly Delivery</span>
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
            <div key={product.priceId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="relative">
                <div className="h-48 border-b border-green-200">
                  <img
                    src={getCategoryIcon(product.name)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-green-100 text-black px-2 py-1 rounded-full text-xs font-medium border border-green-200">
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
                <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-black text-sm mb-4 line-clamp-3 leading-relaxed">
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
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
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
          <div className="mt-16 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6">Riwayat Pembelian</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.order_id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-black">
                        Order #{order.checkout_session_id.slice(-8)}
                      </div>
                      <div className="text-sm text-black">
                        {new Date(order.order_date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-black">
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

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg">
          <h3 className="text-2xl font-bold text-black mb-4">
            Koleksi Premium Tersedia untuk Semua
          </h3>
          <p className="text-black mb-6">
            Semua produk premium dapat dibeli langsung tanpa perlu login atau berlangganan newsletter
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-lg border border-gray-200">
              <Shield className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-black">Pembayaran Aman</div>
              <div className="text-black">SSL & Enkripsi Stripe</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-gray-200">
              <Star className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-black">Kualitas Terjamin</div>
              <div className="text-black">Garansi Hidup 24 Jam</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-gray-200">
              <Zap className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-black">Pengiriman Cepat</div>
              <div className="text-black">1-3 Hari Kerja</div>
            </div>
          </div>
        </div>
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