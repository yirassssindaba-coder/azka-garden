import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react';
import { Plant } from '../types';
import { getPlantById } from '../services/database';
import { useCart } from '../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadPlant = async () => {
      if (!id) return;
      
      try {
        const plantData = await getPlantById(id);
        setPlant(plantData);
      } catch (error) {
        console.error('Error loading plant:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlant();
  }, [id]);

  const handleAddToCart = () => {
    if (!plant) return;
    
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity
    });
    
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-32 mb-6 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded"></div>
              <div className="bg-gray-300 h-4 rounded"></div>
              <div className="bg-gray-300 h-16 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
          <Link to="/products" className="text-green-600 hover:underline">
            Kembali ke katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali ke Produk
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{plant.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(4.8) • 124 ulasan</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-green-600">
              Rp {plant.price.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed">{plant.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Spesifikasi</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Kategori:</span>
                <span className="ml-2 text-gray-600">{plant.category}</span>
              </div>
              <div>
                <span className="font-medium">Tinggi:</span>
                <span className="ml-2 text-gray-600">{plant.height}</span>
              </div>
              <div>
                <span className="font-medium">Perawatan:</span>
                <span className="ml-2 text-gray-600">{plant.care_level}</span>
              </div>
              <div>
                <span className="font-medium">Penyiraman:</span>
                <span className="ml-2 text-gray-600">{plant.watering_frequency}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Tambah ke Keranjang
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Tips Perawatan</h4>
            <p className="text-green-700 text-sm">{plant.care_instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;