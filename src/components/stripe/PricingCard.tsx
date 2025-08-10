import React from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { StripeProduct } from '../../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  onSelect: (product: StripeProduct) => void;
  isPopular?: boolean;
  isRecommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  product, 
  onSelect, 
  isPopular = false,
  isRecommended = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price * 15000); // Convert USD to IDR
  };

  const getFeatures = (description: string) => {
    // Extract features from description
    const features = [
      'Tanaman berkualitas premium',
      'Panduan perawatan lengkap',
      'Garansi hidup 24 jam',
      'Packaging aman & rapi'
    ];

    if (description.includes('bonsai')) {
      features.push('Perawatan khusus bonsai');
      features.push('Konsultasi ahli bonsai');
    }

    if (description.includes('pot')) {
      features.push('Pot berkualitas tinggi');
      features.push('Drainase optimal');
    }

    return features.slice(0, 4);
  };

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isPopular ? 'border-green-500 scale-105' : 'border-gray-200 dark:border-gray-700'
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>TERPOPULER</span>
          </div>
        </div>
      )}

      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Crown className="h-3 w-3" />
            <span>REKOMENDASI</span>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {product.mode === 'subscription' ? 'per bulan' : 'sekali bayar'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            USD ${product.price}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {getFeatures(product.description).map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-1">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(product)}
          className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
            isPopular
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {product.mode === 'subscription' ? (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Beli Sekarang
            </>
          ) : (
            <>
              <Crown className="h-5 w-5 mr-2" />
              Beli Sekarang
            </>
          )}
        </button>

        {/* Trust Indicators */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Aman</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Terpercaya</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Berkualitas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;