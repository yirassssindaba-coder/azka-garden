import { Plant } from '../../types';
import { IEntity } from '../../core/interfaces/IEntity';

export interface RecommendationEngine extends IEntity {
  userId?: string;
  productId: string;
  score: number;
  reason: string;
  algorithm: 'collaborative' | 'content-based' | 'hybrid';
}

export class ProductRecommendation {
  private userPreferences: Map<string, any> = new Map();
  private productSimilarity: Map<string, Map<string, number>> = new Map();

  async getPersonalizedRecommendations(userId: string, limit: number = 6): Promise<Plant[]> {
    // Simulate AI-powered recommendations
    const mockRecommendations: Plant[] = [
      {
        id: 'rec-1',
        name: 'Monstera Adansonii',
        description: 'Tanaman hias dengan lubang daun yang unik, cocok untuk Anda yang menyukai Monstera',
        price: 125000,
        image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg',
        category_id: '1',
        category: 'Tanaman Indoor',
        height: '40-80 cm',
        care_level: 'Mudah',
        watering_frequency: '1-2 kali seminggu',
        care_instructions: 'Letakkan di tempat dengan cahaya terang tidak langsung. Siram ketika tanah mulai kering.',
        stock: 12,
        created_at: new Date().toISOString()
      },
      {
        id: 'rec-2',
        name: 'Pothos Golden',
        description: 'Tanaman merambat yang mudah perawatan, sempurna untuk pemula',
        price: 65000,
        image: 'https://images.pexels.com/photos/7084308/pexels-photo-7084308.jpeg',
        category_id: '1',
        category: 'Tanaman Indoor',
        height: '30-50 cm',
        care_level: 'Sangat Mudah',
        watering_frequency: '1 kali seminggu',
        care_instructions: 'Sangat toleran terhadap berbagai kondisi cahaya. Siram ketika tanah kering.',
        stock: 25,
        created_at: new Date().toISOString()
      }
    ];

    return mockRecommendations.slice(0, limit);
  }

  async getSimilarProducts(productId: string, limit: number = 4): Promise<Plant[]> {
    // Content-based filtering simulation
    const mockSimilar: Plant[] = [
      {
        id: 'sim-1',
        name: 'Philodendron Brasil',
        description: 'Tanaman hias dengan daun variegata yang cantik',
        price: 85000,
        image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg',
        category_id: '1',
        category: 'Tanaman Indoor',
        height: '30-60 cm',
        care_level: 'Mudah',
        watering_frequency: '1-2 kali seminggu',
        care_instructions: 'Suka cahaya terang tidak langsung. Jaga kelembapan tanah.',
        stock: 18,
        created_at: new Date().toISOString()
      }
    ];

    return mockSimilar.slice(0, limit);
  }

  async getFrequentlyBoughtTogether(productId: string): Promise<Plant[]> {
    // Market basket analysis simulation
    const mockBundle: Plant[] = [
      {
        id: 'bundle-1',
        name: 'Pupuk Organik Cair',
        description: 'Pupuk khusus tanaman hias untuk pertumbuhan optimal',
        price: 35000,
        image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
        category_id: '4',
        category: 'Perawatan Tanaman',
        height: '500ml',
        care_level: 'Mudah',
        watering_frequency: '2 minggu sekali',
        care_instructions: 'Campurkan dengan air sesuai petunjuk kemasan.',
        stock: 50,
        created_at: new Date().toISOString()
      }
    ];

    return mockBundle;
  }

  async updateUserPreferences(userId: string, interactions: any[]): Promise<void> {
    // Update user preference model based on interactions
    this.userPreferences.set(userId, {
      categories: ['indoor', 'easy-care'],
      priceRange: { min: 50000, max: 200000 },
      careLevel: 'easy',
      lastUpdated: new Date()
    });
  }

  async trainRecommendationModel(): Promise<void> {
    // Simulate ML model training
    console.log('Training recommendation model...');
    // In real implementation, this would train collaborative filtering, 
    // content-based filtering, and hybrid models
  }
}

export const productRecommendation = new ProductRecommendation();