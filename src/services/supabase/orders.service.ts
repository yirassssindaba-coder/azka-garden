import { supabase } from '../../lib/supabase';
import { Database } from '../../types/database';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

export interface CreateOrderData {
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
  shipping_info: any;
  payment_method: any;
  shipping_method: any;
  subtotal: number;
  tax: number;
  shipping_fee: number;
  discount_amount: number;
  total: number;
  notes?: string;
}

class OrdersService {
  async createOrder(userId: string, orderData: CreateOrderData): Promise<{ order: Order | null; error: any }> {
    // Generate order number
    const orderNumber = await this.generateOrderNumber();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: orderNumber,
        status: 'pending',
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping_fee: orderData.shipping_fee,
        discount_amount: orderData.discount_amount,
        total: orderData.total,
        shipping_info: orderData.shipping_info,
        payment_method: orderData.payment_method,
        shipping_method: orderData.shipping_method,
        notes: orderData.notes || null
      })
      .select()
      .single();

    if (orderError) {
      return { order: null, error: orderError };
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      // Rollback order if items creation fails
      await supabase.from('orders').delete().eq('id', order.id);
      return { order: null, error: itemsError };
    }

    // Update product stock
    for (const item of orderData.items) {
      await supabase.rpc('decrement_stock', {
        product_id: item.product_id,
        quantity: item.quantity
      });
    }

    return { order, error: null };
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }

    return data || [];
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        *,
        products (
          name,
          image_url
        )
      `)
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching order items:', error);
      return [];
    }

    return data || [];
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<{ error: any }> {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    return { error };
  }

  // Admin functions
  async getAllOrders(filters?: { status?: string; limit?: number }): Promise<Order[]> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }

    return data || [];
  }

  async getOrderStatistics(): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total, created_at');

    if (error) {
      console.error('Error fetching order statistics:', error);
      return null;
    }

    const stats = {
      total_orders: data.length,
      pending_orders: data.filter(o => o.status === 'pending').length,
      processing_orders: data.filter(o => o.status === 'processing').length,
      completed_orders: data.filter(o => o.status === 'delivered').length,
      total_revenue: data
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0),
      average_order_value: data.length > 0 
        ? data.reduce((sum, o) => sum + o.total, 0) / data.length 
        : 0
    };

    return stats;
  }

  private async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${year}-01-01`)
      .lt('created_at', `${year + 1}-01-01`);

    const orderCount = (count || 0) + 1;
    return `ORD-${year}-${orderCount.toString().padStart(3, '0')}`;
  }

  // Real-time subscriptions
  subscribeToOrders(callback: (payload: any) => void) {
    return supabase
      .channel('orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        callback
      )
      .subscribe();
  }

  subscribeToUserOrders(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_orders_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
}

export const ordersService = new OrdersService();