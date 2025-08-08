import { productsService } from './supabase/products.service';
import { Plant, Category } from '../types';

// Convert Supabase product to Plant interface
const convertToPlant = (product: any): Plant => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image_url,
  category_id: product.category_id,
  category: product.categories?.name || 'Unknown',
  height: product.height,
  care_level: product.care_level,
  watering_frequency: product.watering_frequency,
  care_instructions: product.care_instructions,
  stock: product.stock,
  created_at: product.created_at
});

// Convert Supabase category to Category interface
const convertToCategory = (category: any): Category => ({
  id: category.id,
  name: category.name,
  description: category.description,
  image: category.image_url,
  created_at: category.created_at
});

export const getPlants = async (limit?: number): Promise<Plant[]> => {
  const products = await productsService.getProducts({ is_active: true });
  const plants = products.map(convertToPlant);
  
  if (limit) {
    return plants.slice(0, limit);
  }
  return plants;
};

export const getPlantById = async (id: string): Promise<Plant | null> => {
  const product = await productsService.getProductById(id);
  return product ? convertToPlant(product) : null;
};

export const getCategories = async (): Promise<Category[]> => {
  const categories = await productsService.getCategories();
  return categories.map(convertToCategory);
};

export const getPlantsByCategory = async (categoryId: string): Promise<Plant[]> => {
  const products = await productsService.getProducts({ 
    category_id: categoryId,
    is_active: true 
  });
  return products.map(convertToPlant);
};

export const searchPlants = async (query: string): Promise<Plant[]> => {
  const products = await productsService.searchProducts(query, { is_active: true });
  return products.map(convertToPlant);
};

export const getFeaturedPlants = async (): Promise<Plant[]> => {
  const products = await productsService.getFeaturedProducts();
  return products.map(convertToPlant);
};

export const getPremiumPlants = async (): Promise<Plant[]> => {
  const products = await productsService.getProducts({ 
    min_price: 500000,
    is_active: true 
  });
  return products.map(convertToPlant);
};

export const getBudgetPlants = async (): Promise<Plant[]> => {
  const products = await productsService.getProducts({ 
    max_price: 50000,
    is_active: true 
  });
  return products.map(convertToPlant);
};

export const getPlantsByPriceRange = async (min: number, max: number): Promise<Plant[]> => {
  const products = await productsService.getProducts({ 
    min_price: min,
    max_price: max,
    is_active: true 
  });
  return products.map(convertToPlant);
};

export const getPlantsByCareLevel = async (careLevel: string): Promise<Plant[]> => {
  const products = await productsService.getProducts({ 
    care_level: careLevel as any,
    is_active: true 
  });
  return products.map(convertToPlant);
};

// Real-time statistics from database
export const getPlantStatistics = async () => {
  const products = await productsService.getProducts();
  const categories = await productsService.getCategories();
  
  return {
    totalPlants: products.length,
    totalCategories: categories.length,
    averagePrice: products.reduce((sum, plant) => sum + plant.price, 0) / products.length,
    totalStock: products.reduce((sum, plant) => sum + plant.stock, 0),
    lowStockCount: products.filter(plant => plant.stock <= 5).length,
    outOfStockCount: products.filter(plant => plant.stock === 0).length,
    premiumPlantsCount: products.filter(plant => plant.price >= 500000).length,
    budgetPlantsCount: products.filter(plant => plant.price <= 50000).length,
    categoryDistribution: categories.map(category => ({
      name: category.name,
      count: products.filter(plant => plant.category_id === category.id).length
    })),
    careLevelDistribution: [
      { level: 'Sangat Mudah', count: products.filter(p => p.care_level === 'Sangat Mudah').length },
      { level: 'Mudah', count: products.filter(p => p.care_level === 'Mudah').length },
      { level: 'Sedang', count: products.filter(p => p.care_level === 'Sedang').length },
      { level: 'Sulit', count: products.filter(p => p.care_level === 'Sulit').length }
    ]
  };
};