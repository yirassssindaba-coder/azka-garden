import { IAdminEntity } from '../../core/interfaces/IAdminEntity';
import { AdminRole } from '../../core/enums';

export interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  activeUsers: number;
  pendingOrders: number;
  lowStockProducts: number;
  conversionRate: number;
  averageOrderValue: number;
  customerSatisfaction: number;
}

export interface Statistics {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  activeUsers: number;
  pendingOrders: number;
  lowStockProducts: number;
  conversionRate: number;
  averageOrderValue: number;
  customerSatisfaction: number;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  userId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;
  activeConnections: number;
  responseTime: number;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
}

export class Dashboard implements IAdminEntity {
  id: string;
  adminId: string;
  permissions: string[];
  role: AdminRole;
  status: any;
  lastLoginAt: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.adminId = '';
    this.permissions = [];
    this.role = AdminRole.ANALYTICS_VIEWER;
    this.status = 'ACTIVE';
    this.lastLoginAt = new Date();
    this.createdBy = '';
    this.updatedBy = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  generateDashboard(): DashboardData {
    return {
      totalUsers: 1250,
      totalOrders: 3420,
      totalRevenue: 125000000,
      totalProducts: 450,
      activeUsers: 89,
      pendingOrders: 23,
      lowStockProducts: 12,
      conversionRate: 3.2,
      averageOrderValue: 85000,
      customerSatisfaction: 4.6
    };
  }

  getStatistics(dateRange: { start: Date; end: Date }): Statistics {
    return this.generateDashboard();
  }

  getKPIs(): KPI[] {
    return [
      {
        id: '1',
        name: 'Revenue Growth',
        value: 15.2,
        target: 20,
        unit: '%',
        trend: 'up',
        changePercentage: 5.3
      },
      {
        id: '2',
        name: 'Customer Acquisition',
        value: 234,
        target: 300,
        unit: 'users',
        trend: 'up',
        changePercentage: 12.5
      }
    ];
  }

  getRecentActivities(): Activity[] {
    return [
      {
        id: '1',
        type: 'order',
        description: 'New order #ORD-2024-001 received',
        userId: 'user123',
        timestamp: new Date(),
        metadata: { orderId: 'ORD-2024-001', amount: 150000 }
      }
    ];
  }

  getSystemHealth(): SystemHealth {
    return {
      status: 'healthy',
      uptime: 99.9,
      cpuUsage: 45,
      memoryUsage: 62,
      diskSpace: 78,
      activeConnections: 156,
      responseTime: 120
    };
  }

  getAlerts(): Alert[] {
    return [
      {
        id: '1',
        type: 'warning',
        title: 'Low Stock Alert',
        message: '12 products are running low on stock',
        timestamp: new Date(),
        isRead: false,
        actionRequired: true
      }
    ];
  }
}