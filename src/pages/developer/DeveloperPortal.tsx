import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Code, 
  Database, 
  Server, 
  Activity, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  GitBranch,
  Bug,
  Zap
} from 'lucide-react';

const DeveloperPortal: React.FC = () => {
  const { user } = useAuth();
  const [systemStats, setSystemStats] = useState({
    uptime: '99.9%',
    responseTime: '120ms',
    activeUsers: 1247,
    totalOrders: 3456,
    revenue: 'Rp 45,678,900',
    errorRate: '0.1%'
  });

  const [recentLogs, setRecentLogs] = useState([
    { id: 1, level: 'info', message: 'User authentication successful', timestamp: new Date(), service: 'auth' },
    { id: 2, level: 'warning', message: 'High memory usage detected', timestamp: new Date(Date.now() - 300000), service: 'system' },
    { id: 3, level: 'error', message: 'Payment gateway timeout', timestamp: new Date(Date.now() - 600000), service: 'stripe' },
    { id: 4, level: 'info', message: 'Database backup completed', timestamp: new Date(Date.now() - 900000), service: 'database' }
  ]);

  const [apiEndpoints] = useState([
    { name: 'User Authentication', endpoint: '/api/auth', status: 'healthy', responseTime: '45ms' },
    { name: 'Product Catalog', endpoint: '/api/products', status: 'healthy', responseTime: '67ms' },
    { name: 'Stripe Checkout', endpoint: '/api/stripe/checkout', status: 'healthy', responseTime: '123ms' },
    { name: 'Order Management', endpoint: '/api/orders', status: 'healthy', responseTime: '89ms' },
    { name: 'User Profile', endpoint: '/api/profile', status: 'warning', responseTime: '234ms' }
  ]);

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Developer Portal</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Selamat datang, {user?.fullName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <span className="text-green-800 dark:text-green-200 text-sm font-medium">Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{systemStats.uptime}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{systemStats.responseTime}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{systemStats.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{systemStats.totalOrders.toLocaleString()}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{systemStats.revenue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Error Rate</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{systemStats.errorRate}</p>
              </div>
              <Bug className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Endpoints Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Endpoints</h2>
              <Server className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      endpoint.status === 'healthy' ? 'bg-green-500' : 
                      endpoint.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{endpoint.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{endpoint.endpoint}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                      {endpoint.status}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{endpoint.responseTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Logs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Logs</h2>
              <Monitor className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {getLogIcon(log.level)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{log.service}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {log.timestamp.toLocaleTimeString('id-ID')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Resources */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Resources</h2>
            <Cpu className="h-6 w-6 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">23%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <HardDrive className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">67%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">45%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Database Load</div>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Wifi className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">892</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Connections</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Database Console</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage database operations</p>
              </div>
            </div>
          </button>

          <button className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <GitBranch className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Deployment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deploy new versions</p>
              </div>
            </div>
          </button>

          <button className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">API Documentation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View API endpoints</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;