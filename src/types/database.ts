export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          username: string;
          phone: string | null;
          role: 'customer' | 'admin' | 'developer';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          username: string;
          phone?: string | null;
          role?: 'customer' | 'admin' | 'developer';
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          username?: string;
          phone?: string | null;
          role?: 'customer' | 'admin' | 'developer';
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          image_url: string;
          slug: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description: string;
          image_url: string;
          slug: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          name?: string;
          description?: string;
          image_url?: string;
          slug?: string;
          is_active?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category_id: string;
          height: string;
          care_level: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Sulit';
          watering_frequency: string;
          care_instructions: string;
          stock: number;
          is_active: boolean;
          is_featured: boolean;
          sku: string;
          weight: number;
          created_at: string;
          updated_at: string;
          categories: {
            name: string;
            slug: string;
          };
        };
        Insert: {
          name: string;
          description: string;
          price: number;
          image_url: string;
          category_id: string;
          height: string;
          care_level: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Sulit';
          watering_frequency: string;
          care_instructions: string;
          stock: number;
          is_active?: boolean;
          is_featured?: boolean;
          sku: string;
          weight?: number;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          image_url?: string;
          category_id?: string;
          height?: string;
          care_level?: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Sulit';
          watering_frequency?: string;
          care_instructions?: string;
          stock?: number;
          is_active?: boolean;
          is_featured?: boolean;
          sku?: string;
          weight?: number;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          subtotal: number;
          tax: number;
          shipping_fee: number;
          discount_amount: number;
          total: number;
          shipping_info: any;
          payment_method: any;
          shipping_method: any;
          notes: string | null;
          created_at: string;
          updated_at: string;
          profiles: {
            full_name: string;
            email: string;
          };
        };
        Insert: {
          user_id: string;
          order_number: string;
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          subtotal: number;
          tax: number;
          shipping_fee: number;
          discount_amount: number;
          total: number;
          shipping_info: any;
          payment_method: any;
          shipping_method: any;
          notes?: string | null;
        };
        Update: {
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          subtotal?: number;
          tax?: number;
          shipping_fee?: number;
          discount_amount?: number;
          total?: number;
          shipping_info?: any;
          payment_method?: any;
          shipping_method?: any;
          notes?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
          products: {
            name: string;
            image_url: string;
          };
        };
        Insert: {
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          quantity?: number;
          price?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          comment: string;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
          profiles: {
            full_name: string;
            avatar_url: string | null;
          };
        };
        Insert: {
          product_id: string;
          user_id: string;
          rating: number;
          comment: string;
          is_verified?: boolean;
        };
        Update: {
          rating?: number;
          comment?: string;
          is_verified?: boolean;
          updated_at?: string;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          resource: string;
          resource_id: string | null;
          details: any;
          ip_address: string;
          user_agent: string;
          created_at: string;
        };
        Insert: {
          admin_id: string;
          action: string;
          resource: string;
          resource_id?: string | null;
          details?: any;
          ip_address: string;
          user_agent: string;
        };
        Update: never;
      };
      system_metrics: {
        Row: {
          id: string;
          metric_type: string;
          metric_value: number;
          metadata: any;
          recorded_at: string;
        };
        Insert: {
          metric_type: string;
          metric_value: number;
          metadata?: any;
        };
        Update: never;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}