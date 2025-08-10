export interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  category: string;
  height: string;
  care_level: string;
  watering_frequency: string;
  care_instructions: string;
  stock: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

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