import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem, ShippingInfo, PaymentMethod, ShippingMethod } from '../types';
import { useAuth } from './AuthContext';

interface CreateOrderData {
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  subtotal: number;
  tax: number;
  paymentFee: number;
  shippingFee: number;
  discountAmount: number;
  discountCode: string;
  total: number;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  createOrder: (orderData: CreateOrderData) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load orders from localStorage
  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.id}`);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  // Save orders to localStorage
  useEffect(() => {
    if (user && orders.length > 0) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const generateOrderNumber = (): string => {
    const year = new Date().getFullYear();
    const orderCount = orders.length + 1;
    return `ORD-${year}-${orderCount.toString().padStart(3, '0')}`;
  };

  const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    if (!user) {
      throw new Error('User must be authenticated to create order');
    }

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(),
        items: orderData.items,
        shippingInfo: orderData.shippingInfo,
        paymentMethod: orderData.paymentMethod,
        shippingMethod: orderData.shippingMethod,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        paymentFee: orderData.paymentFee,
        shippingFee: orderData.shippingFee,
        discountAmount: orderData.discountAmount,
        discountCode: orderData.discountCode,
        total: orderData.total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setOrders(prev => [newOrder, ...prev]);
      return newOrder.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setOrders(prev => prev.map(order => 
        order.id === id 
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    // In a real app, this would refetch from the server
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
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