import { AdminRole, AdminStatus } from '../core/enums';
import { IAdminEntity } from '../core/interfaces/IAdminEntity';

export interface Admin extends IAdminEntity {
  username: string;
  email: string;
  fullName: string;
  role: AdminRole;
  status: AdminStatus;
  permissions: string[];
  lastLoginAt: Date;
  passwordHash: string;
  twoFactorEnabled: boolean;
  profileImage?: string;
  department: string;
  phoneNumber: string;
  emergencyContact: string;
}

export interface AdminLog extends IAdminEntity {
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  createdAt: Date;
}

export interface Banner extends IAdminEntity {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  position: BannerPosition;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  clickCount: number;
  impressionCount: number;
  targetAudience?: string[];
}

export interface Promotion extends IAdminEntity {
  code: string;
  name: string;
  description: string;
  type: PromotionType;
  discountValue: number;
  minimumOrderValue?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

export interface Newsletter extends IAdminEntity {
  subject: string;
  content: string;
  htmlContent: string;
  recipientCount: number;
  sentCount: number;
  openCount: number;
  clickCount: number;
  status: NewsletterStatus;
  scheduledAt?: Date;
  sentAt?: Date;
}

export interface CustomerSupport extends IAdminEntity {
  ticketId: string;
  customerId: string;
  subject: string;
  description: string;
  status: SupportStatus;
  priority: SupportPriority;
  assignedTo?: string;
  category: SupportCategory;
  tags: string[];
  attachments: string[];
  responseTime?: number;
  resolutionTime?: number;
  satisfactionRating?: number;
}

export interface FAQ extends IAdminEntity {
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  viewCount: number;
  helpfulCount: number;
}

export interface Feedback extends IAdminEntity {
  customerId: string;
  type: FeedbackType;
  subject: string;
  message: string;
  rating: number;
  status: FeedbackStatus;
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
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

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  data: Record<string, any>;
  generatedBy: string;
  generatedAt: Date;
  parameters: Record<string, any>;
}

export interface Chart {
  id: string;
  type: ChartType;
  title: string;
  data: ChartData[];
  options: ChartOptions;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface ChartOptions {
  responsive: boolean;
  legend: boolean;
  animation: boolean;
  colors: string[];
}

export enum BannerPosition {
  HERO = 'HERO',
  SIDEBAR = 'SIDEBAR',
  FOOTER = 'FOOTER',
  POPUP = 'POPUP'
}

export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  BUY_ONE_GET_ONE = 'BUY_ONE_GET_ONE'
}

export enum NewsletterStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  SENDING = 'SENDING',
  SENT = 'SENT',
  FAILED = 'FAILED'
}

export enum SupportStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_CUSTOMER = 'WAITING_CUSTOMER',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum SupportPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum SupportCategory {
  TECHNICAL = 'TECHNICAL',
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
  PRODUCT = 'PRODUCT',
  GENERAL = 'GENERAL'
}

export enum FeedbackType {
  COMPLAINT = 'COMPLAINT',
  SUGGESTION = 'SUGGESTION',
  COMPLIMENT = 'COMPLIMENT',
  BUG_REPORT = 'BUG_REPORT'
}

export enum FeedbackStatus {
  NEW = 'NEW',
  REVIEWED = 'REVIEWED',
  RESPONDED = 'RESPONDED',
  CLOSED = 'CLOSED'
}

export enum ReportType {
  SALES = 'SALES',
  CUSTOMERS = 'CUSTOMERS',
  PRODUCTS = 'PRODUCTS',
  INVENTORY = 'INVENTORY',
  MARKETING = 'MARKETING'
}

export enum ChartType {
  LINE = 'LINE',
  BAR = 'BAR',
  PIE = 'PIE',
  DOUGHNUT = 'DOUGHNUT',
  AREA = 'AREA'
}