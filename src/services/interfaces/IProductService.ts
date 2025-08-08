import { Plant } from '../../types';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  careLevel?: string;
  inStock?: boolean;
  tags?: string[];
  sortBy?: 'price' | 'name' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface IProductService {
  getProducts(filters?: ProductFilters): Promise<Plant[]>;
  getProductById(id: string): Promise<Plant | null>;
  searchProducts(query: string, filters?: ProductFilters): Promise<Plant[]>;
  getProductsByCategory(categoryId: string): Promise<Plant[]>;
  getFeaturedProducts(limit?: number): Promise<Plant[]>;
  getRelatedProducts(productId: string, limit?: number): Promise<Plant[]>;
  updateProductStock(productId: string, quantity: number): Promise<void>;
  checkProductAvailability(productId: string, quantity: number): Promise<boolean>;
  getProductReviews(productId: string): Promise<any[]>;
  addProductReview(productId: string, userId: string, review: any): Promise<any>;
}