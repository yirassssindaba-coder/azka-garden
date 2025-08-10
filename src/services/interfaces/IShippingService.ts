import { ShippingMethod, CartItem } from '../../types';
import { Address } from '../../types/auth';

export interface ShippingRate {
  methodId: string;
  name: string;
  price: number;
  estimatedDays: string;
  description?: string;
}

export interface CreateShipmentRequest {
  orderId: string;
  shippingMethodId: string;
  shippingAddress: Address;
  items: CartItem[];
  weight?: number;
  dimensions?: any;
}

export interface Shipping {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  method: string;
  status: string;
  shippedAt?: Date;
  estimatedDeliveryAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingTracking {
  trackingNumber: string;
  status: string;
  events: ShippingEvent[];
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

export interface ShippingEvent {
  timestamp: Date;
  status: string;
  location: string;
  description: string;
}

export interface IShippingService {
  calculateShipping(address: Address, items: CartItem[]): Promise<ShippingRate[]>;
  createShipment(shipmentData: CreateShipmentRequest): Promise<Shipping>;
  trackShipment(trackingNumber: string): Promise<ShippingTracking>;
  getShippingMethods(): Promise<ShippingMethod[]>;
  getShippingById(id: string): Promise<Shipping | null>;
  updateShippingStatus(id: string, status: string): Promise<Shipping>;
  cancelShipment(id: string): Promise<void>;
  getShippingRates(origin: Address, destination: Address, weight: number): Promise<ShippingRate[]>;
}