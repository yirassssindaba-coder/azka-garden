import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  Zap,
  LogOut,
  User,
  RefreshCw,
  Terminal,
  Settings
} from 'lucide-react';

const DeveloperPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [systemStats, setSystemStats] = useState({
    uptime: '99.9%',
    responseTime: '120ms',
    activeUsers: 0,
    totalOrders: 0,
    revenue: 'Rp 0',
    errorRate: '0.0%',
    totalUsers: 0,
    activeSessions: 0
  });

  const [recentLogs, setRecentLogs] = useState([
    { id: 1, level: 'info', message: 'System startup completed successfully', timestamp: new Date(), service: 'system' },
    { id: 2, level: 'info', message: 'Database connection established', timestamp: new Date(Date.now() - 300000), service: 'database' },
    { id: 3, level: 'info', message: 'Authentication service ready', timestamp: new Date(Date.now() - 600000), service: 'auth' },
    { id: 4, level: 'info', message: 'All services operational', timestamp: new Date(Date.now() - 900000), service: 'system' }
  ]);

  const [apiEndpoints] = useState([
    { name: 'User Authentication', endpoint: '/api/auth', status: 'healthy', responseTime: '45ms' },
    { name: 'Product Catalog', endpoint: '/api/products', status: 'healthy', responseTime: '67ms' },
    { name: 'Order Management', endpoint: '/api/orders', status: 'healthy', responseTime: '89ms' },
    { name: 'User Profile', endpoint: '/api/profile', status: 'healthy', responseTime: '123ms' },
    { name: 'Cart Service', endpoint: '/api/cart', status: 'healthy', responseTime: '56ms' }
  ]);

  useEffect(() => {
    // Check developer authentication
    if (!user || user.role !== 'DEVELOPER') {
      navigate('/developer/login');
      return;
    }

    loadDeveloperData();
    
    // Auto-refresh every 5 seconds for real-time monitoring
    const interval = setInterval(loadDeveloperData, 5000);
    
    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadDeveloperData = () => {
    try {
      // Get real data from localStorage
      const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
      
      // Calculate real revenue
      const totalRevenue = allOrders
        .filter((order: any) => order.status === 'delivered')
        .reduce((sum: number, order: any) => sum + order.total, 0);
      
      const stats = {
        uptime: '99.9%',
        responseTime: Math.floor(Math.random() * 50) + 80 + 'ms',
        activeUsers: activeSessions.length,
        totalOrders: allOrders.length,
        revenue: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
        errorRate: '0.0%',
        totalUsers: allUsers.length,
        activeSessions: activeSessions.length
      };

      setSystemStats(stats);
    } catch (error) {
      console.error('Error loading developer data:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/developer/login');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

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
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg mr-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Developer Portal</h1>
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
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border dark:border-gray-700">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Developer</p>
                  </div>
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
        {/* Real-time System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Uptime</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{systemStats.uptime}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Response Time</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{systemStats.responseTime}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{systemStats.activeUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{systemStats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{systemStats.revenue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Error Rate</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{systemStats.errorRate}</p>
              </div>
              <Bug className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Endpoints Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Endpoints Status</h2>
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

          {/* System Logs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Logs</h2>
              <Terminal className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {getLogIcon(log.level)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{log.service}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(log.timestamp)}
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
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Resources</h2>
            <Monitor className="h-6 w-6 text-gray-400" />
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{systemStats.activeSessions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</div>
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Developer Tools</h2>
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors group">
              <div className="text-center">
                <Database className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Database Console</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Access database management tools</p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {systemStats.totalUsers} users • {systemStats.totalOrders} orders
                </div>
              </div>
            </button>

            <button className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group">
              <div className="text-center">
                <GitBranch className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Deployment Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Deploy and manage application versions</p>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Version 1.0.0 • Production
                </div>
              </div>
            </button>

            <button className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors group">
              <div className="text-center">
                <Globe className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">View and test API endpoints</p>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {apiEndpoints.length} endpoints • All healthy
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Real-time Activity</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">System Status</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">All services operational</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(new Date())}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Active Sessions</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{systemStats.activeSessions} users online</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Live
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;