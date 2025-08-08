import { AdminRole, AdminStatus } from '../../core/enums';
import { IAdminEntity } from '../../core/interfaces/IAdminEntity';

export class Admin implements IAdminEntity {
  id: string;
  adminId: string;
  permissions: string[];
  role: AdminRole;
  status: AdminStatus;
  lastLoginAt: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;

  // Additional admin properties
  username: string;
  email: string;
  fullName: string;
  passwordHash: string;
  twoFactorEnabled: boolean;
  profileImage?: string;
  department: string;
  phoneNumber: string;
  emergencyContact: string;

  constructor() {
    this.id = '';
    this.adminId = '';
    this.permissions = [];
    this.role = AdminRole.CUSTOMER_SERVICE;
    this.status = AdminStatus.PENDING;
    this.lastLoginAt = new Date();
    this.createdBy = '';
    this.updatedBy = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.username = '';
    this.email = '';
    this.fullName = '';
    this.passwordHash = '';
    this.twoFactorEnabled = false;
    this.department = '';
    this.phoneNumber = '';
    this.emergencyContact = '';
  }
}