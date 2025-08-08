import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp,
  AlertTriangle,
  Activity,
  Settings,
  LogOut,
  Bell,
  RefreshCw,
  Shield,
  Eye,
  Plus,
  Edit,
  MessageSquare,
  User,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
import { useChat } from '../../contexts/ChatContext';
import { getPlantStatistics } from '../../services/database';

const AdminDashboard: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [plantStats, setPlantStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrder();
  const { sessions, getUnreadCount } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [user, orders]);

  const loadDashboardData = async () => {
    try {
      const stats = await getPlantStatistics();
      setPlantStats(stats);

      // Get real-time data from all orders across all users
      const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
      
      // Calculate real dashboard stats
      const totalRevenue = allOrders
        .filter((order: any) => order.status === 'delivered')
        .reduce((sum: number, order: any) => sum + order.total, 0);

      const todayOrders = allOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
      });

      // Get all users from localStorage
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      
      const dashboardData = {
        total_orders: allOrders.length,
        pending_orders: allOrders.filter((o: any) => o.status === 'pending').length,
        processing_orders: allOrders.filter((o: any) => o.status === 'processing').length,
        completed_orders: allOrders.filter((o: any) => o.status === 'delivered').length,
        total_revenue: totalRevenue,
        today_orders: todayOrders.length,
        today_revenue: todayOrders.reduce((sum: number, order: any) => sum + order.total, 0),
        total_users: allUsers.length,
        total_products: stats.totalPlants,
        low_stock_products: stats.lowStockCount,
        average_order_value: allOrders.length > 0 ? totalRevenue / allOrders.length : 0,
        unread_messages: getUnreadCount()
      };

      setDashboardStats(dashboardData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'delivered');
      loadDashboardData(); // Refresh stats
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'processing':
      case 'shipped':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg mr-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Administrator</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Selamat datang, {user?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 dark:text-green-200 text-sm font-medium">Live</span>
              </div>
              <button 
                onClick={loadDashboardData}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <MessageSquare className="h-5 w-5" />
                {dashboardStats?.unread_messages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {dashboardStats.unread_messages}
                  </span>
                )}
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border dark:border-gray-700">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">Administrator</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profil Admin
                  </button>
                  <button
                    onClick={() => navigate('/admin/settings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Pengaturan
                  </button>
                  <hr className="my-1 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real-time Metrics */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Pesanan</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_orders}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {dashboardStats.today_orders} hari ini
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(dashboardStats.total_revenue)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {formatCurrency(dashboardStats.today_revenue)} hari ini
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pesan Belum Dibaca</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.unread_messages}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Customer Service</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Produk Aktif</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_products}</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                    {dashboardStats.low_stock_products} stok rendah
                  </p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <Package className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders with Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">#{order.orderNumber}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.shippingInfo.fullName} • {formatTime(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          className="p-1 text-green-600 hover:text-green-700 transition-colors"
                          title="Tandai Selesai"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Belum ada pesanan
                </div>
              )}
            </div>
          </div>

          {/* Customer Messages */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pesan Customer</h2>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                {getUnreadCount()} belum dibaca
              </span>
            </div>
            <div className="space-y-4">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white">{session.customerName}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      session.status === 'resolved' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {session.messages[session.messages.length - 1]?.message.substring(0, 100)}...
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {session.updatedAt.toLocaleTimeString('id-ID')}
                  </div>
                </div>
              ))}
              {sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Belum ada pesan customer
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Status Sistem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-700 dark:text-green-300">Database</div>
                  <div className="text-lg font-bold text-green-800 dark:text-green-200">Online</div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">OrderService</div>
                  <div className="text-lg font-bold text-yellow-800 dark:text-yellow-200">Warning</div>
                </div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Database connection timeout - Fixed
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Payment</div>
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">Active</div>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;