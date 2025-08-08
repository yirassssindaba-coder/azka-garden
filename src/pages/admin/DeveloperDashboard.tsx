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
  GitBranch,
  Terminal,
  LogOut,
  RefreshCw,
  Download,
  Settings,
  Bell,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

interface SystemMetrics {
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeConnections: number;
  errorRate: number;
  responseTime: number;
}

interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info';
  message: string;
  component: string;
  userId?: string;
  stack?: string;
}

interface APIEndpoint {
  path: string;
  method: string;
  status: 'healthy' | 'warning' | 'error';
  responseTime: number;
  errorRate: number;
  lastChecked: Date;
}

const DeveloperDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check developer authentication
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('adminRole');
    if (!token || role !== 'developer') {
      navigate('/admin/login');
      return;
    }

    loadDeveloperData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDeveloperData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDeveloperData = async () => {
    try {
      // Simulate loading developer metrics
      const mockMetrics: SystemMetrics = {
        uptime: 99.9,
        cpuUsage: Math.floor(Math.random() * 30) + 20,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
        diskUsage: Math.floor(Math.random() * 10) + 75,
        networkLatency: Math.floor(Math.random() * 50) + 100,
        activeConnections: Math.floor(Math.random() * 50) + 150,
        errorRate: Math.random() * 2,
        responseTime: Math.floor(Math.random() * 100) + 120
      };

      const mockErrorLogs: ErrorLog[] = [
        {
          id: '1',
          timestamp: new Date(),
          level: 'error',
          message: 'Database connection timeout',
          component: 'ProductService',
          userId: 'user123',
          stack: 'Error: Connection timeout at ProductService.getProducts()'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 300000),
          level: 'warning',
          message: 'High memory usage detected',
          component: 'ImageProcessor',
          stack: 'Warning: Memory usage above 80%'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 600000),
          level: 'info',
          message: 'Cache cleared successfully',
          component: 'CacheService'
        }
      ];

      const mockAPIEndpoints: APIEndpoint[] = [
        {
          path: '/api/products',
          method: 'GET',
          status: 'healthy',
          responseTime: 120,
          errorRate: 0.1,
          lastChecked: new Date()
        },
        {
          path: '/api/orders',
          method: 'POST',
          status: 'warning',
          responseTime: 350,
          errorRate: 2.1,
          lastChecked: new Date()
        },
        {
          path: '/api/payments',
          method: 'POST',
          status: 'healthy',
          responseTime: 200,
          errorRate: 0.5,
          lastChecked: new Date()
        },
        {
          path: '/api/users',
          method: 'GET',
          status: 'error',
          responseTime: 1200,
          errorRate: 5.2,
          lastChecked: new Date()
        }
      ];

      setMetrics(mockMetrics);
      setErrorLogs(mockErrorLogs);
      setApiEndpoints(mockAPIEndpoints);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricColor = (value: number, threshold: { warning: number; critical: number }) => {
    if (value >= threshold.critical) return 'text-red-600';
    if (value >= threshold.warning) return 'text-yellow-600';
    return 'text-green-600';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-lg mr-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Developer Dashboard</h1>
                <p className="text-sm text-gray-600">System Monitoring & Debugging</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {errorLogs.filter(log => log.level === 'error').length}
                </span>
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
        {/* System Status Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">System Status</h2>
              <button 
                onClick={loadDeveloperData}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{metrics?.uptime}%</div>
                <div className="text-gray-300 text-sm">Uptime</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className={`text-2xl font-bold ${getMetricColor(metrics?.errorRate || 0, { warning: 1, critical: 3 })}`}>
                  {metrics?.errorRate.toFixed(1)}%
                </div>
                <div className="text-gray-300 text-sm">Error Rate</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{metrics?.activeConnections}</div>
                <div className="text-gray-300 text-sm">Active Connections</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{metrics?.responseTime}ms</div>
                <div className="text-gray-300 text-sm">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <span className={`text-2xl font-bold ${getMetricColor(metrics.cpuUsage, { warning: 70, critical: 90 })}`}>
                  {metrics.cpuUsage}%
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">CPU Usage</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metrics.cpuUsage >= 90 ? 'bg-red-500' : 
                    metrics.cpuUsage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metrics.cpuUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <span className={`text-2xl font-bold ${getMetricColor(metrics.memoryUsage, { warning: 80, critical: 95 })}`}>
                  {metrics.memoryUsage}%
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Memory Usage</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metrics.memoryUsage >= 95 ? 'bg-red-500' : 
                    metrics.memoryUsage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metrics.memoryUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <span className={`text-2xl font-bold ${getMetricColor(metrics.diskUsage, { warning: 85, critical: 95 })}`}>
                  {metrics.diskUsage}%
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Disk Usage</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metrics.diskUsage >= 95 ? 'bg-red-500' : 
                    metrics.diskUsage >= 85 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metrics.diskUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{metrics.networkLatency}ms</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Network Latency</div>
              <div className={`text-xs ${
                metrics.networkLatency > 500 ? 'text-red-600' : 
                metrics.networkLatency > 200 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {metrics.networkLatency > 500 ? 'High' : 
                 metrics.networkLatency > 200 ? 'Medium' : 'Low'}
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">API Endpoints</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Test All
              </button>
            </div>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      endpoint.status === 'healthy' ? 'bg-green-500' :
                      endpoint.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded mr-2">{endpoint.method}</span>
                        {endpoint.path}
                      </div>
                      <div className="text-sm text-gray-600">
                        {endpoint.responseTime}ms • {endpoint.errorRate}% errors
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                    {endpoint.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Error Logs</h2>
              <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {errorLogs.map((log) => (
                <div key={log.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {log.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{log.message}</div>
                  <div className="text-xs text-gray-600">Component: {log.component}</div>
                  {log.userId && (
                    <div className="text-xs text-gray-600">User: {log.userId}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer Tools */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Developer Tools</h2>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Terminal className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 text-center group">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-blue-800">Database Console</div>
              <div className="text-xs text-blue-600 mt-1">Query & Monitor</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl transition-all duration-300 text-center group">
              <Bug className="h-8 w-8 text-red-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-red-800">Error Tracking</div>
              <div className="text-xs text-red-600 mt-1">{errorLogs.filter(log => log.level === 'error').length} errors</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 text-center group">
              <Server className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-green-800">Server Monitor</div>
              <div className="text-xs text-green-600 mt-1">Real-time metrics</div>
            </button>
            
            <button className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 text-center group">
              <GitBranch className="h-8 w-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold text-purple-800">Deployment</div>
              <div className="text-xs text-purple-600 mt-1">CI/CD Pipeline</div>
            </button>
          </div>
        </div>

        {/* Quick Fix Tools */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Fix Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Clear Cache</h3>
                <p className="text-sm text-gray-600 mb-4">Clear application cache to resolve performance issues</p>
                <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Clear Cache
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Database className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Restart Services</h3>
                <p className="text-sm text-gray-600 mb-4">Restart backend services to fix connection issues</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Restart Services
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Bug className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Debug Mode</h3>
                <p className="text-sm text-gray-600 mb-4">Enable debug mode for detailed error tracking</p>
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