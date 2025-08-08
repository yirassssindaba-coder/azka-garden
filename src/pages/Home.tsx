import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Star } from 'lucide-react';
import FeaturedCollections from '../components/catalog/FeaturedCollections';
import PlantShowcase from '../components/catalog/PlantShowcase';
import { Plant } from '../types';
import { getFeaturedPlants } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadFeaturedPlants = async () => {
      try {
        const plants = await getFeaturedPlants(); // Get featured plants
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
                Koleksi lengkap 59+ tanaman hias berkualitas premium dari Jamani Dolar hingga Bonsai eksklusif. 
                Dari tanaman indoor mudah perawatan hingga koleksi premium untuk kolektor sejati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Jelajahi 59+ Tanaman
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                  Pelajari Lebih Lanjut
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">59+</div>
                  <div className="text-green-200 text-sm">Jenis Tanaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">7</div>
                  <div className="text-green-200 text-sm">Kategori</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-green-200 text-sm">Pelanggan Puas</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg"
                alt="Beautiful plants"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">4.9/5</span>
                  <span className="text-gray-600 text-sm">Rating Pelanggan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Azka Garden?</h2>
            <p className="text-lg text-gray-600">Komitmen kami untuk memberikan yang terbaik</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">59+ Varietas Premium</h3>
              <p className="text-gray-600">
                Dari Jamani Dolar hingga Bonsai eksklusif, semua tanaman dipilih dengan teliti untuk kualitas optimal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Panduan Perawatan Lengkap</h3>
              <p className="text-gray-600">
                Setiap tanaman dilengkapi panduan perawatan detail dari frekuensi penyiraman hingga tips khusus.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600">
                Mulai dari Rp10.000 hingga koleksi premium. Ada tanaman untuk setiap budget dan kebutuhan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Showcase */}
      <PlantShowcase />

      {/* Price Range Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tanaman untuk Setiap Budget</h2>
            <p className="text-lg text-gray-600">Dari yang terjangkau hingga koleksi eksklusif</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Friendly</h3>
              <p className="text-gray-600 mb-4">Rp10.000 - Rp50.000</p>
              <p className="text-sm text-gray-500 mb-6">
                Tanaman berkualitas dengan harga terjangkau untuk pemula
              </p>
              <Link
                to="/products?price=budget"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Lihat Koleksi
              </Link>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mid Range</h3>
              <p className="text-gray-600 mb-4">Rp50.000 - Rp500.000</p>
              <p className="text-sm text-gray-500 mb-6">
                Tanaman berkualitas tinggi untuk penggemar tanaman hias
              </p>
              <Link
                to="/products?price=mid"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Jelajahi Koleksi
              </Link>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">👑</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Collection</h3>
              <p className="text-gray-600 mb-4">Rp500.000+</p>
              <p className="text-sm text-gray-500 mb-6">
                Bonsai eksklusif dan tanaman langka untuk kolektor sejati
              </p>
              <Link
                to="/products?price=premium"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Koleksi Eksklusif
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;