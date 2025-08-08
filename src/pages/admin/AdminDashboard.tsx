import React, { useEffect, useState } from 'react';
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
  Settings
} from 'lucide-react';
import { Dashboard, DashboardData, KPI, Alert, SystemHealth } from '../../models/admin/Dashboard';

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const dashboard = new Dashboard();
        const data = dashboard.generateDashboard();
        const kpiData = dashboard.getKPIs();
        const alertData = dashboard.getAlerts();
        const healthData = dashboard.getSystemHealth();

        setDashboardData(data);
        setKpis(kpiData);
        setAlerts(alertData);
        setSystemHealth(healthData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Status */}
        {systemHealth && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(systemHealth.status)}`}>
                  {systemHealth.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{systemHealth.uptime}%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{systemHealth.cpuUsage}%</div>
                  <div className="text-sm text-gray-600">CPU Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{systemHealth.memoryUsage}%</div>
                  <div className="text-sm text-gray-600">Memory</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{systemHealth.responseTime}ms</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-yellow-800">{alert.title}</div>
                      <div className="text-sm text-yellow-700">{alert.message}</div>
                    </div>
                    {alert.actionRequired && (
                      <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors">
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.totalOrders.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">Rp {dashboardData.totalRevenue.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.totalProducts.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getTrendIcon(kpi.trend)}
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{kpi.name}</div>
                      <div className="text-sm text-gray-600">Target: {kpi.target} {kpi.unit}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{kpi.value} {kpi.unit}</div>
                    <div className={`text-sm ${kpi.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.changePercentage >= 0 ? '+' : ''}{kpi.changePercentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            {dashboardData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">Active Users</span>
                  <span className="text-blue-900 font-bold">{dashboardData.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">Pending Orders</span>
                  <span className="text-yellow-900 font-bold">{dashboardData.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-800 font-medium">Low Stock Products</span>
                  <span className="text-red-900 font-bold">{dashboardData.lowStockProducts}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">Conversion Rate</span>
                  <span className="text-green-900 font-bold">{dashboardData.conversionRate}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-blue-800">Manage Users</div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
              <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-green-800">Manage Products</div>
            </button>
            <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-center">
              <ShoppingCart className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-yellow-800">Manage Orders</div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
              <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-purple-800">View Reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;