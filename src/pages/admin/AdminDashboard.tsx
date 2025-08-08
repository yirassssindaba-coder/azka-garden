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
  CreditCard,
  Truck,
  Eye,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/supabase/admin.service';
import { ordersService } from '../../services/supabase/orders.service';
import { productsService } from '../../services/supabase/products.service';

const AdminDashboard: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [adminLogs, setAdminLogs] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    
    // Subscribe to real-time updates
    const ordersSubscription = ordersService.subscribeToOrders((payload) => {
      console.log('New order update:', payload);
      loadDashboardData();
    });

    const logsSubscription = adminService.subscribeToAdminLogs((payload) => {
      console.log('New admin log:', payload);
      loadAdminLogs();
    });

    return () => {
      clearInterval(interval);
      ordersSubscription.unsubscribe();
      logsSubscription.unsubscribe();
    };
  }, [user, isAdmin]);

  const loadDashboardData = async () => {
    try {
      const [stats, orders, products] = await Promise.all([
        adminService.getDashboardStats(),
        ordersService.getAllOrders({ limit: 10 }),
        productsService.getProducts({ in_stock: false })
      ]);

      setDashboardStats(stats);
      setRecentOrders(orders);
      setLowStockProducts(products.filter(p => p.stock <= 5));
      
      // Log admin dashboard view
      if (user) {
        await adminService.logAdminAction(
          user.id,
          'view_dashboard',
          'dashboard',
          undefined,
          { timestamp: new Date().toISOString() }
        );
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminLogs = async () => {
    try {
      const logs = await adminService.getAdminLogs(20);
      setAdminLogs(logs);
    } catch (error) {
      console.error('Error loading admin logs:', error);
    }
  };

  const handleLogout = async () => {
    try {
      if (user) {
        await adminService.logAdminAction(
          user.id,
          'logout',
          'auth',
          undefined,
          { timestamp: new Date().toISOString() }
        );
      }
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
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
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Selamat datang, {profile?.full_name}</p>
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
                <Bell className="h-5 w-5" />
                {lowStockProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {lowStockProducts.length}
                  </span>
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Pengguna</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_users}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Pelanggan aktif</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
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

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
              <button 
                onClick={() => navigate('/admin/orders')}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
              >
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">#{order.order_number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.profiles?.full_name} • {formatTime(order.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Stok Rendah</h2>
              <button 
                onClick={() => navigate('/admin/products')}
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
              >
                Kelola Produk
              </button>
            </div>
            <div className="space-y-4">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-orange-600 dark:text-orange-400">
                      Stok: {product.stock}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button 
              onClick={() => navigate('/admin/products/new')}
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800 dark:hover:to-green-700 rounded-xl transition-all duration-300 text-center group border border-green-200 dark:border-green-700"
            >
              <Plus className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-green-800 dark:text-green-200">Tambah Produk</div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/orders')}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 rounded-xl transition-all duration-300 text-center group border border-blue-200 dark:border-blue-700"
            >
              <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">Kelola Pesanan</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{dashboardStats?.pending_orders} pending</div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 rounded-xl transition-all duration-300 text-center group border border-purple-200 dark:border-purple-700"
            >
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">Kelola Pengguna</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">{dashboardStats?.total_users} pengguna</div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/analytics')}
              className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl transition-all duration-300 text-center group border border-gray-200 dark:border-gray-600"
            >
              <TrendingUp className="h-8 w-8 text-gray-600 dark:text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Analytics</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Laporan lengkap</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;