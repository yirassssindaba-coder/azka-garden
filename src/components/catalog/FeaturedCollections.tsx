import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Crown, Leaf, Heart } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Plant } from '../../types';
import { getFeaturedPlants, getPremiumPlants, getBudgetPlants } from '../../services/database';

const FeaturedCollections: React.FC = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [premiumPlants, setPremiumPlants] = useState<Plant[]>([]);
  const [budgetPlants, setBudgetPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const [featured, premium, budget] = await Promise.all([
        getFeaturedPlants(),
        getPremiumPlants(),
        getBudgetPlants()
      ]);
      
      setFeaturedPlants(featured);
      setPremiumPlants(premium);
      setBudgetPlants(budget);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-16">
          {[...Array(3)].map((_, i) => (
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Featured Plants */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Tanaman Pilihan</h2>
              <p className="text-gray-600">Koleksi tanaman hias terpopuler dan terfavorit</p>
            </div>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Lihat Semua
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlants.slice(0, 4).map((plant) => (
            <ProductCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* Premium Collection */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-gray-800" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Koleksi Premium</h2>
              <p className="text-gray-600">Tanaman eksklusif untuk kolektor sejati</p>
            </div>
          </div>
          <Link
            to="/products?category=premium"
            className="inline-flex items-center text-gray-800 hover:text-black font-medium"
          >
            Jelajahi Premium
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumPlants.slice(0, 3).map((plant) => (
            <div key={plant.id} className="relative">
              <div className="absolute top-2 left-2 bg-gradient-to-r from-gray-800 to-black text-white text-xs px-2 py-1 rounded-full z-10">
                Premium
              </div>
              <ProductCard plant={plant} />
            </div>
          ))}
        </div>
      </section>

      {/* Budget Friendly */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Ramah di Kantong</h2>
              <p className="text-gray-600">Tanaman berkualitas dengan harga terjangkau</p>
            </div>
          </div>
          <Link
            to="/products?price=budget"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Lihat Semua
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetPlants.slice(0, 4).map((plant) => (
            <div key={plant.id} className="relative">
              <div className="absolute top-2 left-2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
                Hemat
              </div>
              <ProductCard plant={plant} />
            </div>
          ))}
        </div>
      </section>

      {/* Care Level Guide */}
      <section>
        <div className="text-center mb-8">
          <Leaf className="h-8 w-8 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilih Berdasarkan Tingkat Perawatan</h2>
          <p className="text-gray-600">Temukan tanaman yang sesuai dengan pengalaman dan waktu Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { level: 'Sangat Mudah', color: 'green', icon: '🌱', desc: 'Perfect untuk pemula' },
            { level: 'Mudah', color: 'blue', icon: '🌿', desc: 'Perawatan minimal' },
            { level: 'Sedang', color: 'yellow', icon: '🌳', desc: 'Butuh perhatian rutin' },
            { level: 'Sulit', color: 'red', icon: '🌺', desc: 'Untuk yang berpengalaman' }
          ].map((care) => {
            const count = plants.filter(p => p.care_level === care.level).length;
            return (
              <button
                key={care.level}
                onClick={() => setSelectedCareLevel(care.level)}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center border-2 border-transparent hover:border-${care.color}-200`}
              >
                <div className="text-4xl mb-3">{care.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{care.level}</h3>
                <p className="text-sm text-gray-600 mb-3">{care.desc}</p>
                <div className={`text-${care.color}-600 font-medium`}>
                  {count} tanaman tersedia
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Plant Care Tips */}
      <section className="bg-green-600 text-white rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Tips Perawatan Tanaman</h2>
          <p className="text-green-100">Panduan praktis untuk merawat tanaman hias Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-2xl mb-3">💧</div>
            <h3 className="font-semibold mb-2">Penyiraman yang Tepat</h3>
            <p className="text-green-100 text-sm">
              Siram tanaman sesuai kebutuhan. Cek kelembapan tanah dengan jari sebelum menyiram.
            </p>
          </div>
          
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-2xl mb-3">☀️</div>
            <h3 className="font-semibold mb-2">Pencahayaan Optimal</h3>
            <p className="text-green-100 text-sm">
              Letakkan tanaman sesuai kebutuhan cahaya. Indoor plants umumnya suka cahaya tidak langsung.
            </p>
          </div>
          
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-2xl mb-3">🌱</div>
            <h3 className="font-semibold mb-2">Pupuk & Nutrisi</h3>
            <p className="text-green-100 text-sm">
              Berikan pupuk sesuai jenis tanaman. Pupuk cair sebulan sekali untuk tanaman indoor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedCollections;