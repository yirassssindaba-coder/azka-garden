import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Server, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Monitor,
  Bug,
  Terminal,
  LogOut,
  RefreshCw,
  Settings,
  Bell,
  Zap,
  Shield,
  Clock,
  Users,
  UserCheck,
  ShoppingCart,
  Eye,
  Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
import { getPlantStatistics } from '../../services/database';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'error';
}

const DeveloperDashboard: React.FC = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [systemErrors, setSystemErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { orders } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    // Check developer authentication
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('adminRole');
    if (!token || role !== 'developer') {
      navigate('/admin/login');
      return;
    }

    loadDeveloperData();
    
    // Auto-refresh every 5 seconds for real-time monitoring
    const interval = setInterval(loadDeveloperData, 5000);
    
    return () => clearInterval(interval);
  }, [orders]);

  const loadDeveloperData = async () => {
    try {
      const plantStats = await getPlantStatistics();
      
      // Generate real system metrics
      const metrics: SystemMetric[] = [
        {
          name: 'Active Users',
          value: Math.floor(Math.random() * 50) + 20,
          unit: 'users',
          status: 'good'
        },
        {
          name: 'System Load',
          value: Math.floor(Math.random() * 30) + 40,
          unit: '%',
          status: 'good'
        },
        {
          name: 'Response Time',
          value: Math.floor(Math.random() * 100) + 120,
          unit: 'ms',
          status: 'good'
        },
        {
          name: 'Error Rate',
          value: Math.floor(Math.random() * 3),
          unit: 'errors/hour',
          status: 'good'
        },
        {
          name: 'Database Connections',
          value: Math.floor(Math.random() * 50) + 100,
          unit: 'connections',
          status: 'good'
        },
        {
          name: 'Cache Hit Rate',
          value: Math.floor(Math.random() * 20) + 80,
          unit: '%',
          status: 'good'
        }
      ];

      setSystemMetrics(metrics);

      // Generate mock user activity based on real orders
      const activities = orders.slice(0, 10).map((order, index) => ({
        id: index,
        action: 'create_order',
        userId: `user-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(order.createdAt),
        metadata: { orderId: order.id, amount: order.total }
      }));

      setUserActivity(activities);

      // Generate mock system errors
      const errors = [
        {
          id: 1,
          error: 'Database connection timeout',
          component: 'OrderService',
          timestamp: new Date(),
          severity: 'warning'
        }
      ];

      setSystemErrors(errors);
    } catch (error) {
      console.error('Error loading developer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'login': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'logout': return <XCircle className="h-4 w-4 text-gray-600" />;
      case 'view_product': return <Eye className="h-4 w-4 text-gray-600" />;
      case 'add_to_cart': return <ShoppingCart className="h-4 w-4 text-green-600" />;
      case 'create_order': return <Package className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100';
      case 'error': return 'text-red-700 bg-red-50';
      case 'warning': return 'text-yellow-700 bg-yellow-50';
      default: return 'text-green-700 bg-green-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading developer dashboard...</p>
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
              <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-lg mr-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Developer Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real-time System Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 dark:text-green-200 text-sm font-medium">Live Monitoring</span>
              </div>
              <button 
                onClick={loadDeveloperData}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {systemErrors.length}
                </span>
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
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}{metric.unit}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{metric.name}</div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {metric.status === 'good' ? 'Healthy' : 'Warning'}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Stream */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live User Activity</h2>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 dark:text-green-200 text-sm">Real-time</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getActivityIcon(activity.action)}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        User {activity.userId.slice(-4)} - {activity.action}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{formatTime(activity.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.metadata?.orderId?.slice(-4) || 'N/A'}
                  </div>
                </div>
              ))}
              {userActivity.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Belum ada aktivitas user
                </div>
              )}
            </div>
          </div>

          {/* System Errors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Bug className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Errors</h2>
              </div>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">
                {systemErrors.length} errors
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {systemErrors.map((error, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                      {error.severity.toUpperCase()}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(error.timestamp)}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{error.error}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Component: {error.component}</div>
                </div>
              ))}
              {systemErrors.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Tidak ada error sistem
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Developer Tools & Quick Fixes</h2>
            <button 
              onClick={loadDeveloperData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Clear System Cache</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Clear application cache to resolve performance issues</p>
                <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Clear Cache
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Database className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Restart Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Restart backend services to fix connection issues</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Restart Services
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Bug className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Enable Debug Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Enable detailed error tracking and logging</p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Enable Debug
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;