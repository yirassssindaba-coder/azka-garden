import { supabase } from '../../lib/supabase';
import { Database } from '../../types/database';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export interface ProductFilters {
  category_id?: string;
  care_level?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  is_featured?: boolean;
  is_active?: boolean;
  in_stock?: boolean;
}

class ProductsService {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('is_active', true);

    if (filters) {
      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
      }
      if (filters.care_level) {
        query = query.eq('care_level', filters.care_level);
      }
      if (filters.min_price) {
        query = query.gte('price', filters.min_price);
      }
      if (filters.max_price) {
        query = query.lte('price', filters.max_price);
      }
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      if (filters.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }
      if (filters.in_stock) {
        query = query.gt('stock', 0);
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  }

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return data || [];
  }

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  }

  async searchProducts(query: string, filters?: ProductFilters): Promise<Product[]> {
    return this.getProducts({ ...filters, search: query });
  }

  // Admin functions
  async createProduct(product: ProductInsert): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    return { data, error };
  }

  async updateProduct(id: string, updates: ProductUpdate): Promise<{ data: Product | null; error: any }> {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  async deleteProduct(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    return { error };
  }

  async updateStock(productId: string, quantity: number): Promise<{ error: any }> {
    const { error } = await supabase
      .from('products')
      .update({ 
        stock: quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    return { error };
  }

  // Real-time subscriptions
  subscribeToProducts(callback: (payload: any) => void) {
    return supabase
      .channel('products_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        callback
      )
      .subscribe();
  }

  subscribeToStock(callback: (payload: any) => void) {
    return supabase
      .channel('stock_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: 'stock=lt.5'
        },
        callback
      )
      .subscribe();
  }
}

export const productsService = new ProductsService();