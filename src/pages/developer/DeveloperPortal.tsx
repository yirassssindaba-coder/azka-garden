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
  Settings,
  FileText,
  Shield,
  Search,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Reply,
  Send
} from 'lucide-react';

const DeveloperPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monitoring');
  const [reviews, setReviews] = useState<any[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const [systemStats, setSystemStats] = useState({
    uptime: '99.9%',
    responseTime: '120ms',
    activeUsers: 0,
    totalOrders: 0,
    revenue: 'Rp 0',
    errorRate: '0.0%',
    totalUsers: 0,
    activeSessions: 0,
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    networkLatency: 12
  });

  const [recentLogs, setRecentLogs] = useState([
    { id: 1, level: 'info', message: 'System startup completed successfully', timestamp: new Date(), service: 'system' },
    { id: 2, level: 'info', message: 'Database connection established', timestamp: new Date(Date.now() - 300000), service: 'database' },
    { id: 3, level: 'info', message: 'Authentication service ready', timestamp: new Date(Date.now() - 600000), service: 'auth' },
    { id: 4, level: 'info', message: 'All services operational', timestamp: new Date(Date.now() - 900000), service: 'system' }
  ]);

  const [apiEndpoints] = useState([
    { name: 'User Authentication', endpoint: '/api/auth', status: 'healthy', responseTime: '45ms', uptime: '99.9%' },
    { name: 'Product Catalog', endpoint: '/api/products', status: 'healthy', responseTime: '67ms', uptime: '99.8%' },
    { name: 'Order Management', endpoint: '/api/orders', status: 'healthy', responseTime: '89ms', uptime: '99.7%' },
    { name: 'User Profile', endpoint: '/api/profile', status: 'healthy', responseTime: '123ms', uptime: '99.9%' },
    { name: 'Cart Service', endpoint: '/api/cart', status: 'healthy', responseTime: '56ms', uptime: '100%' },
    { name: 'Payment Gateway', endpoint: '/api/payments', status: 'healthy', responseTime: '234ms', uptime: '99.5%' }
  ]);

  const [securityLogs] = useState([
    { id: 1, type: 'LOGIN_SUCCESS', user: 'admin@azkagarden.com', ip: '192.168.1.100', timestamp: new Date(), severity: 'info' },
    { id: 2, type: 'FAILED_LOGIN_ATTEMPT', user: 'unknown@test.com', ip: '192.168.1.200', timestamp: new Date(Date.now() - 600000), severity: 'warning' },
    { id: 3, type: 'SESSION_CREATED', user: 'customer@azkagarden.com', ip: '192.168.1.150', timestamp: new Date(Date.now() - 1200000), severity: 'info' }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'DEVELOPER') {
      navigate('/developer/login');
      return;
    }

    loadDeveloperData();
    
    const interval = setInterval(loadDeveloperData, 5000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadDeveloperData = () => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
      const reviewsData = JSON.parse(localStorage.getItem('global-reviews') || '[]');
      
      setReviews(reviewsData);
      
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
        activeSessions: activeSessions.length,
        cpuUsage: Math.floor(Math.random() * 20) + 20,
        memoryUsage: Math.floor(Math.random() * 30) + 50,
        diskUsage: Math.floor(Math.random() * 20) + 40,
        networkLatency: Math.floor(Math.random() * 20) + 10
      };

      setSystemStats(stats);
    } catch (error) {
      console.error('Error loading developer data:', error);
    }
  };

  const handleReplyToReview = async (reviewId: string) => {
    if (!user || !replyComment.trim()) return;

    const newReply = {
      id: 'reply-' + Date.now(),
      userId: user.id,
      userName: user.fullName || user.email,
      userRole: 'developer',
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'info': return 'text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default: return 'text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-green-500">
      {/* Developer Header */}
      <div className="bg-green-600 shadow-2xl">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-30 p-3 rounded-xl mr-4 backdrop-blur-sm">
                <Code className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Portal Pengembang - Azka Garden</h1>
                <p className="text-green-100 font-medium">System Development & Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white bg-opacity-30 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold">Live Monitoring</span>
              </div>
              <button 
                onClick={loadDeveloperData}
                className="p-2 text-white hover:text-green-200 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-white hover:text-green-200 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                    <p className="text-xs text-green-600 font-bold">Pengembang</p>
                  </div>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                  >
                    Kembali ke Website
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
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

      {/* Developer Navigation Tabs */}
      <div className="bg-green-500 overflow-x-auto shadow-xl">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 lg:space-x-4 min-w-max">
            {[
              { id: 'monitoring', label: 'System Monitoring', icon: Monitor },
              { id: 'api', label: 'API Management', icon: Globe },
              { id: 'database', label: 'Database Console', icon: Database },
              { id: 'customer-service', label: 'Customer Service', icon: MessageSquare },
              { id: 'reviews', label: 'Ulasan Teknis', icon: Bug },
              { id: 'testing', label: 'Testing & QA', icon: Bug },
              { id: 'deployment', label: 'Deployment', icon: GitBranch },
              { id: 'security', label: 'Security Audit', icon: Shield },
              { id: 'logs', label: 'System Logs', icon: Terminal },
              { id: 'documentation', label: 'Documentation', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 lg:space-x-2 py-4 px-3 lg:px-4 border-b-2 font-bold text-xs lg:text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-white text-white bg-white bg-opacity-30 rounded-t-lg'
                    : 'border-transparent text-green-100 hover:text-white hover:border-green-200'
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
        {/* System Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-8">
            {/* Real-time System Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">Uptime</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.uptime}</p>
                  </div>
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Response Time</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.responseTime}</p>
                  </div>
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</p>
                  </div>
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">CPU Usage</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.cpuUsage}%</p>
                  </div>
                  <Cpu className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Memory</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.memoryUsage}%</p>
                  </div>
                  <HardDrive className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Error Rate</p>
                    <p className="text-2xl font-bold text-green-600">{systemStats.errorRate}</p>
                  </div>
                  <Bug className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* System Health Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Health Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Cpu className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{systemStats.cpuUsage}%</div>
                  <div className="text-sm text-gray-600">CPU Usage</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemStats.cpuUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <HardDrive className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{systemStats.memoryUsage}%</div>
                  <div className="text-sm text-gray-600">Memory Usage</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemStats.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{systemStats.diskUsage}%</div>
                  <div className="text-sm text-gray-600">Disk Usage</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemStats.diskUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Wifi className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{systemStats.networkLatency}ms</div>
                  <div className="text-sm text-gray-600">Network Latency</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(systemStats.networkLatency * 2, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ulasan Teknis & Bug Reports</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total: {reviews.filter(r => r.comment.toLowerCase().includes('bug') || r.comment.toLowerCase().includes('error') || r.comment.toLowerCase().includes('teknis')).length} laporan teknis
              </div>
            </div>

            <div className="space-y-6">
              {reviews.filter(review => 
                review.comment.toLowerCase().includes('bug') || 
                review.comment.toLowerCase().includes('error') || 
                review.comment.toLowerCase().includes('teknis') ||
                review.comment.toLowerCase().includes('sistem')
              ).map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">{review.userName}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(review.userRole)}`}>
                            {getRoleLabel(review.userRole)}
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs font-medium">
                            TEKNIS
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
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
                      Priority: HIGH • {review.replies?.length || 0} balasan
                    </span>
                    
                    <button
                      onClick={() => setReplyTo(replyTo === review.id ? null : review.id)}
                      className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Balas sebagai Developer</span>
                    </button>
                  </div>

                  {/* Developer Reply Form */}
                  {replyTo === review.id && (
                    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <textarea
                            rows={3}
                            value={replyComment}
                            onChange={(e) => setReplyComment(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-green-200 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-400 text-sm transition-all duration-200"
                            placeholder="Tulis balasan teknis sebagai Developer..."
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
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">
                                {reply.userName.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.userName}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(reply.userRole)}`}>
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
              
              {reviews.filter(r => r.comment.toLowerCase().includes('bug') || r.comment.toLowerCase().includes('error') || r.comment.toLowerCase().includes('teknis')).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Bug className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Tidak ada laporan teknis</p>
                  <p className="text-sm">Semua sistem berjalan normal</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* API Management Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2 inline" />
                Add Endpoint
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Endpoint
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Response Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Uptime
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {apiEndpoints.map((endpoint, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{endpoint.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{endpoint.endpoint}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                            {endpoint.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {endpoint.responseTime}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {endpoint.uptime}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                              <Play className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                              <Settings className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                              <RotateCcw className="h-4 w-4" />
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

        {/* Database Console Tab */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Database Console</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <Database className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Query Console</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Execute database queries and view results</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Open Console
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Backup Manager</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Create and restore database backups</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Manage Backups
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Monitor query performance and optimization</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    View Metrics
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Audit Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Audit</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security Events</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        log.severity === 'info' ? 'bg-green-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{log.type}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{log.user} from {log.ip}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatTime(log.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Logs</h2>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                  <RefreshCw className="h-4 w-4 mr-2 inline" />
                  Refresh
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
                  Clear Logs
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
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
        )}

        {/* Other tabs placeholder */}
        {['testing', 'deployment', 'documentation'].includes(activeTab) && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
            <div className="text-gray-400 mb-4">
              <Code className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {activeTab === 'testing' && 'Testing & QA Tools'}
              {activeTab === 'deployment' && 'Deployment Management'}
              {activeTab === 'documentation' && 'Technical Documentation'}
            </h3>
            <p className="text-gray-600">
              Advanced developer tools are being implemented and will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperPortal;