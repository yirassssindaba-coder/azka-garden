import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Calendar, Phone, User } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrder();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Pesanan tidak ditemukan</p>
          <Link to="/orders" className="text-green-600 hover:underline">
            Kembali ke daftar pesanan
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'processing':
        return 'Diproses';
      case 'shipped':
        return 'Dikirim';
      case 'delivered':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/orders"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali ke Daftar Pesanan
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pesanan #{order.orderNumber}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                Dibuat pada {new Date(order.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Order Items */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Item Pesanan
                </h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Informasi Pengiriman
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="font-medium">{order.shippingInfo.fullName}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 mr-2 text-gray-600" />
                        <span>{order.shippingInfo.phone}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Alamat:</div>
                      <div className="text-gray-900">
                        {order.shippingInfo.address}<br />
                        {order.shippingInfo.city}, {order.shippingInfo.postalCode}<br />
                        {order.shippingInfo.province}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Shipping Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Metode Pembayaran
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium">{order.paymentMethod.name}</div>
                    {order.paymentMethod.fee > 0 && (
                      <div className="text-sm text-gray-600">
                        Biaya admin: Rp {order.paymentMethod.fee.toLocaleString('id-ID')}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Metode Pengiriman
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium">{order.shippingMethod.name}</div>
                    <div className="text-sm text-gray-600">
                      Estimasi: {order.shippingMethod.estimatedDays}
                    </div>
                    <div className="text-sm text-gray-600">
                      Biaya: Rp {order.shippingMethod.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak (PPN 11%)</span>
                    <span>Rp {order.tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span>Rp {order.shippingFee.toLocaleString('id-ID')}</span>
                  </div>
                  {order.paymentFee > 0 && (
                    <div className="flex justify-between">
                      <span>Biaya Admin</span>
                      <span>Rp {order.paymentFee.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon ({order.discountCode})</span>
                      <span>-Rp {order.discountAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>Rp {order.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                {order.status === 'pending' && (
                  <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors mb-4">
                    Bayar Sekarang
                  </button>
                )}

                {order.status === 'shipped' && (
                  <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4">
                    Lacak Pengiriman
                  </button>
                )}

                <Link
                  to="/products"
                  className="block text-center text-green-600 hover:text-green-700 font-medium"
                >
                  Belanja Lagi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;