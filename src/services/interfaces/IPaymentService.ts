import { PaymentMethod } from '../../types';

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethodId: string;
  customerInfo: any;
  billingAddress: any;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  gatewayResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentVerification {
  isValid: boolean;
  status: string;
  transactionId: string;
  amount: number;
  currency: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: string;
  refundId?: string;
  createdAt: Date;
}

export interface IPaymentService {
  processPayment(paymentData: PaymentRequest): Promise<Payment>;
  verifyPayment(paymentId: string): Promise<PaymentVerification>;
  refundPayment(paymentId: string, amount: number, reason: string): Promise<Refund>;
  getPaymentMethods(): Promise<PaymentMethod[]>;
  getPaymentById(id: string): Promise<Payment | null>;
  getPaymentsByOrder(orderId: string): Promise<Payment[]>;
  cancelPayment(paymentId: string): Promise<void>;
  updatePaymentStatus(paymentId: string, status: string): Promise<Payment>;
}