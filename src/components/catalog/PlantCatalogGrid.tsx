import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, SortAsc, SortDesc, Search } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Plant, Category } from '../../types';
import { getPlants, getCategories, searchPlants, getPlantsByCategory, getPlantsByCareLevel, getPlantsByPriceRange } from '../../services/database';

interface PlantCatalogGridProps {
  initialCategory?: string;
  showFilters?: boolean;
  title?: string;
}

const PlantCatalogGrid: React.FC<PlantCatalogGridProps> = ({ 
  initialCategory, 
  showFilters = true, 
  title = "Katalog Lengkap Tanaman Hias" 
}) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');
  const [selectedCareLevel, setSelectedCareLevel] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 2000000 });
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterAndSortPlants();
  }, [searchQuery, selectedCategory, selectedCareLevel, priceRange, sortBy, sortOrder]);

  const loadInitialData = async () => {
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

  const filterAndSortPlants = async () => {
    try {
      setLoading(true);
      let filteredPlants: Plant[] = [];

      // Apply filters
      if (searchQuery) {
        filteredPlants = await searchPlants(searchQuery);
      } else if (selectedCategory) {
        filteredPlants = await getPlantsByCategory(selectedCategory);
      } else if (selectedCareLevel) {
        filteredPlants = await getPlantsByCareLevel(selectedCareLevel);
      } else {
        filteredPlants = await getPlants();
      }

      // Apply price range filter
      filteredPlants = filteredPlants.filter(plant => 
        plant.price >= priceRange.min && plant.price <= priceRange.max
      );

      // Apply additional care level filter if category is already selected
      if (selectedCareLevel && selectedCategory) {
        filteredPlants = filteredPlants.filter(plant => plant.care_level === selectedCareLevel);
      }

      // Sort plants
      filteredPlants.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'stock':
            comparison = a.stock - b.stock;
            break;
          case 'care_level':
            const careLevels = ['Sangat Mudah', 'Mudah', 'Sedang', 'Sulit'];
            comparison = careLevels.indexOf(a.care_level) - careLevels.indexOf(b.care_level);
            break;
          default:
            comparison = 0;
        }
        
        return sortOrder === 'desc' ? -comparison : comparison;
      });

      setPlants(filteredPlants);
    } catch (error) {
      console.error('Error filtering plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCareLevel('');
    setPriceRange({ min: 0, max: 2000000 });
    setSortBy('name');
    setSortOrder('asc');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (selectedCareLevel) count++;
    if (priceRange.min > 0 || priceRange.max < 2000000) count++;
    return count;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}jt`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}k`;
    }
    return price.toString();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-64 mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-32 mb-8 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600">
          Koleksi lengkap {plants.length} tanaman hias berkualitas tinggi dari berbagai kategori
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari tanaman berdasarkan nama, jenis, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Controls */}
      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Hapus Semua Filter
                </button>
              )}

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="name">Nama</option>
                  <option value="price">Harga</option>
                  <option value="stock">Stok</option>
                  <option value="care_level">Tingkat Perawatan</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 text-gray-600 hover:text-gray-800"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Tampilan:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFiltersPanel && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Care Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Perawatan</label>
                  <select
                    value={selectedCareLevel}
                    onChange={(e) => setSelectedCareLevel(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Semua Level</option>
                    <option value="Sangat Mudah">Sangat Mudah</option>
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rentang Harga</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max === 2000000 ? '' : priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 2000000 }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Rp {formatPrice(priceRange.min)} - Rp {formatPrice(priceRange.max)}
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter Cepat</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 50000 })}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full transition-colors"
                    >
                      &lt; 50k
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: 50000, max: 150000 })}
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full transition-colors"
                    >
                      50k - 150k
                    </button>
                    <button
                      onClick={() => setPriceRange({ min: 500000, max: 2000000 })}
                      className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded-full transition-colors"
                    >
                      Premium
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Menampilkan {plants.length} tanaman
          {searchQuery && ` untuk "${searchQuery}"`}
          {selectedCategory && ` dalam kategori ${categories.find(c => c.id === selectedCategory)?.name}`}
        </p>
        
        {/* Category Quick Filters */}
        <div className="hidden lg:flex space-x-2">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid/List */}
      {plants.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {plants.map((plant) => (
            <ProductCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak Ada Tanaman Ditemukan
          </h3>
          <p className="text-gray-600 mb-6">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          <button
            onClick={handleClearFilters}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Hapus Semua Filter
          </button>
        </div>
      )}

      {/* Category Showcase */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Jelajahi Berdasarkan Kategori
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const categoryCount = plants.filter(p => p.category_id === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{categoryCount} tanaman</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlantCatalogGrid;