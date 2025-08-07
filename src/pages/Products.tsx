import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Plant, Category } from '../types';
import { getPlants, getCategories } from '../services/database';

const Products: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plantsData, categoriesData] = await Promise.all([
          getPlants(),
          getCategories()
        ]);
        setPlants(plantsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || plant.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Katalog Tanaman Hias</h1>
        <p className="text-lg text-gray-600">
          Jelajahi koleksi lengkap tanaman hias berkualitas tinggi
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari tanaman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredPlants.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  Menampilkan {filteredPlants.length} dari {plants.length} produk
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <ProductCard key={plant.id} plant={plant} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada produk yang sesuai dengan kriteria pencarian
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;