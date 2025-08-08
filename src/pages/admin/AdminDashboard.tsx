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
  Eye,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  Shield,
  Clock,
  CreditCard,
  Truck
} from 'lucide-react';
import { realTimeMonitor, AdminMetrics, MonitoringData } from '../../monitoring/RealTimeMonitor';
import { securityManager } from '../../security/SecurityManager';

const AdminDashboard: React.FC = () => {
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);
  const [orderStream, setOrderStream] = useState<MonitoringData[]>([]);
  const [paymentStream, setPaymentStream] = useState<MonitoringData[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('adminRole');
    if (!token || role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    // Subscribe to real-time updates
    realTimeMonitor.subscribe('admin-dashboard', handleRealTimeUpdate);
    
    // Load initial data
    loadDashboardData();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadDashboardData, 5000);
    
    return () => {
      realTimeMonitor.unsubscribe('admin-dashboard');
      clearInterval(interval);
    };
  }, []);

  const handleRealTimeUpdate = (data: MonitoringData) => {
    // Update streams based on data type
    if (data.type === 'order') {
      setOrderStream(prev => [data, ...prev.slice(0, 19)]);
    } else if (data.type === 'payment') {
      setPaymentStream(prev => [data, ...prev.slice(0, 19)]);
    }
    
    // Refresh metrics
    setAdminMetrics(realTimeMonitor.getAdminMetrics());
  };

  const loadDashboardData = () => {
    try {
      const metrics = realTimeMonitor.getAdminMetrics();
      const orders = realTimeMonitor.getOrderStream();
      const payments = realTimeMonitor.getPaymentStream();
      const security = securityManager.getSecurityLogs();

      setAdminMetrics(metrics);
      setOrderStream(orders);
      setPaymentStream(payments);
      setSecurityLogs(security);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'shipped':
        return 'text-gray-600 bg-gray-100';
      case 'pending':
        return 'text-gray-800 bg-gray-200';
      case 'failed':
      case 'cancelled':
        return 'text-black bg-gray-300';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg mr-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Real-time Monitoring & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 text-sm font-medium">Live</span>
              </div>
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {securityLogs.filter(log => log.severity === 'critical').length}
                </span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Real-time Business Metrics</h2>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 animate-pulse" />
                <span className="text-sm">Live Updates</span>
              </div>
            </div>
            {adminMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{adminMetrics.activeOrders}</div>
                  <div className="text-green-100 text-sm">Pesanan Aktif</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{adminMetrics.pendingPayments}</div>
                  <div className="text-green-100 text-sm">Pembayaran Pending</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{formatCurrency(adminMetrics.totalRevenue)}</div>
                  <div className="text-green-100 text-sm">Revenue Hari Ini</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{adminMetrics.conversionRate}%</div>
                  <div className="text-green-100 text-sm">Conversion Rate</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Stream */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Live Order Stream</h2>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-800 text-sm">Real-time</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {orderStream.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-medium text-gray-900">#{order.data.orderId}</div>
                      <div className="text-sm text-gray-600">{formatTime(order.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(order.data.amount)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.data.status)}`}>
                      {order.data.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Stream */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Live Payment Stream</h2>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-800 text-sm">Real-time</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {paymentStream.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      payment.data.status === 'completed' ? 'bg-green-500' :
                      payment.data.status === 'failed' ? 'bg-black' : 'bg-gray-400'
                    } animate-pulse`}></div>
                    <div>
                      <div className="font-medium text-gray-900">#{payment.data.paymentId}</div>
                      <div className="text-sm text-gray-600">{formatTime(payment.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(payment.data.amount)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.data.status)}`}>
                      {payment.data.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Monitoring */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Security Monitoring</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Active Sessions: {securityManager.getActiveSessionsCount()}
                </div>
                <div className="text-sm text-gray-600">
                  Blocked IPs: {securityManager.getBlockedIPs().length}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">System Secure</span>
                </div>
                <div className="text-sm text-green-700">No active threats detected</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">Monitoring Active</span>
                </div>
                <div className="text-sm text-gray-700">Real-time threat detection</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <span className="font-medium text-gray-900">Encryption Active</span>
                </div>
                <div className="text-sm text-gray-700">AES-256 encryption enabled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Management Actions</h2>
            <button 
              onClick={loadDashboardData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 text-center group border border-green-200">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-green-800">Manage Products</div>
              <div className="text-xs text-green-600 mt-1">59+ tanaman</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 text-center group border border-gray-200">
              <ShoppingCart className="h-8 w-8 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-gray-800">Manage Orders</div>
              <div className="text-xs text-gray-600 mt-1">{adminMetrics?.activeOrders} active</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 text-center group border border-gray-200">
              <CreditCard className="h-8 w-8 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-gray-800">Payment Monitor</div>
              <div className="text-xs text-gray-600 mt-1">{adminMetrics?.pendingPayments} pending</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-black to-gray-800 hover:from-gray-800 hover:to-black rounded-xl transition-all duration-300 text-center group">
              <Truck className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-white">Shipping Control</div>
              <div className="text-xs text-gray-300 mt-1">JNE Integration</div>
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Customer Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">{adminMetrics?.customerSatisfaction}/5</p>
                <p className="text-sm text-green-600 font-medium">Excellent rating</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Average Order Value</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(adminMetrics?.averageOrderValue || 0)}</p>
                <p className="text-sm text-green-600 font-medium">+8% from last month</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <DollarSign className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{adminMetrics?.conversionRate}%</p>
                <p className="text-sm text-green-600 font-medium">Above industry avg</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Refund Rate</p>
                <p className="text-3xl font-bold text-gray-900">{adminMetrics?.refundRate}%</p>
                <p className="text-sm text-green-600 font-medium">Very low</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;