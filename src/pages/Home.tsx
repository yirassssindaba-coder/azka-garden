import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Plant } from '../types';
import { getPlants } from '../services/database';

const Home: React.FC = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPlants = async () => {
      try {
        const plants = await getPlants(6); // Get first 6 plants for featured section
        setFeaturedPlants(plants);
      } catch (error) {
        console.error('Error loading featured plants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPlants();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Hijaukan Rumah Anda dengan 
                <span className="text-green-200"> Tanaman Hias Terbaik</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Koleksi lengkap tanaman hias berkualitas untuk mempercantik ruang hidup Anda. 
                Dari tanaman indoor hingga outdoor, semua ada di sini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Lihat Produk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg"
                alt="Beautiful plants"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terbaik</h3>
              <p className="text-gray-600">
                Semua tanaman dipilih dengan teliti untuk memastikan kualitas dan kesehatan optimal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Perawatan Mudah</h3>
              <p className="text-gray-600">
                Kami menyediakan panduan perawatan lengkap untuk setiap tanaman.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garansi Kepuasan</h3>
              <p className="text-gray-600">
                Kepuasan Anda adalah prioritas utama kami dengan layanan terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tanaman Pilihan</h2>
            <p className="text-lg text-gray-600">
              Koleksi tanaman hias terpopuler dan terfavorit pelanggan
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPlants.map((plant) => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;