import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Tag, ArrowLeft, Shield } from 'lucide-react';
import stripePromise, { StripeService } from '../lib/stripe';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useNewsletter } from '../contexts/NewsletterContext';
import MultiPaymentOptions from '../components/payment/MultiPaymentOptions';

interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cod';
  fee: number;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const { isSubscribed } = useNewsletter();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: ''
  });

  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);


  const shippingMethods: ShippingMethod[] = [
    { id: 'regular', name: 'Pengiriman Regular', price: 15000, estimatedDays: '3-5 hari' },
    { id: 'express', name: 'Pengiriman Express', price: 25000, estimatedDays: '1-2 hari' },
    { id: 'same-day', name: 'Same Day Delivery', price: 35000, estimatedDays: 'Hari ini' }
  ];

  const discountCodes = {
    'WELCOME10': 0.1,
    'PLANT20': 0.2,
    'NEWBIE15': 0.15,
    'NEWSLETTER5': 0.05
  };

  const subtotal = getTotalPrice();
  const taxRate = 0.11; // PPN 11%
  const tax = subtotal * taxRate;
  const selectedPaymentMethod = { id: selectedPayment, name: getPaymentName(selectedPayment), type: 'bank' as const, fee: getPaymentFee(selectedPayment) };
  const selectedShippingMethod = shippingMethods.find(s => s.id === selectedShipping);
  const paymentFee = getPaymentFee(selectedPayment);
  const shippingFee = selectedShippingMethod?.price || 0;
  let discountAmount = subtotal * appliedDiscount;
  
  // Auto-apply newsletter discount
  if (isSubscribed && appliedDiscount === 0) {
    discountAmount = subtotal * 0.05; // 5% newsletter discount
    setAppliedDiscount(0.05);
    setDiscountCode('NEWSLETTER5');
  }
  
  const total = subtotal + tax + paymentFee + shippingFee - discountAmount;

  function getPaymentName(paymentId: string): string {
    const names: { [key: string]: string } = {
      'stripe': 'Kartu Kredit/Debit (Stripe)',
      'bca': 'Transfer BCA',
      'mandiri': 'Transfer Mandiri',
      'bni': 'Transfer BNI',
      'bri': 'Transfer BRI',
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'shopeepay': 'ShopeePay',
      'linkaja': 'LinkAja',
      'cod': 'Bayar di Tempat (COD)'
    };
    return names[paymentId] || paymentId;
  }

  function getPaymentFee(paymentId: string): number {
    const fees: { [key: string]: number } = {
      'stripe': 0,
      'bca': 0,
      'mandiri': 0,
      'bni': 0,
      'bri': 0,
      'gopay': 2500,
      'ovo': 2500,
      'dana': 2500,
      'shopeepay': 2500,
      'linkaja': 2500,
      'cod': 5000
    };
    return fees[paymentId] || 0;
  }
  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const applyDiscount = () => {
    const discount = discountCodes[discountCode as keyof typeof discountCodes];
    if (discount) {
      setAppliedDiscount(discount);
      alert(`Diskon ${Math.round(discount * 100)}% berhasil diterapkan!`);
    } else {
      alert('Kode diskon tidak valid');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }
    
    if (!selectedPayment || !selectedShipping) {
      alert('Pilih metode pembayaran dan pengiriman');
      return;
    }

    setIsProcessing(true);

    try {
      // Handle Stripe payment
      if (selectedPayment === 'stripe') {
        setPaymentProcessing(true);
        
        const paymentIntent = await StripeService.createPaymentIntent({
          orderId: 'temp-' + Date.now(),
          amount: Math.round(total),
          currency: 'idr',
          customerInfo: {
            name: shippingInfo.fullName,
            email: user.email,
            phone: shippingInfo.phone
          },
          shippingAddress: shippingInfo
        });

        // Confirm payment with Stripe
        const paymentResult = await StripeService.confirmPayment(paymentIntent.id);
        
        if (!paymentResult.success) {
          throw new Error(paymentResult.error || 'Pembayaran gagal');
        }
        
        setPaymentProcessing(false);
      }

      const orderData = {
        items,
        shippingInfo,
        paymentMethod: selectedPaymentMethod,
        shippingMethod: selectedShippingMethod!,
        subtotal,
        tax,
        paymentFee,
        shippingFee,
        discountAmount,
        discountCode: appliedDiscount > 0 ? discountCode : '',
        total
      };

      const orderId = await createOrder(orderData);
      clearCart();
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pesanan');
    } finally {
      setIsProcessing(false);
      setPaymentProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mobile-padding">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Keranjang kosong</p>
          <button
            onClick={() => navigate('/products')}
            className="text-green-600 hover:underline"
          >
            Mulai belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mobile-padding">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali ke Keranjang
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {isSubscribed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Newsletter subscriber - Diskon 5% otomatis diterapkan!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-grid-1 mobile-space-y-2">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mobile-card mobile-p-3">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Informasi Pengiriman</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kota *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kode Pos *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provinsi *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mobile-card mobile-p-3">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Metode Pengiriman</h2>
              </div>
              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={selectedShipping === method.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.estimatedDays}</div>
                    </div>
                    <div className="font-semibold text-gray-900">
                      Rp {method.price.toLocaleString('id-ID')}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mobile-card mobile-p-3">
              <MultiPaymentOptions
                selectedPayment={selectedPayment}
                onPaymentSelect={setSelectedPayment}
                amount={total}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8 border border-gray-200 mobile-card mobile-p-3">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Ringkasan Pesanan</h2>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-900">
                    <span className="text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="text-gray-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pajak (PPN 11%)</span>
                  <span className="text-gray-900">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ongkos Kirim</span>
                    <span className="text-gray-900">Rp {shippingFee.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {paymentFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Biaya Admin</span>
                    <span className="text-gray-900">Rp {paymentFee.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-green-600">Diskon ({discountCode})</span>
                    <span className="text-green-600">-Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Tag className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Kode Diskon</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Masukkan kode"
                    className="flex-1 px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Terapkan
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Coba: WELCOME10, PLANT20, NEWBIE15, NEWSLETTER5
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || paymentProcessing}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mobile-btn"
              >
                {paymentProcessing ? 'Memproses Pembayaran...' : 
                 isProcessing ? 'Membuat Pesanan...' : 'Buat Pesanan'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;