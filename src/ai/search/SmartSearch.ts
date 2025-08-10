import { Plant } from '../../types';

export interface SearchResult {
  items: Plant[];
  total: number;
  suggestions: string[];
  filters: SearchFilters;
  facets: SearchFacets;
}

export interface SearchFilters {
  categories: string[];
  priceRange: { min: number; max: number };
  careLevel: string[];
  inStock: boolean;
}

export interface SearchFacets {
  categories: { name: string; count: number }[];
  priceRanges: { range: string; count: number }[];
  careLevels: { level: string; count: number }[];
}

export class SmartSearch {
  private searchIndex: Map<string, Plant[]> = new Map();
  private synonyms: Map<string, string[]> = new Map();

  constructor() {
    this.initializeSynonyms();
  }

  private initializeSynonyms(): void {
    this.synonyms.set('tanaman', ['plant', 'tumbuhan', 'flora']);
    this.synonyms.set('hias', ['dekoratif', 'ornamental', 'decorative']);
    this.synonyms.set('indoor', ['dalam ruangan', 'rumah', 'interior']);
    this.synonyms.set('mudah', ['easy', 'gampang', 'simple']);
    this.synonyms.set('sulit', ['hard', 'susah', 'difficult']);
  }

  async search(query: string, filters?: Partial<SearchFilters>): Promise<SearchResult> {
    const normalizedQuery = this.normalizeQuery(query);
    const expandedQuery = this.expandQueryWithSynonyms(normalizedQuery);
    
    // Simulate search with mock data
    const mockResults: Plant[] = [
      {
        id: 'search-1',
        name: 'Monstera Deliciosa',
        description: 'Tanaman hias indoor populer dengan daun berlubang yang unik',
        price: 150000,
        image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
        category_id: '1',
        category: 'Tanaman Indoor',
        height: '60-100 cm',
        care_level: 'Mudah',
        watering_frequency: '1-2 kali seminggu',
        care_instructions: 'Letakkan di tempat dengan cahaya tidak langsung.',
        stock: 15,
        created_at: new Date().toISOString()
      },
      {
        id: 'search-2',
        name: 'Snake Plant',
        description: 'Sansevieria yang sangat mudah perawatan',
        price: 85000,
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
        category_id: '1',
        category: 'Tanaman Indoor',
        height: '30-60 cm',
        care_level: 'Sangat Mudah',
        watering_frequency: '2-3 minggu sekali',
        care_instructions: 'Toleran terhadap berbagai kondisi cahaya.',
        stock: 25,
        created_at: new Date().toISOString()
      }
    ];

    const filteredResults = this.applyFilters(mockResults, filters);
    
    return {
      items: filteredResults,
      total: filteredResults.length,
      suggestions: this.generateSuggestions(query),
      filters: this.getAvailableFilters(),
      facets: this.generateFacets(filteredResults)
    };
  }

  async autoComplete(query: string): Promise<string[]> {
    const suggestions = [
      'monstera deliciosa',
      'monstera adansonii',
      'tanaman indoor mudah',
      'tanaman hias daun',
      'snake plant',
      'pothos',
      'philodendron'
    ];

    return suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }

  async searchByImage(imageFile: File): Promise<SearchResult> {
    // Simulate visual search
    console.log('Processing image search for:', imageFile.name);
    
    // In real implementation, this would use computer vision
    // to identify plants and return similar results
    return this.search('tanaman hias indoor');
  }

  async voiceSearch(audioBlob: Blob): Promise<SearchResult> {
    // Simulate voice search
    console.log('Processing voice search...');
    
    // In real implementation, this would use speech-to-text
    // then process the text query
    return this.search('tanaman mudah perawatan');
  }

  private normalizeQuery(query: string): string {
    return query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();
  }

  private expandQueryWithSynonyms(query: string): string[] {
    const words = query.split(' ');
    const expandedTerms: string[] = [query];

    words.forEach(word => {
      const synonyms = this.synonyms.get(word);
      if (synonyms) {
        synonyms.forEach(synonym => {
          expandedTerms.push(query.replace(word, synonym));
        });
      }
    });

    return expandedTerms;
  }

  private applyFilters(results: Plant[], filters?: Partial<SearchFilters>): Plant[] {
    if (!filters) return results;

    return results.filter(plant => {
      if (filters.categories && !filters.categories.includes(plant.category_id)) {
        return false;
      }
      
      if (filters.priceRange) {
        if (plant.price < filters.priceRange.min || plant.price > filters.priceRange.max) {
          return false;
        }
      }
      
      if (filters.careLevel && !filters.careLevel.includes(plant.care_level)) {
        return false;
      }
      
      if (filters.inStock && plant.stock <= 0) {
        return false;
      }

      return true;
    });
  }

  private generateSuggestions(query: string): string[] {
    return [
      'Coba cari "tanaman indoor"',
      'Lihat "tanaman mudah perawatan"',
      'Jelajahi "monstera collection"'
    ];
  }

  private getAvailableFilters(): SearchFilters {
    return {
      categories: ['1', '2', '3'],
      priceRange: { min: 0, max: 1000000 },
      careLevel: ['Sangat Mudah', 'Mudah', 'Sedang', 'Sulit'],
      inStock: true
    };
  }

  private generateFacets(results: Plant[]): SearchFacets {
    return {
      categories: [
        { name: 'Tanaman Indoor', count: results.filter(p => p.category === 'Tanaman Indoor').length },
        { name: 'Tanaman Outdoor', count: results.filter(p => p.category === 'Tanaman Outdoor').length }
      ],
      priceRanges: [
        { range: '< 100k', count: results.filter(p => p.price < 100000).length },
        { range: '100k - 200k', count: results.filter(p => p.price >= 100000 && p.price < 200000).length }
      ],
      careLevels: [
        { level: 'Mudah', count: results.filter(p => p.care_level === 'Mudah').length },
        { level: 'Sedang', count: results.filter(p => p.care_level === 'Sedang').length }
      ]
    };
  }
}

export const smartSearch = new SmartSearch();