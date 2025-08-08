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
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
                <Leaf className="h-5 w-5 text-green-200 mr-2" />
                <span className="text-green-100 text-sm font-medium">Toko Tanaman Hias #1 di Indonesia</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Hijaukan Rumah Anda dengan 
                <span className="text-gradient bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent"> Tanaman Hias Terbaik</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed animate-slide-up">
                Koleksi lengkap 59+ tanaman hias berkualitas premium dari Jamani Dolar hingga Bonsai eksklusif. 
                Dari tanaman indoor mudah perawatan hingga koleksi premium untuk kolektor sejati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Jelajahi 59+ Tanaman
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300">
                  Pelajari Lebih Lanjut
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in">
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">59+</div>
                  <div className="text-green-200 text-sm font-medium">Jenis Tanaman</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">7</div>
                  <div className="text-green-200 text-sm font-medium">Kategori</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">10k+</div>
                  <div className="text-green-200 text-sm font-medium">Pelanggan Puas</div>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg"
                alt="Beautiful plants"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl animate-slide-up">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900 text-lg">4.9/5</span>
                  <span className="text-gray-600 text-sm font-medium">Rating Pelanggan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih Azka Garden?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Komitmen kami untuk memberikan yang terbaik bagi pecinta tanaman hias di Indonesia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">59+ Varietas Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Dari Jamani Dolar hingga Bonsai eksklusif, semua tanaman dipilih dengan teliti untuk kualitas optimal.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Panduan Perawatan Lengkap</h3>
              <p className="text-gray-600 leading-relaxed">
                Setiap tanaman dilengkapi panduan perawatan detail dari frekuensi penyiraman hingga tips khusus.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Harga Terjangkau</h3>
              <p className="text-gray-600 leading-relaxed">
                Mulai dari Rp10.000 hingga koleksi premium. Ada tanaman untuk setiap budget dan kebutuhan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Showcase */}
      <PlantShowcase />

      {/* Price Range Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tanaman untuk Setiap Budget</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Dari yang terjangkau hingga koleksi eksklusif untuk semua kalangan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Budget Friendly</h3>
              <p className="text-green-600 font-bold text-lg mb-4">Rp10.000 - Rp50.000</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tanaman berkualitas dengan harga terjangkau untuk pemula
              </p>
              <Link
                to="/products?price=budget"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Lihat Koleksi
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-6">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mid Range</h3>
              <p className="text-blue-600 font-bold text-lg mb-4">Rp50.000 - Rp500.000</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tanaman berkualitas tinggi untuk penggemar tanaman hias
              </p>
              <Link
                to="/products?price=mid"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Jelajahi Koleksi
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-6">👑</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Collection</h3>
              <p className="text-purple-600 font-bold text-lg mb-4">Rp500.000+</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bonsai eksklusif dan tanaman langka untuk kolektor sejati
              </p>
              <Link
                to="/products?price=premium"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg"
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