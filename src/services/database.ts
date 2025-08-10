import { Plant, Category } from '../types';

// Mock data untuk development
const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Jamani Dolar (ZZ Plant)',
    description: 'Tanaman hias indoor yang sangat mudah perawatan, cocok untuk pemula. Tahan terhadap kondisi cahaya rendah dan jarang disiram.',
    price: 85000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya rendah hingga sedang. Siram ketika tanah benar-benar kering.',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    description: 'Tanaman hias populer dengan daun berlubang yang unik. Tumbuh merambat dan cocok untuk dekorasi ruangan modern.',
    price: 150000,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Letakkan di tempat dengan cahaya terang tidak langsung. Siram ketika tanah mulai kering.',
    stock: 15,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Lidah Mertua (Sansevieria)',
    description: 'Tanaman yang sangat tahan banting dan bisa bertahan dalam kondisi minim perawatan. Ideal untuk kamar tidur.',
    price: 65000,
    image: 'https://images.pexels.com/photos/3125171/pexels-photo-3125171.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-80 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-4 minggu sekali',
    care_instructions: 'Toleran terhadap semua kondisi cahaya. Siram sangat jarang, biarkan tanah kering total.',
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Kuping Gajah (Anthurium)',
    description: 'Anthurium dengan daun besar berbentuk hati dan urat putih mencolok. Memerlukan kelembapan tinggi.',
    price: 125000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-70 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Jaga kelembapan udara tinggi. Semprot daun secara teratur. Hindari air menggenang.',
    stock: 12,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Pucuk Merah',
    description: 'Tanaman pagar hidup populer dengan daun muda berwarna merah menyala. Tumbuh cepat dan mudah dibentuk.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50-150 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Pangkas rutin untuk menjaga bentuk. Berikan pupuk NPK untuk warna optimal.',
    stock: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Bonsai Gestrum',
    description: 'Bonsai dengan bunga kuning harum yang memerlukan perawatan intensif dan teknik pembentukan khusus.',
    price: 750000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '4',
    category: 'Bonsai',
    height: '25-40 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Siram setiap hari dengan air sedikit. Pangkas rutin untuk menjaga bentuk.',
    stock: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Philodendron Brasil',
    description: 'Tanaman hias dengan daun variegata hijau dan kuning yang cantik. Mudah perawatan dan tumbuh cepat.',
    price: 95000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya terang tidak langsung. Jaga kelembapan tanah tetapi tidak tergenang.',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Kaktus Koboy',
    description: 'Kaktus tinggi dengan bentuk unik seperti koboi. Sangat tahan kekeringan dan cocok untuk outdoor.',
    price: 180000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '70-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya matahari langsung. Siram sedikit saat musim kering.',
    stock: 8,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Caladium Dragon Scale',
    description: 'Keladi dengan motif sisik naga yang eksotis. Daun berwarna hijau dengan urat putih mencolok.',
    price: 220000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '25-45 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Jaga kelembapan tinggi. Hindari cahaya langsung. Gunakan media tanam yang porous.',
    stock: 10,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Alamanda Kuning',
    description: 'Tanaman berbunga kuning cerah yang harum. Cocok untuk taman outdoor dan sebagai tanaman pagar.',
    price: 45000,
    image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh. Pangkas bunga layu untuk merangsang bunga baru.',
    stock: 18,
    created_at: new Date().toISOString()
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Tanaman Indoor',
    description: 'Tanaman hias untuk dalam ruangan',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tanaman Outdoor',
    description: 'Tanaman untuk taman dan area luar',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sukulen & Kaktus',
    description: 'Tanaman tahan kekeringan',
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Bonsai',
    description: 'Koleksi bonsai premium',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tanaman Berbunga',
    description: 'Tanaman dengan bunga cantik',
    image: 'https://images.pexels.com/photos/1084200/pexels-photo-1084200.jpeg',
    created_at: new Date().toISOString()
  }
];

export const getPlants = async (limit?: number): Promise<Plant[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (limit) {
    return mockPlants.slice(0, limit);
  }
  return mockPlants;
};

export const getPlantById = async (id: string): Promise<Plant | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPlants.find(plant => plant.id === id) || null;
};

export const getCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCategories;
};

export const getPlantsByCategory = async (categoryId: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.category_id === categoryId);
};

export const searchPlants = async (query: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => 
    plant.name.toLowerCase().includes(query.toLowerCase()) ||
    plant.description.toLowerCase().includes(query.toLowerCase()) ||
    plant.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const getFeaturedPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.slice(0, 6);
};

export const getPremiumPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price >= 500000);
};

export const getBudgetPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price <= 50000);
};

export const getPlantsByPriceRange = async (min: number, max: number): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price >= min && plant.price <= max);
};

export const getPlantsByCareLevel = async (careLevel: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.care_level === careLevel);
};

export const getPlantStatistics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    totalPlants: mockPlants.length,
    totalCategories: mockCategories.length,
    averagePrice: mockPlants.reduce((sum, plant) => sum + plant.price, 0) / mockPlants.length,
    totalStock: mockPlants.reduce((sum, plant) => sum + plant.stock, 0),
    lowStockCount: mockPlants.filter(plant => plant.stock <= 5).length,
    outOfStockCount: mockPlants.filter(plant => plant.stock === 0).length,
    premiumPlantsCount: mockPlants.filter(plant => plant.price >= 500000).length,
    budgetPlantsCount: mockPlants.filter(plant => plant.price <= 50000).length,
    categoryDistribution: mockCategories.map(category => ({
      name: category.name,
      count: mockPlants.filter(plant => plant.category_id === category.id).length
    })),
    careLevelDistribution: [
      { level: 'Sangat Mudah', count: mockPlants.filter(p => p.care_level === 'Sangat Mudah').length },
      { level: 'Mudah', count: mockPlants.filter(p => p.care_level === 'Mudah').length },
      { level: 'Sedang', count: mockPlants.filter(p => p.care_level === 'Sedang').length },
      { level: 'Sulit', count: mockPlants.filter(p => p.care_level === 'Sulit').length }
    ]
  };
};