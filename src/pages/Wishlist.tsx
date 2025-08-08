import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Plant } from '../types';
import { getPlants } from '../services/database';
import { useCart } from '../contexts/CartContext';

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      // Simulate wishlist with some featured plants
      const plants = await getPlants();
      setWishlistItems(plants.slice(0, 3)); // Mock wishlist with first 3 plants
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (plantId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== plantId));
  };

  const handleAddToCart = (plant: Plant) => {
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity: 1
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 w-64 mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Wishlist Kosong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Belum ada tanaman favorit di wishlist Anda. Mulai tambahkan sekarang!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Jelajahi Tanaman
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wishlist Saya</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {wishlistItems.length} tanaman favorit Anda
            </p>
          </div>
          <Link
            to="/products"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Tambah Tanaman
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((plant) => (
            <div key={plant.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(plant.id)}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {plant.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {plant.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    Rp {plant.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {plant.care_level}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/products/${plant.id}`}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-center py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;