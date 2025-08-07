import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cod';
  fee: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  orderNumber: string;
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([
    // Mock data for demonstration
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      items: [
        {
          id: '1',
          name: 'Monstera Deliciosa',
          price: 150000,
          image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
          quantity: 1
        },
        {
          id: '2',
          name: 'Snake Plant',
          price: 85000,
          image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
          quantity: 2
        }
      ],
      shippingInfo: {
        fullName: 'John Doe',
        phone: '08123456789',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta',
        postalCode: '12345',
        province: 'DKI Jakarta'
      },
      paymentMethod: {
        id: 'bca',
        name: 'Transfer BCA',
        type: 'bank',
        fee: 0
      },
      shippingMethod: {
        id: 'regular',
        name: 'Pengiriman Regular',
        price: 15000,
        estimatedDays: '3-5 hari'
      },
      subtotal: 320000,
      tax: 35200,
      paymentFee: 0,
      shippingFee: 15000,
      discountAmount: 32000,
      discountCode: 'WELCOME10',
      total: 338200,
      status: 'processing',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    }
  ]);

  const generateOrderNumber = (): string => {
    const year = new Date().getFullYear();
    const orderCount = orders.length + 1;
    return `ORD-${year}-${orderCount.toString().padStart(3, '0')}`;
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order['status']): void => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrderById,
      updateOrderStatus
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