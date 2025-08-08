import { User, LoginRequest, RegisterRequest, AuthResponse, UpdateProfileRequest, ChangePasswordRequest } from '../../types/auth';

export interface IUserService {
  register(userData: RegisterRequest): Promise<User>;
  login(credentials: LoginRequest): Promise<AuthResponse>;
  logout(token: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  updateProfile(userId: string, data: UpdateProfileRequest): Promise<User>;
  changePassword(userId: string, passwords: ChangePasswordRequest): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  confirmResetPassword(token: string, newPassword: string): Promise<void>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  updateLastLogin(userId: string): Promise<void>;
  deactivateUser(userId: string): Promise<void>;
  activateUser(userId: string): Promise<void>;
}