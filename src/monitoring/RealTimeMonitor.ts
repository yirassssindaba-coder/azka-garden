export interface MonitoringData {
  timestamp: Date;
  type: 'order' | 'payment' | 'user' | 'admin' | 'system' | 'security';
  data: any;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface AdminMetrics {
  activeOrders: number;
  pendingPayments: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  customerSatisfaction: number;
  refundRate: number;
}

export interface DeveloperMetrics {
  activeUsers: number;
  activeAdmins: number;
  systemLoad: number;
  errorRate: number;
  responseTime: number;
  databaseConnections: number;
  cacheHitRate: number;
  securityThreats: number;
}

export class RealTimeMonitor {
  private static instance: RealTimeMonitor;
  private subscribers: Map<string, (data: MonitoringData) => void> = new Map();
  private monitoringData: MonitoringData[] = [];
  private isMonitoring: boolean = false;

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): RealTimeMonitor {
    if (!RealTimeMonitor.instance) {
      RealTimeMonitor.instance = new RealTimeMonitor();
    }
    return RealTimeMonitor.instance;
  }

  // Subscription Management
  subscribe(id: string, callback: (data: MonitoringData) => void): void {
    this.subscribers.set(id, callback);
  }

  unsubscribe(id: string): void {
    this.subscribers.delete(id);
  }

  // Real-time Data Broadcasting
  private broadcast(data: MonitoringData): void {
    this.monitoringData.push(data);
    
    // Keep only last 1000 entries
    if (this.monitoringData.length > 1000) {
      this.monitoringData = this.monitoringData.slice(-1000);
    }

    // Notify all subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in monitoring callback:', error);
      }
    });
  }

  // Admin Real-time Monitoring
  trackOrder(orderId: string, status: string, amount: number): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'order',
      data: {
        orderId,
        status,
        amount,
        action: 'status_change'
      },
      severity: 'info'
    });
  }

  trackPayment(paymentId: string, orderId: string, amount: number, status: string): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'payment',
      data: {
        paymentId,
        orderId,
        amount,
        status,
        action: 'payment_update'
      },
      severity: status === 'failed' ? 'error' : 'info'
    });
  }

  trackRevenue(amount: number, source: string): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'order',
      data: {
        amount,
        source,
        action: 'revenue_update'
      },
      severity: 'info'
    });
  }

  // Developer Real-time Monitoring
  trackUser(userId: string, action: string, metadata?: any): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'user',
      data: {
        userId,
        action,
        metadata,
        ipAddress: this.getClientIP()
      },
      severity: 'info'
    });
  }

  trackAdmin(adminId: string, action: string, resource?: string): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'admin',
      data: {
        adminId,
        action,
        resource,
        ipAddress: this.getClientIP()
      },
      severity: 'warning'
    });
  }

  trackSystemError(error: Error, component: string): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'system',
      data: {
        error: error.message,
        stack: error.stack,
        component,
        userAgent: navigator.userAgent
      },
      severity: 'error'
    });
  }

  trackSecurityThreat(threatType: string, details: any): void {
    this.broadcast({
      timestamp: new Date(),
      type: 'security',
      data: {
        threatType,
        details,
        ipAddress: this.getClientIP(),
        userAgent: navigator.userAgent
      },
      severity: 'critical'
    });
  }

  // Metrics Generation
  getAdminMetrics(): AdminMetrics {
    const orderData = this.monitoringData.filter(d => d.type === 'order');
    const paymentData = this.monitoringData.filter(d => d.type === 'payment');
    
    return {
      activeOrders: orderData.filter(d => d.data.status === 'processing').length,
      pendingPayments: paymentData.filter(d => d.data.status === 'pending').length,
      completedOrders: orderData.filter(d => d.data.status === 'completed').length,
      totalRevenue: orderData.reduce((sum, d) => sum + (d.data.amount || 0), 0),
      averageOrderValue: 85000,
      conversionRate: 3.2,
      customerSatisfaction: 4.8,
      refundRate: 1.2
    };
  }

  getDeveloperMetrics(): DeveloperMetrics {
    const userData = this.monitoringData.filter(d => d.type === 'user');
    const adminData = this.monitoringData.filter(d => d.type === 'admin');
    const systemData = this.monitoringData.filter(d => d.type === 'system');
    const securityData = this.monitoringData.filter(d => d.type === 'security');
    
    return {
      activeUsers: new Set(userData.map(d => d.data.userId)).size,
      activeAdmins: new Set(adminData.map(d => d.data.adminId)).size,
      systemLoad: Math.random() * 30 + 40, // Simulated
      errorRate: systemData.filter(d => d.severity === 'error').length,
      responseTime: Math.random() * 100 + 120,
      databaseConnections: Math.floor(Math.random() * 50) + 100,
      cacheHitRate: Math.random() * 20 + 80,
      securityThreats: securityData.filter(d => d.severity === 'critical').length
    };
  }

  // Real-time Data Streams
  getOrderStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'order')
      .slice(-20)
      .reverse();
  }

  getPaymentStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'payment')
      .slice(-20)
      .reverse();
  }

  getUserActivityStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'user')
      .slice(-50)
      .reverse();
  }

  getAdminActivityStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'admin')
      .slice(-30)
      .reverse();
  }

  getSystemErrorStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'system' && d.severity === 'error')
      .slice(-20)
      .reverse();
  }

  getSecurityThreatStream(): MonitoringData[] {
    return this.monitoringData
      .filter(d => d.type === 'security')
      .slice(-10)
      .reverse();
  }

  // Monitoring Controls
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    // Simulate real-time data
    setInterval(() => {
      this.generateMockData();
    }, 2000);

    // Performance monitoring
    setInterval(() => {
      this.monitorPerformance();
    }, 5000);
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
  }

  clearMonitoringData(): void {
    this.monitoringData = [];
  }

  // Private Methods
  private generateMockData(): void {
    // Simulate random events for demo
    const eventTypes = ['order', 'payment', 'user', 'admin'];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    switch (randomType) {
      case 'order':
        this.trackOrder(
          'ORD-' + Date.now(),
          ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
          Math.floor(Math.random() * 500000) + 50000
        );
        break;
      case 'payment':
        this.trackPayment(
          'PAY-' + Date.now(),
          'ORD-' + Date.now(),
          Math.floor(Math.random() * 500000) + 50000,
          ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)]
        );
        break;
      case 'user':
        this.trackUser(
          'user-' + Math.floor(Math.random() * 1000),
          ['login', 'logout', 'view_product', 'add_to_cart'][Math.floor(Math.random() * 4)]
        );
        break;
      case 'admin':
        this.trackAdmin(
          'admin-' + Math.floor(Math.random() * 10),
          ['view_dashboard', 'update_product', 'process_order'][Math.floor(Math.random() * 3)]
        );
        break;
    }
  }

  private monitorPerformance(): void {
    // Monitor page performance
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        if (loadTime > 3000) { // More than 3 seconds
          this.broadcast({
            timestamp: new Date(),
            type: 'system',
            data: {
              type: 'SLOW_PAGE_LOAD',
              loadTime,
              url: window.location.href
            },
            severity: 'warning'
          });
        }
      }
    }
  }

  private getClientIP(): string {
    // In production, get from server headers
    return '192.168.1.' + Math.floor(Math.random() * 255);
  }
}

export const realTimeMonitor = RealTimeMonitor.getInstance();