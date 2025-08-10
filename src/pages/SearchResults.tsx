import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Plant, Category } from '../types';
import { smartSearch, SearchResult } from '../ai/search/SmartSearch';
import { getCategories } from '../services/database';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000000 });
  const [selectedCareLevel, setSelectedCareLevel] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  useEffect(() => {
    loadSearchResults();
    loadCategories();
  }, [query, selectedCategory, priceRange, selectedCareLevel, sortBy]);

  const loadSearchResults = async () => {
    if (!query && !location.state?.results) return;

    try {
      setLoading(true);
      
      let results: SearchResult;
      
      if (location.state?.results) {
        // Results from image search or other sources
        results = location.state.results;
      } else {
        // Text search
        const filters = {
          categories: selectedCategory ? [selectedCategory] : undefined,
          priceRange,
          careLevel: selectedCareLevel.length > 0 ? selectedCareLevel : undefined,
          inStock: true
        };
        
        results = await smartSearch.search(query, filters);
      }
      
      // Apply sorting
      results.items = sortResults(results.items, sortBy);
      
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to load search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const sortResults = (items: Plant[], sortBy: string): Plant[] => {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      default:
        return sorted; // Keep original relevance order
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({ min: 0, max: 1000000 });
    setSelectedCareLevel([]);
    setSortBy('relevance');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (priceRange.min > 0 || priceRange.max < 1000000) count++;
    if (selectedCareLevel.length > 0) count++;
    return count;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-64 mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-32 mb-8 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
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
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <Search className="h-6 w-6 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">
            {location.state?.searchType === 'image' ? 'Hasil Pencarian Gambar' : `Hasil Pencarian: "${query}"`}
          </h1>
        </div>
        
        {searchResults && (
          <p className="text-gray-600">
            Menampilkan {searchResults.items.length} dari {searchResults.total} hasil
            {query && ` untuk "${query}"`}
          </p>
        )}

        {/* Search Suggestions */}
        {searchResults?.suggestions && searchResults.suggestions.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">Saran pencarian:</p>
            <div className="flex flex-wrap gap-2">
              {searchResults.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = `/search?q=${encodeURIComponent(suggestion)}`}
                  className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
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

          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="relevance">Relevansi</option>
              <option value="newest">Terbaru</option>
              <option value="price_low">Harga Terendah</option>
              <option value="price_high">Harga Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filter</h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Hapus Semua
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rentang Harga</h4>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max === 1000000 ? '' : priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 1000000 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Rp {priceRange.min.toLocaleString('id-ID')} - Rp {priceRange.max.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Care Level Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Tingkat Perawatan</h4>
                <div className="space-y-2">
                  {['Sangat Mudah', 'Mudah', 'Sedang', 'Sulit'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCareLevel.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCareLevel(prev => [...prev, level]);
                          } else {
                            setSelectedCareLevel(prev => prev.filter(l => l !== level));
                          }
                        }}
                        className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {searchResults?.items && searchResults.items.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {searchResults.items.map((plant) => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak Ada Hasil Ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Coba ubah kata kunci pencarian atau filter yang Anda gunakan
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Hapus Semua Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Facets */}
      {searchResults?.facets && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Jelajahi Berdasarkan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-2">Kategori</h4>
              <div className="space-y-1">
                {searchResults.facets.categories.map((facet) => (
                  <button
                    key={facet.name}
                    onClick={() => setSelectedCategory(facet.name)}
                    className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <span>{facet.name}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{facet.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div>
              <h4 className="font-medium mb-2">Rentang Harga</h4>
              <div className="space-y-1">
                {searchResults.facets.priceRanges.map((facet) => (
                  <button
                    key={facet.range}
                    className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <span>{facet.range}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{facet.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Care Levels */}
            <div>
              <h4 className="font-medium mb-2">Tingkat Perawatan</h4>
              <div className="space-y-1">
                {searchResults.facets.careLevels.map((facet) => (
                  <button
                    key={facet.level}
                    onClick={() => setSelectedCareLevel([facet.level])}
                    className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <span>{facet.level}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{facet.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;