import { DevRole } from '../../core/enums';
import { IDevEntity } from '../../core/interfaces/IDevEntity';

export class SystemHealth implements IDevEntity {
  id: string;
  developerId: string;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;

  // System health metrics
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;
  networkLatency: number;
  uptime: number;
  activeConnections: number;
  errorRate: number;
  responseTime: number;

  constructor() {
    this.id = '';
    this.developerId = '';
    this.accessLevel = 3;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.cpuUsage = 0;
    this.memoryUsage = 0;
    this.diskSpace = 0;
    this.networkLatency = 0;
    this.uptime = 0;
    this.activeConnections = 0;
    this.errorRate = 0;
    this.responseTime = 0;
  }

  getHealthStatus(): 'healthy' | 'warning' | 'critical' {
    if (this.cpuUsage > 90 || this.memoryUsage > 90 || this.errorRate > 5) {
      return 'critical';
    } else if (this.cpuUsage > 70 || this.memoryUsage > 70 || this.errorRate > 2) {
      return 'warning';
    }
    return 'healthy';
  }

  getMetrics() {
    return {
      cpu: this.cpuUsage,
      memory: this.memoryUsage,
      disk: this.diskSpace,
      network: this.networkLatency,
      uptime: this.uptime,
      connections: this.activeConnections,
      errors: this.errorRate,
      response: this.responseTime
    };
  }
}