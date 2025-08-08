import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Leaf, Heart, TrendingUp, Award, Star, ArrowRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Plant } from '../../types';
import { getPlants } from '../../services/database';

const PlantShowcase: React.FC = () => {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const plants = await getPlants();
      setAllPlants(plants);
    } catch (error) {
      console.error('Error loading plants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Categorize plants for showcase
  const premiumPlants = allPlants.filter(plant => plant.price >= 500000).slice(0, 3);
  const budgetPlants = allPlants.filter(plant => plant.price <= 50000).slice(0, 4);
  const easyCarePlants = allPlants.filter(plant => plant.care_level === 'Sangat Mudah').slice(0, 4);
  const floweringPlants = allPlants.filter(plant => plant.category === 'Tanaman Berbunga').slice(0, 4);
  const bonsaiCollection = allPlants.filter(plant => plant.category === 'Bonsai');
  const indoorPlants = allPlants.filter(plant => plant.category === 'Tanaman Indoor').slice(0, 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-16">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="bg-gray-300 h-8 w-64 mb-6 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="bg-white rounded-lg shadow-md p-4">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Premium Collection */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white rounded-2xl p-8 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Koleksi Premium Eksklusif</h2>
            <p className="text-xl text-purple-100">
              Bonsai dan tanaman langka untuk kolektor sejati
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {premiumPlants.map((plant) => (
              <div key={plant.id} className="relative group">
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-3 py-1 rounded-full font-bold z-10">
                  PREMIUM
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <ProductCard plant={plant} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/products?category=4"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
            >
              Lihat Semua Koleksi Premium
              <Crown className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Easy Care Plants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect untuk Pemula</h2>
          <p className="text-lg text-gray-600">
            Tanaman super mudah perawatan yang cocok untuk yang baru memulai
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {easyCarePlants.map((plant) => (
            <div key={plant.id} className="relative">
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                SANGAT MUDAH
              </div>
              <ProductCard plant={plant} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/products?care=easy"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Lihat Semua Tanaman Mudah
            <Leaf className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Flowering Plants */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🌸</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tanaman Berbunga Cantik</h2>
            <p className="text-lg text-gray-600">
              Percantik taman Anda dengan tanaman berbunga yang menawan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {floweringPlants.map((plant) => (
              <div key={plant.id} className="relative">
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  BERBUNGA
                </div>
                <ProductCard plant={plant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ramah di Kantong</h2>
          <p className="text-lg text-gray-600">
            Tanaman berkualitas dengan harga mulai dari Rp10.000
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetPlants.map((plant) => (
            <div key={plant.id} className="relative">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                HEMAT
              </div>
              <ProductCard plant={plant} />
            </div>
          ))}
        </div>
      </section>

      {/* Bonsai Spotlight */}
      {bonsaiCollection.length > 0 && (
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mx-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Koleksi Bonsai Eksklusif</h2>
              <p className="text-lg text-gray-600">
                Seni tanaman miniatur untuk kolektor dan pecinta bonsai
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bonsaiCollection.map((plant) => (
                <div key={plant.id} className="relative group">
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                    BONSAI MASTER
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <ProductCard plant={plant} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Indoor Plants Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tanaman Indoor Favorit</h2>
          <p className="text-lg text-gray-600">
            Hijaukan ruang dalam rumah Anda dengan tanaman indoor pilihan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indoorPlants.slice(0, 6).map((plant) => (
            <ProductCard key={plant.id} plant={plant} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/products?category=1"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Lihat Semua Tanaman Indoor
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-900 text-white rounded-2xl p-8 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Azka Garden dalam Angka</h2>
            <p className="text-xl text-gray-300">Kepercayaan pelanggan adalah prioritas utama kami</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{allPlants.length}+</div>
              <div className="text-gray-300">Jenis Tanaman</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10k+</div>
              <div className="text-gray-300">Pelanggan Puas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">4.9</div>
              <div className="text-gray-300">Rating Bintang</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">99%</div>
              <div className="text-gray-300">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantShowcase;