import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ordersService, CreateOrderData } from '../services/supabase/orders.service';
import { adminService } from '../services/supabase/admin.service';
import { useAuth } from './AuthContext';
import { Database } from '../types/database';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];

interface OrderWithItems extends Order {
  items: OrderItem[];
}

interface OrderContextType {
  orders: OrderWithItems[];
  loading: boolean;
  createOrder: (orderData: CreateOrderData) => Promise<string>;
  getOrderById: (id: string) => OrderWithItems | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load user orders when user changes
  useEffect(() => {
    if (user) {
      loadUserOrders();
      
      // Subscribe to real-time order updates
      const subscription = ordersService.subscribeToUserOrders(user.id, (payload) => {
        console.log('Order update received:', payload);
        loadUserOrders(); // Refresh orders when changes occur
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      setOrders([]);
    }
  }, [user]);

  const loadUserOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userOrders = await ordersService.getUserOrders(user.id);
      
      // Load items for each order
      const ordersWithItems = await Promise.all(
        userOrders.map(async (order) => {
          const items = await ordersService.getOrderItems(order.id);
          return { ...order, items };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error loading user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    if (!user) {
      throw new Error('User must be authenticated to create order');
    }

    try {
      const { order, error } = await ordersService.createOrder(user.id, orderData);
      
      if (error) {
        throw new Error(error.message);
      }

      if (order) {
        // Log order creation
        await adminService.recordSystemMetric('order_created', 1, {
          user_id: user.id,
          order_id: order.id,
          total: order.total,
          items_count: orderData.items.length
        });

        // Refresh orders list
        await loadUserOrders();
        
        return order.id;
      }

      throw new Error('Failed to create order');
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const getOrderById = (id: string): OrderWithItems | undefined => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
    try {
      const { error } = await ordersService.updateOrderStatus(id, status);
      
      if (error) {
        throw new Error(error.message);
      }

      // Log status update
      if (user) {
        await adminService.recordSystemMetric('order_status_updated', 1, {
          user_id: user.id,
          order_id: id,
          new_status: status
        });
      }

      // Refresh orders
      await loadUserOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const refreshOrders = async () => {
    await loadUserOrders();
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      createOrder,
      getOrderById,
      updateOrderStatus,
      refreshOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};