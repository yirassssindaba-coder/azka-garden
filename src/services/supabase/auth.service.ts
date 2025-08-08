import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone: string | null;
  role: 'customer' | 'admin' | 'developer';
  avatar_url: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  username: string;
  phone?: string;
}

class AuthService {
  async signUp(userData: RegisterData): Promise<{ user: User | null; error: any }> {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name,
          username: userData.username,
          phone: userData.phone || null,
          role: 'customer'
        }
      }
    });

    if (error) return { user: null, error };

    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: userData.email,
          full_name: userData.full_name,
          username: userData.username,
          phone: userData.phone || null,
          role: 'customer'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return { user: data.user, error: null };
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    return { user: data.user, error };
  }

  async signOut(): Promise<{ error: any }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getUserProfile(userId: string): Promise<AuthUser | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    return { error };
  }

  async resetPassword(email: string): Promise<{ error: any }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    return { error };
  }

  // Admin authentication
  async signInAdmin(credentials: LoginCredentials): Promise<{ user: User | null; profile: AuthUser | null; error: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (error) return { user: null, profile: null, error };

    // Check if user has admin/developer role
    const profile = await this.getUserProfile(data.user.id);
    
    if (!profile || !['admin', 'developer'].includes(profile.role)) {
      await this.signOut();
      return { 
        user: null, 
        profile: null, 
        error: { message: 'Unauthorized: Admin access required' }
      };
    }

    return { user: data.user, profile, error: null };
  }

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();