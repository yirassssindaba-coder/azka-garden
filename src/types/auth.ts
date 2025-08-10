import { Role } from '../core/enums';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: Role;
  status: UserStatus;
  emailVerified: boolean;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  profileImage?: string;
  addresses: Address[];
  preferences: UserPreferences;
  lastLoginAt?: Date;
  password?: string; // For demo purposes only
  wishlist: string[];
  loyaltyPoints: number;
  membershipTier: MembershipTier;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  type: AddressType;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  instructions?: string;
  coordinates?: Coordinates;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  orderUpdates: boolean;
  plantCareReminders: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private';
  showOnlineStatus: boolean;
  allowDataCollection: boolean;
  allowPersonalization: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  profileImage?: string;
  preferences?: Partial<UserPreferences>;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER'
}

export enum MembershipTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}