import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Plant } from '../../types';
import { productRecommendation } from '../../ai/recommendation/ProductRecommendation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface ProductRecommendationsProps {
  type: 'personalized' | 'similar' | 'frequently-bought';
  productId?: string;
  userId?: string;
  title?: string;
  limit?: number;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  type,
  productId,
  userId,
  title,
  limit = 4
}) => {
  const [recommendations, setRecommendations] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    loadRecommendations();
  }, [type, productId, userId]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      let results: Plant[] = [];

      switch (type) {
        case 'personalized':
          results = await productRecommendation.getPersonalizedRecommendations(
            userId || user?.id || 'anonymous',
            limit
          );
          break;
        case 'similar':
          if (productId) {
            results = await productRecommendation.getSimilarProducts(productId, limit);
          }
          break;
        case 'frequently-bought':
          if (productId) {
            results = await productRecommendation.getFrequentlyBoughtTogether(productId);
          }
          break;
      }

      setRecommendations(results);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'personalized':
        return 'Rekomendasi Untuk Anda';
      case 'similar':
        return 'Produk Serupa';
      case 'frequently-bought':
        return 'Sering Dibeli Bersamaan';
      default:
        return 'Rekomendasi Produk';
    }
  };

  const handleAddToCart = (plant: Plant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity: 1
    });
  };

  const handleAddToWishlist = (plant: Plant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // TODO: Implement wishlist functionality
    console.log('Added to wishlist:', plant.name);
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title || getDefaultTitle()}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-300 h-6 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title || getDefaultTitle()}</h2>
        {type === 'personalized' && (
          <Link
            to="/products"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Lihat Semua
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((plant) => (
          <Link
            key={plant.id}
            to={`/products/${plant.id}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* AI Badge */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                AI Rekomendasi
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleAddToWishlist(plant, e)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                <button
                  onClick={(e) => handleAddToCart(plant, e)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-green-50 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 text-gray-600 hover:text-green-500" />
                </button>
              </div>

              {/* Stock Badge */}
              {plant.stock <= 5 && plant.stock > 0 && (
                <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Stok Terbatas
                </div>
              )}
              
              {plant.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Stok Habis
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {plant.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {plant.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {plant.care_level}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-green-600">
                    Rp {plant.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Stok: {plant.stock}
                </div>
              </div>

              {/* Care Info */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>💧 {plant.watering_frequency}</span>
                <span>📏 {plant.height}</span>
              </div>

              {/* Recommendation Reason */}
              {type === 'personalized' && (
                <div className="mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  Cocok dengan preferensi Anda
                </div>
              )}
              
              {type === 'similar' && (
                <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Perawatan serupa
                </div>
              )}
              
              {type === 'frequently-bought' && (
                <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Sering dibeli bersamaan
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* AI Explanation */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full">
            <Star className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Rekomendasi AI yang Dipersonalisasi
            </h4>
            <p className="text-sm text-gray-600">
              {type === 'personalized' && 
                'Berdasarkan riwayat browsing, preferensi, dan perilaku pengguna serupa dengan Anda.'
              }
              {type === 'similar' && 
                'Produk dengan karakteristik dan kebutuhan perawatan yang mirip.'
              }
              {type === 'frequently-bought' && 
                'Produk yang sering dibeli bersamaan oleh pelanggan lain.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;