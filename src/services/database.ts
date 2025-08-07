// Mock database service - Replace with actual Supabase integration
import { Plant, Category } from '../types';

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Tanaman Indoor',
    description: 'Tanaman hias yang cocok untuk dalam ruangan',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Tanaman Outdoor',
    description: 'Tanaman hias untuk taman dan halaman',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sukulen',
    description: 'Tanaman sukulen yang mudah perawatan',
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Mock data for plants
const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    description: 'Tanaman hias indoor populer dengan daun berlubang yang unik. Sangat mudah perawatan dan cocok untuk pemula.',
    price: 150000,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Letakkan di tempat dengan cahaya tidak langsung. Siram ketika tanah sudah kering. Bersihkan daun secara berkala.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Snake Plant',
    description: 'Sansevieria atau lidah mertua adalah tanaman yang sangat tahan dan bisa hidup dengan perawatan minimal.',
    price: 85000,
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya rendah hingga terang. Hindari penyiraman berlebihan.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    description: 'Tanaman dengan daun besar dan mengkilap yang menjadi favorit untuk dekorasi interior modern.',
    price: 275000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '100-150 cm',
    care_level: 'Sedang',
    watering_frequency: '1 kali seminggu',
    care_instructions: 'Butuh cahaya terang tidak langsung. Jangan terlalu sering dipindah. Siram ketika tanah mulai kering.',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Echeveria',
    description: 'Sukulen cantik berbentuk roset dengan warna yang beragam. Sangat mudah perawatan dan tahan kekeringan.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg',
    category_id: '3',
    category: 'Sukulen',
    height: '10-15 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya langsung. Siram sedikit dan jarang. Pastikan drainase baik.',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Boston Fern',
    description: 'Pakis Boston dengan daun yang lebat dan hijau segar, cocok untuk tempat lembap dan teduh.',
    price: 120000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-60 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi. Semprot daun secara teratur. Jauhkan dari sinar matahari langsung.',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Peace Lily',
    description: 'Tanaman berbunga putih yang elegan dan bisa membersihkan udara dalam ruangan.',
    price: 95000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka tempat teduh dengan kelembapan tinggi. Siram ketika daun mulai layu sedikit.',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z'
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockPlants.find(plant => plant.id === id) || null;
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockCategories;
};

// When integrating with Supabase, replace the above functions with:
/*
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getPlants = async (limit?: number): Promise<Plant[]> => {
  let query = supabase
    .from('plants')
    .select(`
      *,
      categories (name)
    `)
    .eq('active', true);
    
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data?.map(plant => ({
    ...plant,
    category: plant.categories?.name || 'Unknown'
  })) || [];
};

export const getPlantById = async (id: string): Promise<Plant | null> => {
  const { data, error } = await supabase
    .from('plants')
    .select(`
      *,
      categories (name)
    `)
    .eq('id', id)
    .single();
    
  if (error) throw error;
  
  return data ? {
    ...data,
    category: data.categories?.name || 'Unknown'
  } : null;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true);
    
  if (error) throw error;
  
  return data || [];
};
*/