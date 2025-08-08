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
  Clock,
  Users,
  UserCheck,
  ShoppingCart,
  Eye,
  Package
} from 'lucide-react';
import { realTimeMonitor, DeveloperMetrics, MonitoringData } from '../../monitoring/RealTimeMonitor';
import { securityManager } from '../../security/SecurityManager';

const DeveloperDashboard: React.FC = () => {
  const [devMetrics, setDevMetrics] = useState<DeveloperMetrics | null>(null);
  const [userActivity, setUserActivity] = useState<MonitoringData[]>([]);
  const [adminActivity, setAdminActivity] = useState<MonitoringData[]>([]);
  const [systemErrors, setSystemErrors] = useState<MonitoringData[]>([]);
  const [securityThreats, setSecurityThreats] = useState<MonitoringData[]>([]);
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

    // Subscribe to real-time updates
    realTimeMonitor.subscribe('dev-dashboard', handleRealTimeUpdate);
    
    // Load initial data
    loadDeveloperData();
    
    // Auto-refresh every 3 seconds for real-time monitoring
    const interval = setInterval(loadDeveloperData, 3000);
    
    return () => {
      realTimeMonitor.unsubscribe('dev-dashboard');
      clearInterval(interval);
    };
  }, []);

  const handleRealTimeUpdate = (data: MonitoringData) => {
    // Update streams based on data type
    if (data.type === 'user') {
      setUserActivity(prev => [data, ...prev.slice(0, 49)]);
    } else if (data.type === 'admin') {
      setAdminActivity(prev => [data, ...prev.slice(0, 29)]);
    } else if (data.type === 'system' && data.severity === 'error') {
      setSystemErrors(prev => [data, ...prev.slice(0, 19)]);
    } else if (data.type === 'security') {
      setSecurityThreats(prev => [data, ...prev.slice(0, 9)]);
    }
    
    // Refresh metrics
    setDevMetrics(realTimeMonitor.getDeveloperMetrics());
  };

  const loadDeveloperData = () => {
    try {
      const metrics = realTimeMonitor.getDeveloperMetrics();
      const users = realTimeMonitor.getUserActivityStream();
      const admins = realTimeMonitor.getAdminActivityStream();
      const errors = realTimeMonitor.getSystemErrorStream();
      const threats = realTimeMonitor.getSecurityThreatStream();

      setDevMetrics(metrics);
      setUserActivity(users);
      setAdminActivity(admins);
      setSystemErrors(errors);
      setSecurityThreats(threats);
    } catch (error) {
      console.error('Error loading developer data:', error);
      realTimeMonitor.trackSystemError(error as Error, 'DeveloperDashboard');
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
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAdminActionIcon = (action: string) => {
    switch (action) {
      case 'view_dashboard': return <Monitor className="h-4 w-4 text-gray-600" />;
      case 'update_product': return <Package className="h-4 w-4 text-green-600" />;
      case 'process_order': return <ShoppingCart className="h-4 w-4 text-green-600" />;
      default: return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-black bg-gray-200';
      case 'error': return 'text-gray-800 bg-gray-100';
      case 'warning': return 'text-gray-600 bg-gray-50';
      default: return 'text-green-600 bg-green-100';
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
                <p className="text-sm text-gray-600">Real-time System Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 text-sm font-medium">Live Monitoring</span>
              </div>
              <button className="relative p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {systemErrors.length}
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
        {/* Real-time System Status */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Real-time System Status</h2>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 animate-pulse text-green-400" />
                <span className="text-sm">Live Monitoring</span>
              </div>
            </div>
            {devMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{devMetrics.activeUsers}</div>
                  <div className="text-gray-300 text-sm">Active Users</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">{devMetrics.activeAdmins}</div>
                  <div className="text-gray-300 text-sm">Active Admins</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-300">{devMetrics.systemLoad.toFixed(1)}%</div>
                  <div className="text-gray-300 text-sm">System Load</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{devMetrics.responseTime}ms</div>
                  <div className="text-gray-300 text-sm">Response Time</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Activity Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Stream */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Live User Activity</h2>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 text-sm">Real-time</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getActivityIcon(activity.data.action)}
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        User {activity.data.userId.slice(-4)} - {activity.data.action}
                      </div>
                      <div className="text-xs text-gray-600">{formatTime(activity.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.data.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Activity Stream */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-6 w-6 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Live Admin Activity</h2>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <span className="text-gray-800 text-sm">Monitoring</span>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {adminActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getAdminActionIcon(activity.data.action)}
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        Admin {activity.data.adminId.slice(-4)} - {activity.data.action}
                      </div>
                      <div className="text-xs text-gray-600">{formatTime(activity.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.data.resource || 'dashboard'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* System Errors */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Bug className="h-6 w-6 text-black" />
                <h2 className="text-xl font-bold text-gray-900">System Errors</h2>
              </div>
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                {systemErrors.length} errors
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {systemErrors.map((error, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                      {error.severity.toUpperCase()}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(error.timestamp)}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{error.data.error}</div>
                  <div className="text-xs text-gray-600">Component: {error.data.component}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Threats */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Security Monitoring</h2>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {securityThreats.length} threats
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {securityThreats.map((threat, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(threat.timestamp)}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{threat.data.threatType}</div>
                  <div className="text-xs text-gray-600">IP: {threat.data.ipAddress}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Metrics */}
        {devMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{devMetrics.databaseConnections}</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">DB Connections</div>
              <div className="text-xs text-green-600">Healthy</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{devMetrics.cacheHitRate.toFixed(1)}%</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Cache Hit Rate</div>
              <div className="text-xs text-green-600">Optimal</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{devMetrics.errorRate}</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Error Count</div>
              <div className="text-xs text-gray-600">Last hour</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-black p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{devMetrics.securityThreats}</span>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">Security Threats</div>
              <div className="text-xs text-green-600">Blocked</div>
            </div>
          </div>
        )}

        {/* Developer Tools */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Developer Tools & Quick Fixes</h2>
            <button 
              onClick={loadDeveloperData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Clear System Cache</h3>
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
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Restart Services
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
              <div className="text-center">
                <Bug className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">Enable Debug Mode</h3>
                <p className="text-sm text-gray-600 mb-4">Enable detailed error tracking and logging</p>
                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
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