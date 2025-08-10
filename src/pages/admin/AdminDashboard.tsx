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
  Settings,
  LogOut,
  Bell,
  RefreshCw,
  Shield,
  Eye,
  Plus,
  Edit,
  User,
  CheckCircle,
  FileText,
  CreditCard,
  Truck,
  Calendar,
  Search,
  Filter,
  Trash2,
  Save,
  X,
  MessageSquare,
  Reply,
  Send,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
import { getPlantStatistics } from '../../services/database';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [plantStats, setPlantStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [user, orders]);

  const loadDashboardData = async () => {
    try {
      const stats = await getPlantStatistics();
      setPlantStats(stats);

      const allOrdersData = JSON.parse(localStorage.getItem('all_orders') || '[]');
      const allUsersData = JSON.parse(localStorage.getItem('all_users') || '[]');
      const reviewsData = JSON.parse(localStorage.getItem('global-reviews') || '[]');
      
      setAllOrders(allOrdersData);
      setAllUsers(allUsersData);
      setReviews(reviewsData);

      const totalRevenue = allOrdersData
        .filter((order: any) => order.status === 'delivered')
        .reduce((sum: number, order: any) => sum + order.total, 0);

      const todayOrders = allOrdersData.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
      });

      const dashboardData = {
        total_orders: allOrdersData.length,
        pending_orders: allOrdersData.filter((o: any) => o.status === 'pending').length,
        processing_orders: allOrdersData.filter((o: any) => o.status === 'processing').length,
        completed_orders: allOrdersData.filter((o: any) => o.status === 'delivered').length,
        total_revenue: totalRevenue,
        today_orders: todayOrders.length,
        today_revenue: todayOrders.reduce((sum: number, order: any) => sum + order.total, 0),
        total_users: allUsersData.length,
        total_products: stats.totalPlants,
        low_stock_products: stats.lowStockCount,
        average_order_value: allOrdersData.length > 0 ? totalRevenue / allOrdersData.length : 0
      };

      setDashboardStats(dashboardData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyToReview = async (reviewId: string) => {
    if (!user || !replyComment.trim()) return;

    const newReply = {
      id: 'reply-' + Date.now(),
      userId: user.id,
      userName: user.fullName || user.email,
      userRole: 'admin',
      comment: replyComment,
      likes: [],
      createdAt: new Date()
    };

    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? {
            ...review,
            replies: [...(review.replies || []), newReply],
            updatedAt: new Date()
          }
        : review
    );

    setReviews(updatedReviews);
    localStorage.setItem('global-reviews', JSON.stringify(updatedReviews));
    setReplyComment('');
    setReplyTo(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const allOrdersData = JSON.parse(localStorage.getItem('all_orders') || '[]');
      const updatedOrders = allOrdersData.map((order: any) => 
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      );
      localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
      setAllOrders(updatedOrders);
      loadDashboardData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      const updatedUsers = allUsers.filter(u => u.id !== userId);
      setAllUsers(updatedUsers);
      localStorage.setItem('all_users', JSON.stringify(updatedUsers));
      loadDashboardData();
    }
  };

  const handleEditUser = (userId: string) => {
    setEditingUser(editingUser === userId ? null : userId);
  };

  const handleSaveUser = (userId: string, userData: any) => {
    const updatedUsers = allUsers.map(u => 
      u.id === userId ? { ...u, ...userData, updatedAt: new Date().toISOString() } : u
    );
    setAllUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    loadDashboardData();
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'developer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'developer': return 'Pengembang';
      default: return 'Pelanggan';
    }
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shippingInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = allUsers.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat dashboard administrator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Portal Administrator - Azka Garden</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Management & Analytics Dashboard</p>
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
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
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Kembali ke Website
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

      {/* Admin Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 lg:space-x-4 min-w-max">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'Manajemen Pengguna', icon: Users },
              { id: 'products', label: 'Manajemen Produk', icon: Package },
              { id: 'orders', label: 'Manajemen Pesanan', icon: ShoppingCart },
              { id: 'customer-service', label: 'Customer Service', icon: MessageSquare },
              { id: 'reviews', label: 'Ulasan & Komentar', icon: Star },
              { id: 'payments', label: 'Pembayaran', icon: CreditCard },
              { id: 'shipping', label: 'Pengiriman', icon: Truck },
              { id: 'analytics', label: 'Analisis & Laporan', icon: TrendingUp },
              { id: 'content', label: 'Manajemen Konten', icon: FileText },
              { id: 'security', label: 'Audit & Keamanan', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 lg:space-x-2 py-4 px-2 lg:px-3 border-b-2 font-medium text-xs lg:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && dashboardStats && (
          <div className="space-y-8">
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Pesanan</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_orders}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {dashboardStats.today_orders} hari ini
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(dashboardStats.total_revenue)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {formatCurrency(dashboardStats.today_revenue)} hari ini
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Pengguna</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_users}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Terdaftar</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Produk Aktif</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.total_products}</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      {dashboardStats.low_stock_products} stok rendah
                    </p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                    <Package className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pesanan Terbaru</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {allOrders.slice(0, 10).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">#{order.orderNumber}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {order.shippingInfo?.fullName} • {formatTime(order.createdAt)}
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

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pengguna Terbaru</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {allUsers.slice(-10).reverse().map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                            {userData.fullName?.charAt(0) || userData.email?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{userData.fullName || userData.email}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{userData.email}</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(userData.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Management Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Ulasan & Komentar</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total: {reviews.length} ulasan
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">{review.userName}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(review.userRole)}`}>
                            {getRoleLabel(review.userRole)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.likes?.length || 0} likes • {review.replies?.length || 0} balasan
                    </span>
                    
                    <button
                      onClick={() => setReplyTo(replyTo === review.id ? null : review.id)}
                      className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Balas sebagai Admin</span>
                    </button>
                  </div>

                  {/* Admin Reply Form */}
                  {replyTo === review.id && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <textarea
                            rows={3}
                            value={replyComment}
                            onChange={(e) => setReplyComment(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-green-200 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-400 text-sm transition-all duration-200"
                            placeholder="Tulis balasan sebagai Administrator..."
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setReplyTo(null)}
                              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                              Batal
                            </button>
                            <button
                              onClick={() => handleReplyToReview(review.id)}
                              disabled={!replyComment.trim()}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 hover:shadow-lg transition-all duration-200 disabled:opacity-50 transform hover:scale-105"
                            >
                              <Send className="h-3 w-3" />
                              <span>Kirim Balasan</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Existing Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="ml-8 space-y-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                      {review.replies.map((reply: any) => (
                        <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <span className="text-green-600 dark:text-green-400 font-bold text-xs">
                                {reply.userName.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.userName}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              reply.userRole === 'admin' ? 'bg-green-100 text-green-800' :
                              reply.userRole === 'developer' ? 'bg-green-200 text-green-900' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {getRoleLabel(reply.userRole)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(reply.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Belum ada ulasan</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Pengguna</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-64"
                  />
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Tambah Pengguna
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pengguna
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Bergabung
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {filteredUsers.map((userData) => (
                      <tr key={userData.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                                {userData.fullName?.charAt(0) || userData.email?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {userData.fullName || userData.email}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userData.role === 'ADMIN' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            userData.role === 'DEVELOPER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {userData.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(userData.createdAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Aktif
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditUser(userData.id)}
                              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(userData.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Management Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Pesanan</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Cari pesanan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-64"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pesanan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pelanggan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">#{order.orderNumber}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.items?.length} item</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{order.shippingInfo?.fullName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.shippingInfo?.phone}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-green-500 ${getStatusColor(order.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                           {order.status !== 'delivered' && order.status !== 'cancelled' && (
                             <button
                               onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                               className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium flex items-center space-x-1"
                               title="Tandai sebagai selesai"
                             >
                               <CheckCircle className="h-3 w-3" />
                               <span>Selesai</span>
                             </button>
                           )}
                            <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Management Tab */}
        {activeTab === 'products' && plantStats && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Produk</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2 inline" />
                Tambah Produk
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{plantStats.totalPlants}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Produk</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{plantStats.lowStockCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stok Rendah</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{plantStats.outOfStockCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stok Habis</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{plantStats.totalCategories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Kategori</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribusi Kategori</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plantStats.categoryDistribution.map((category: any) => (
                  <div key={category.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{category.count}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">produk</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && dashboardStats && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analisis & Laporan</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performa Penjualan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rata-rata Order</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(dashboardStats.average_order_value)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">4.8/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Status Pesanan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Pending</span>
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">{dashboardStats.pending_orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{dashboardStats.processing_orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Completed</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{dashboardStats.completed_orders}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Inventory Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Produk</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{dashboardStats.total_products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Stok Rendah</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">{dashboardStats.low_stock_products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Stok Habis</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {['payments', 'shipping', 'content', 'security'].includes(activeTab) && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-100 dark:border-gray-700">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Settings className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === 'payments' && 'Manajemen Pembayaran'}
              {activeTab === 'shipping' && 'Manajemen Pengiriman'}
              {activeTab === 'content' && 'Manajemen Konten'}
              {activeTab === 'security' && 'Audit & Keamanan'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fitur ini sedang dalam pengembangan dan akan segera tersedia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;