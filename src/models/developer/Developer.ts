import { DevRole, DevStatus } from '../../core/enums';
import { IDevEntity } from '../../core/interfaces/IDevEntity';

export class Developer implements IDevEntity {
  id: string;
  developerId: string;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;

  // Additional developer properties
  username: string;
  email: string;
  fullName: string;
  role: DevRole;
  status: DevStatus;
  skills: string[];
  projects: string[];
  lastCommit?: Date;
  githubUsername?: string;
  slackId?: string;
  department: string;
  teamLead?: string;

  constructor() {
    this.id = '';
    this.developerId = '';
    this.accessLevel = 1;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.username = '';
    this.email = '';
    this.fullName = '';
    this.role = DevRole.JUNIOR_DEVELOPER;
    this.status = DevStatus.ACTIVE;
    this.skills = [];
    this.projects = [];
    this.department = '';
  }
}