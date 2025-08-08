import { IUserService } from './interfaces/IUserService';
import { User, LoginRequest, RegisterRequest, AuthResponse, UpdateProfileRequest, ChangePasswordRequest } from '../types/auth';
import { AuthenticationException, ValidationException } from '../exceptions';
import { Role, AdminRole, DevRole } from '../core/enums';

export class AuthService implements IUserService {
  private users: User[] = [
    // Demo admin user
    {
      id: 'admin-001',
      email: 'admin@azkagarden.com',
      username: 'admin',
      fullName: 'Admin Azka Garden',
      role: 'ADMIN' as any,
      status: 'ACTIVE' as any,
      emailVerified: true,
      phoneNumber: '+62812345678',
      addresses: [],
      preferences: {
        language: 'id',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: false,
          orderUpdates: true,
          plantCareReminders: true
        },
        privacy: {
          profileVisibility: 'private',
          showOnlineStatus: false,
          allowDataCollection: true,
          allowPersonalization: true
        }
      },
      wishlist: [],
      loyaltyPoints: 1000,
      membershipTier: 'GOLD' as any,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
      password: 'Admin123!'
    },
    // Demo developer user
    {
      id: 'dev-001',
      email: 'dev@azkagarden.com',
      username: 'developer',
      fullName: 'Developer Azka Garden',
      role: 'DEVELOPER' as any,
      status: 'ACTIVE' as any,
      emailVerified: true,
      phoneNumber: '+62812345679',
      addresses: [],
      preferences: {
        language: 'id',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: false,
          orderUpdates: true,
          plantCareReminders: true
        },
        privacy: {
          profileVisibility: 'private',
          showOnlineStatus: false,
          allowDataCollection: true,
          allowPersonalization: true
        }
      },
      wishlist: [],
      loyaltyPoints: 500,
      membershipTier: 'SILVER' as any,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
      password: 'Dev123!'
    },
    // Demo customer user
    {
      id: 'customer-001',
      email: 'customer@azkagarden.com',
      username: 'customer',
      fullName: 'Customer Azka Garden',
      role: 'CUSTOMER' as any,
      status: 'ACTIVE' as any,
      emailVerified: true,
      phoneNumber: '+62812345680',
      addresses: [],
      preferences: {
        language: 'id',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: true,
          orderUpdates: true,
          plantCareReminders: true
        },
        privacy: {
          profileVisibility: 'private',
          showOnlineStatus: false,
          allowDataCollection: true,
          allowPersonalization: true
        }
      },
      wishlist: [],
      loyaltyPoints: 100,
      membershipTier: 'BRONZE' as any,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
      password: 'customer123'
    }
  ];
  private tokens: Map<string, { userId: string; expiresAt: Date }> = new Map();

  async register(userData: RegisterRequest): Promise<User> {
    // Validate input
    if (!userData.email || !userData.password || !userData.fullName) {
      throw new ValidationException('Required fields missing', 'email');
    }

    if (userData.password !== userData.confirmPassword) {
      throw new ValidationException('Passwords do not match', 'confirmPassword');
    }

    // Check if user already exists
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new ValidationException('Email already exists', 'email');
    }

    const existingUsername = await this.getUserByUsername(userData.username);
    if (existingUsername) {
      throw new ValidationException('Username already exists', 'username');
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email: userData.email,
      username: userData.username,
      fullName: userData.fullName,
      role: 'CUSTOMER' as any,
      status: 'ACTIVE' as any,
      emailVerified: false,
      phoneNumber: userData.phoneNumber,
      addresses: [],
      preferences: {
        language: 'id',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: userData.subscribeNewsletter || false,
          orderUpdates: true,
          plantCareReminders: true
        },
        privacy: {
          profileVisibility: 'private',
          showOnlineStatus: false,
          allowDataCollection: userData.acceptTerms,
          allowPersonalization: true
        }
      },
      wishlist: [],
      loyaltyPoints: 0,
      membershipTier: 'BRONZE' as any,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);
    
    // Save all users to localStorage for admin dashboard
    localStorage.setItem('all_users', JSON.stringify(this.users));
    
    return newUser;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const user = this.users.find(u => u.email === credentials.email);
    if (!user) {
      throw new AuthenticationException('Invalid email or password');
    }

    // Check password
    if (user.password !== credentials.password) {
      throw new AuthenticationException('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken();
    const refreshToken = this.generateToken();
    const expiresIn = 3600; // 1 hour

    // Store token
    this.tokens.set(token, {
      userId: user.id,
      expiresAt: new Date(Date.now() + expiresIn * 1000)
    });

    // Update last login
    user.lastLoginAt = new Date();
    user.updatedAt = new Date();

    return {
      user,
      token,
      refreshToken,
      expiresIn
    };
  }

  async logout(token: string): Promise<void> {
    this.tokens.delete(token);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    // In a real implementation, you would validate the refresh token
    throw new Error('Not implemented');
  }

  async updateProfile(userId: string, data: UpdateProfileRequest): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user data
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  }

  async changePassword(userId: string, passwords: ChangePasswordRequest): Promise<void> {
    if (passwords.newPassword !== passwords.confirmPassword) {
      throw new ValidationException('Passwords do not match', 'confirmPassword');
    }

    // In a real implementation, you would verify the current password
    // and hash the new password
  }

  async verifyEmail(token: string): Promise<void> {
    // Implementation for email verification
  }

  async resetPassword(email: string): Promise<void> {
    // Implementation for password reset
  }

  async confirmResetPassword(token: string, newPassword: string): Promise<void> {
    // Implementation for confirming password reset
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }

  async updateLastLogin(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (user) {
      user.lastLoginAt = new Date();
      user.updatedAt = new Date();
    }
  }

  async deactivateUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (user) {
      user.status = 'INACTIVE' as any;
      user.updatedAt = new Date();
    }
  }

  async activateUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (user) {
      user.status = 'ACTIVE' as any;
      user.updatedAt = new Date();
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private generateToken(): string {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }

  // Method to validate token
  async validateToken(token: string): Promise<User | null> {
    const tokenData = this.tokens.get(token);
    if (!tokenData || tokenData.expiresAt < new Date()) {
      return null;
    }

    return await this.getUserById(tokenData.userId);
  }
}

// Export singleton instance
export const authService = new AuthService();