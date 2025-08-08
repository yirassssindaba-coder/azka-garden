export interface MidtransConfig {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
}

export interface MidtransTransaction {
  order_id: string;
  gross_amount: number;
  payment_type: string;
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    billing_address: any;
    shipping_address: any;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
}

export interface MidtransResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  redirect_url?: string;
  token?: string;
}

export class MidtransService {
  private config: MidtransConfig;
  private baseUrl: string;

  constructor(config: MidtransConfig) {
    this.config = config;
    this.baseUrl = config.isProduction 
      ? 'https://api.midtrans.com/v2'
      : 'https://api.sandbox.midtrans.com/v2';
  }

  async createTransaction(transaction: MidtransTransaction): Promise<MidtransResponse> {
    try {
      // Simulate Midtrans API call
      console.log('Creating Midtrans transaction:', transaction);
      
      // Mock response for demo
      const mockResponse: MidtransResponse = {
        status_code: '201',
        status_message: 'Success, transaction is found',
        transaction_id: 'mid_' + Date.now(),
        order_id: transaction.order_id,
        merchant_id: 'G123456789',
        gross_amount: transaction.gross_amount.toString(),
        currency: 'IDR',
        payment_type: 'bank_transfer',
        transaction_time: new Date().toISOString(),
        transaction_status: 'pending',
        fraud_status: 'accept',
        redirect_url: 'https://app.sandbox.midtrans.com/snap/v1/transactions/' + transaction.order_id,
        token: 'snap_token_' + Math.random().toString(36).substr(2, 9)
      };

      return mockResponse;
    } catch (error) {
      console.error('Midtrans transaction failed:', error);
      throw new Error('Failed to create Midtrans transaction');
    }
  }

  async getTransactionStatus(orderId: string): Promise<MidtransResponse> {
    try {
      console.log('Getting transaction status for:', orderId);
      
      // Mock status check
      const mockResponse: MidtransResponse = {
        status_code: '200',
        status_message: 'Success, transaction is found',
        transaction_id: 'mid_' + Date.now(),
        order_id: orderId,
        merchant_id: 'G123456789',
        gross_amount: '150000',
        currency: 'IDR',
        payment_type: 'bank_transfer',
        transaction_time: new Date().toISOString(),
        transaction_status: 'settlement',
        fraud_status: 'accept'
      };

      return mockResponse;
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      throw new Error('Failed to get transaction status');
    }
  }

  async cancelTransaction(orderId: string): Promise<MidtransResponse> {
    try {
      console.log('Cancelling transaction:', orderId);
      
      const mockResponse: MidtransResponse = {
        status_code: '200',
        status_message: 'Success, transaction is canceled',
        transaction_id: 'mid_' + Date.now(),
        order_id: orderId,
        merchant_id: 'G123456789',
        gross_amount: '150000',
        currency: 'IDR',
        payment_type: 'bank_transfer',
        transaction_time: new Date().toISOString(),
        transaction_status: 'cancel',
        fraud_status: 'accept'
      };

      return mockResponse;
    } catch (error) {
      console.error('Failed to cancel transaction:', error);
      throw new Error('Failed to cancel transaction');
    }
  }

  async refundTransaction(orderId: string, amount?: number): Promise<MidtransResponse> {
    try {
      console.log('Refunding transaction:', orderId, 'Amount:', amount);
      
      const mockResponse: MidtransResponse = {
        status_code: '200',
        status_message: 'Success, refund is created',
        transaction_id: 'mid_' + Date.now(),
        order_id: orderId,
        merchant_id: 'G123456789',
        gross_amount: amount?.toString() || '150000',
        currency: 'IDR',
        payment_type: 'bank_transfer',
        transaction_time: new Date().toISOString(),
        transaction_status: 'refund',
        fraud_status: 'accept'
      };

      return mockResponse;
    } catch (error) {
      console.error('Failed to refund transaction:', error);
      throw new Error('Failed to refund transaction');
    }
  }

  generateSnapToken(transaction: MidtransTransaction): string {
    // In real implementation, this would call Midtrans Snap API
    return 'snap_token_' + Math.random().toString(36).substr(2, 9);
  }

  verifySignature(orderId: string, statusCode: string, grossAmount: string, signature: string): boolean {
    // In real implementation, this would verify the signature using server key
    const expectedSignature = this.createSignature(orderId, statusCode, grossAmount);
    return signature === expectedSignature;
  }

  private createSignature(orderId: string, statusCode: string, grossAmount: string): string {
    // Simplified signature creation for demo
    return btoa(`${orderId}${statusCode}${grossAmount}${this.config.serverKey}`);
  }
}

// Export configured instance
export const midtransService = new MidtransService({
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'demo-server-key',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || 'demo-client-key',
  isProduction: process.env.NODE_ENV === 'production'
});