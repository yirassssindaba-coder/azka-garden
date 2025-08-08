import { supabase } from '../../lib/supabase';
import { Database } from '../../types/database';

type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
type SystemMetric = Database['public']['Tables']['system_metrics']['Row'];

class AdminService {
  async logAdminAction(
    adminId: string,
    action: string,
    resource: string,
    resourceId?: string,
    details?: any
  ): Promise<void> {
    const { error } = await supabase
      .from('admin_logs')
      .insert({
        admin_id: adminId,
        action,
        resource,
        resource_id: resourceId || null,
        details: details || {},
        ip_address: '127.0.0.1', // In production, get from headers
        user_agent: navigator.userAgent
      });

    if (error) {
      console.error('Error logging admin action:', error);
    }
  }

  async getAdminLogs(limit: number = 50): Promise<AdminLog[]> {
    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching admin logs:', error);
      return [];
    }

    return data || [];
  }

  async recordSystemMetric(
    metricType: string,
    value: number,
    metadata?: any
  ): Promise<void> {
    const { error } = await supabase
      .from('system_metrics')
      .insert({
        metric_type: metricType,
        metric_value: value,
        metadata: metadata || {}
      });

    if (error) {
      console.error('Error recording system metric:', error);
    }
  }

  async getSystemMetrics(
    metricType?: string,
    hours: number = 24
  ): Promise<SystemMetric[]> {
    const since = new Date();
    since.setHours(since.getHours() - hours);

    let query = supabase
      .from('system_metrics')
      .select('*')
      .gte('recorded_at', since.toISOString())
      .order('recorded_at', { ascending: false });

    if (metricType) {
      query = query.eq('metric_type', metricType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching system metrics:', error);
      return [];
    }

    return data || [];
  }

  async getDashboardStats(): Promise<any> {
    // Get orders statistics
    const { data: orders } = await supabase
      .from('orders')
      .select('status, total, created_at');

    // Get products statistics
    const { data: products } = await supabase
      .from('products')
      .select('stock, price, is_active');

    // Get users count
    const { count: usersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'customer');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = orders?.filter(o => 
      new Date(o.created_at) >= today
    ) || [];

    const stats = {
      total_users: usersCount || 0,
      total_orders: orders?.length || 0,
      total_products: products?.filter(p => p.is_active)?.length || 0,
      pending_orders: orders?.filter(o => o.status === 'pending')?.length || 0,
      processing_orders: orders?.filter(o => o.status === 'processing')?.length || 0,
      completed_orders: orders?.filter(o => o.status === 'delivered')?.length || 0,
      low_stock_products: products?.filter(p => p.stock <= 5 && p.is_active)?.length || 0,
      out_of_stock_products: products?.filter(p => p.stock === 0 && p.is_active)?.length || 0,
      total_revenue: orders?.filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0) || 0,
      today_orders: todayOrders.length,
      today_revenue: todayOrders.reduce((sum, o) => sum + o.total, 0),
      average_order_value: orders?.length ? 
        orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0
    };

    return stats;
  }

  // Real-time subscriptions for admin
  subscribeToAdminLogs(callback: (payload: any) => void) {
    return supabase
      .channel('admin_logs_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_logs'
        },
        callback
      )
      .subscribe();
  }

  subscribeToSystemMetrics(callback: (payload: any) => void) {
    return supabase
      .channel('system_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'system_metrics'
        },
        callback
      )
      .subscribe();
  }
}

export const adminService = new AdminService();