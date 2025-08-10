import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, X, Clock, TrendingUp } from 'lucide-react';
import { smartSearch } from '../../ai/search/SmartSearch';
import { useNavigate } from 'react-router-dom';

interface SearchSuggestion {
  text: string;
  type: 'history' | 'trending' | 'suggestion';
  count?: number;
}

const SmartSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem('azka-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      loadSuggestions();
    } else {
      loadDefaultSuggestions();
    }
  }, [query]);

  const loadSuggestions = async () => {
    try {
      const autoComplete = await smartSearch.autoComplete(query);
      const newSuggestions: SearchSuggestion[] = [
        ...autoComplete.map(text => ({ text, type: 'suggestion' as const })),
        ...getTrendingSuggestions(),
        ...getHistorySuggestions()
      ];
      setSuggestions(newSuggestions.slice(0, 8));
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const loadDefaultSuggestions = () => {
    const defaultSuggestions: SearchSuggestion[] = [
      ...getTrendingSuggestions(),
      ...getHistorySuggestions()
    ];
    setSuggestions(defaultSuggestions.slice(0, 6));
  };

  const getTrendingSuggestions = (): SearchSuggestion[] => {
    return [
      { text: 'monstera deliciosa', type: 'trending', count: 1250 },
      { text: 'tanaman indoor mudah', type: 'trending', count: 890 },
      { text: 'snake plant', type: 'trending', count: 756 },
      { text: 'pothos golden', type: 'trending', count: 623 }
    ];
  };

  const getHistorySuggestions = (): SearchSuggestion[] => {
    return searchHistory.slice(0, 4).map(text => ({ text, type: 'history' }));
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('azka-search-history', JSON.stringify(newHistory));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleVoiceSearch = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search tidak didukung di browser ini');
      return;
    }

    setIsListening(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleImageSearch = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const results = await smartSearch.searchByImage(file);
          navigate('/search', { state: { results, searchType: 'image' } });
        } catch (error) {
          console.error('Image search failed:', error);
          alert('Pencarian gambar gagal. Silakan coba lagi.');
        }
      }
    };
    input.click();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('azka-search-history');
    loadDefaultSuggestions();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'history':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Cari tanaman hias, tips perawatan, atau kategori..."
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
          <button
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
              isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Pencarian suara"
          >
            <Mic className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleImageSearch}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            title="Pencarian gambar"
          >
            <Camera className="h-4 w-4" />
          </button>
          
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion.text)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                >
                  {getSuggestionIcon(suggestion.type)}
                  <span className="flex-1 text-gray-900">{suggestion.text}</span>
                  {suggestion.count && (
                    <span className="text-xs text-gray-500">{suggestion.count.toLocaleString()}</span>
                  )}
                </button>
              ))}
              
              {searchHistory.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200">
                  <button
                    onClick={clearHistory}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Hapus riwayat pencarian
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>Mulai ketik untuk mencari tanaman...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearchBar;