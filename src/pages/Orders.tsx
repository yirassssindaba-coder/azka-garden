import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, CreditCard, Eye } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

const Orders: React.FC = () => {
  const { orders } = useOrder();

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

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Pesanan</h2>
          <p className="text-gray-600 mb-8">
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Pesanan</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Anda belum memiliki pesanan. Mulai belanja sekarang!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Daftar Pesanan</h1>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Daftar Pesanan</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Pesanan #{order.orderNumber}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Pesanan</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Rp {order.total.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Metode Pembayaran</div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{order.paymentMethod.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pengiriman</div>
                  <div className="text-gray-900 dark:text-white">{order.shippingMethod.name}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {order.items.length} item dalam pesanan ini
                </div>
                <div className="flex space-x-4 overflow-x-auto">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">+{order.items.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;