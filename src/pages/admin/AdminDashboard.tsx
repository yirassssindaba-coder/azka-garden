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
  RefreshCw
} from 'lucide-react';
import { Dashboard, DashboardData, KPI, Alert, SystemHealth } from '../../models/admin/Dashboard';
import { getPlantStatistics } from '../../services/database';

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [plantStats, setPlantStats] = useState<any>(null);
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

    const loadDashboardData = async () => {
      try {
        const dashboard = new Dashboard();
        const data = dashboard.generateDashboard();
        const kpiData = dashboard.getKPIs();
        const alertData = dashboard.getAlerts();
        const healthData = dashboard.getSystemHealth();
        const plantStatsData = await getPlantStatistics();

        setDashboardData(data);
        setKpis(kpiData);
        setAlerts(alertData);
        setSystemHealth(healthData);
        setPlantStats(plantStatsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
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

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

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
                <p className="text-sm text-gray-600">Azka Garden Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Settings className="h-5 w-5" />
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
        {/* Quick Stats Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Selamat Datang, Administrator</h2>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">{plantStats?.totalPlants || 59}</div>
                <div className="text-green-100 text-sm">Total Produk</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-green-100 text-sm">Total Pesanan</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">Rp 125M</div>
                <div className="text-green-100 text-sm">Total Revenue</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-green-100 text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health Status */}
        {systemHealth && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">System Health</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(systemHealth.status)}`}>
                  {systemHealth.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{systemHealth.uptime}%</div>
                  <div className="text-sm text-gray-600 font-medium">Uptime</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{systemHealth.cpuUsage}%</div>
                  <div className="text-sm text-gray-600 font-medium">CPU Usage</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{systemHealth.memoryUsage}%</div>
                  <div className="text-sm text-gray-600 font-medium">Memory</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{systemHealth.responseTime}ms</div>
                  <div className="text-sm text-gray-600 font-medium">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {alerts.length} Active
                </span>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4" />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-800">{alert.title}</div>
                      <div className="text-sm text-yellow-700 mt-1">{alert.message}</div>
                    </div>
                    {alert.actionRequired && (
                      <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                        Action Required
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 font-medium">+12% dari bulan lalu</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalOrders.toLocaleString()}</p>
                  <p className="text-sm text-green-600 font-medium">+8% dari bulan lalu</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">Rp {dashboardData.totalRevenue.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-green-600 font-medium">+15% dari bulan lalu</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{plantStats?.totalPlants || dashboardData.totalProducts}</p>
                  <p className="text-sm text-green-600 font-medium">59+ Varietas</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Key Performance Indicators</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Details
              </button>
            </div>
            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-green-50 hover:to-green-100 transition-all">
                  <div className="flex items-center">
                    {getTrendIcon(kpi.trend)}
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">{kpi.name}</div>
                      <div className="text-sm text-gray-600">Target: {kpi.target} {kpi.unit}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{kpi.value} {kpi.unit}</div>
                    <div className={`text-sm ${kpi.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.changePercentage >= 0 ? '+' : ''}{kpi.changePercentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Inventory Overview</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Manage Stock
              </button>
            </div>
            {dashboardData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <span className="text-blue-800 font-semibold">Active Users</span>
                  <span className="text-blue-900 font-bold text-lg">{dashboardData.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <span className="text-yellow-800 font-semibold">Pending Orders</span>
                  <span className="text-yellow-900 font-bold text-lg">{dashboardData.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                  <span className="text-red-800 font-semibold">Low Stock Products</span>
                  <span className="text-red-900 font-bold text-lg">{plantStats?.lowStockCount || dashboardData.lowStockProducts}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <span className="text-green-800 font-semibold">Conversion Rate</span>
                  <span className="text-green-900 font-bold text-lg">{dashboardData.conversionRate}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Categories Overview */}
        {plantStats && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Product Categories</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {plantStats.categoryDistribution.map((category: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                    <div className="text-sm text-gray-600 font-medium">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 text-center group">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-blue-800">Manage Users</div>
              <div className="text-xs text-blue-600 mt-1">1,250 users</div>
            </button>
            <button className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 text-center group">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-green-800">Manage Products</div>
              <div className="text-xs text-green-600 mt-1">{plantStats?.totalPlants || 59} products</div>
            </button>
            <button className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-xl transition-all duration-300 text-center group">
              <ShoppingCart className="h-8 w-8 text-yellow-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-yellow-800">Manage Orders</div>
              <div className="text-xs text-yellow-600 mt-1">23 pending</div>
            </button>
            <button className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 text-center group">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-purple-800">View Reports</div>
              <div className="text-xs text-purple-600 mt-1">Analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;