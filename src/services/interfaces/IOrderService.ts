import { Order } from '../../types';
import { OrderStatus } from '../../core/enums';

export interface CreateOrderRequest {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: any;
  billingAddress?: any;
  shippingMethodId: string;
  paymentMethodId: string;
  couponCode?: string;
  notes?: string;
}

export interface IOrderService {
  createOrder(orderData: CreateOrderRequest): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getUserOrders(userId: string): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  cancelOrder(orderId: string, reason?: string): Promise<Order>;
  getOrdersByStatus(status: OrderStatus): Promise<Order[]>;
  calculateOrderTotal(items: any[], shippingMethodId: string, couponCode?: string): Promise<number>;
  validateOrder(orderData: CreateOrderRequest): Promise<boolean>;
  processRefund(orderId: string, amount?: number): Promise<any>;
  trackOrder(orderNumber: string): Promise<any>;
}