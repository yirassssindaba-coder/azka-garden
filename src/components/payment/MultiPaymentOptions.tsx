import React, { useState } from 'react';
import { CreditCard, Building, Smartphone, Truck, Shield, CheckCircle } from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cod' | 'crypto';
  fee: number;
  icon: string;
  description: string;
  processingTime: string;
}

interface MultiPaymentOptionsProps {
  selectedPayment: string;
  onPaymentSelect: (paymentId: string) => void;
  amount: number;
}

const MultiPaymentOptions: React.FC<MultiPaymentOptionsProps> = ({
  selectedPayment,
  onPaymentSelect,
  amount
}) => {
  const paymentOptions: PaymentOption[] = [
    // Stripe Integration
    {
      id: 'stripe',
      name: 'Kartu Kredit/Debit (Stripe)',
      type: 'bank',
      fee: 0,
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      processingTime: 'Instan'
    },
    
    // Indonesian Banks
    {
      id: 'bca',
      name: 'Transfer BCA',
      type: 'bank',
      fee: 0,
      icon: '🏦',
      description: 'Bank Central Asia',
      processingTime: '1-24 jam'
    },
    {
      id: 'mandiri',
      name: 'Transfer Mandiri',
      type: 'bank',
      fee: 0,
      icon: '🏦',
      description: 'Bank Mandiri',
      processingTime: '1-24 jam'
    },
    {
      id: 'bni',
      name: 'Transfer BNI',
      type: 'bank',
      fee: 0,
      icon: '🏦',
      description: 'Bank Negara Indonesia',
      processingTime: '1-24 jam'
    },
    {
      id: 'bri',
      name: 'Transfer BRI',
      type: 'bank',
      fee: 0,
      icon: '🏦',
      description: 'Bank Rakyat Indonesia',
      processingTime: '1-24 jam'
    },
    
    // E-Wallets
    {
      id: 'gopay',
      name: 'GoPay',
      type: 'ewallet',
      fee: 2500,
      icon: '📱',
      description: 'Pembayaran digital Gojek',
      processingTime: 'Instan'
    },
    {
      id: 'ovo',
      name: 'OVO',
      type: 'ewallet',
      fee: 2500,
      icon: '📱',
      description: 'Dompet digital OVO',
      processingTime: 'Instan'
    },
    {
      id: 'dana',
      name: 'DANA',
      type: 'ewallet',
      fee: 2500,
      icon: '📱',
      description: 'Dompet digital DANA',
      processingTime: 'Instan'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      type: 'ewallet',
      fee: 2500,
      icon: '📱',
      description: 'Dompet digital Shopee',
      processingTime: 'Instan'
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      type: 'ewallet',
      fee: 2500,
      icon: '📱',
      description: 'Dompet digital LinkAja',
      processingTime: 'Instan'
    },
    
    // Cash on Delivery
    {
      id: 'cod',
      name: 'Bayar di Tempat (COD)',
      type: 'cod',
      fee: 5000,
      icon: '💰',
      description: 'Bayar saat tanaman sampai',
      processingTime: 'Saat pengiriman'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Building className="h-5 w-5" />;
      case 'ewallet': return <Smartphone className="h-5 w-5" />;
      case 'cod': return <Truck className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bank': return 'text-blue-600';
      case 'ewallet': return 'text-green-600';
      case 'cod': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Pilih Metode Pembayaran</h3>
      </div>
      
      {paymentOptions.map((option) => (
        <label
          key={option.id}
          className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md mobile-card ${
            selectedPayment === option.id
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white hover:border-green-300'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={option.id}
            checked={selectedPayment === option.id}
            onChange={(e) => onPaymentSelect(e.target.value)}
            className="sr-only"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getTypeColor(option.type)} bg-opacity-10`}>
                <span className="text-2xl">{option.icon}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mobile-text-sm">{option.name}</div>
                <div className="text-sm text-gray-600 mobile-text-xs">{option.description}</div>
                <div className="text-xs text-gray-500 mobile-text-xs">
                  Proses: {option.processingTime}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              {option.fee > 0 ? (
                <div className="text-sm text-gray-600 mobile-text-xs">
                  +Rp {option.fee.toLocaleString('id-ID')}
                </div>
              ) : (
                <div className="text-sm text-green-600 mobile-text-xs">Gratis</div>
              )}
              
              {selectedPayment === option.id && (
                <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              )}
            </div>
          </div>
          
          {option.id === 'stripe' && (
            <div className="mt-2 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">Pembayaran aman dengan enkripsi SSL</span>
            </div>
          )}
        </label>
      ))}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1 mobile-text-sm">Keamanan Pembayaran</h4>
            <p className="text-blue-700 text-sm mobile-text-xs">
              Semua transaksi dienkripsi dan dilindungi dengan standar keamanan internasional. 
              Data kartu kredit tidak disimpan di server kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPaymentOptions;