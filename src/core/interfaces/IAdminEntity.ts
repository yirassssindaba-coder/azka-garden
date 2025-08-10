import { IEntity } from './IEntity';
import { AdminRole, AdminStatus } from '../enums';

export interface IAdminEntity extends IEntity {
  adminId: string;
  permissions: string[];
  role: AdminRole;
  status: AdminStatus;
  lastLoginAt: Date;
  createdBy: string;
  updatedBy: string;
}