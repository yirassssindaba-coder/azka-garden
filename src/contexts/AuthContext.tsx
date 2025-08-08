import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { authService, AuthUser, LoginCredentials, RegisterData } from '../services/supabase/auth.service';
import { adminService } from '../services/supabase/admin.service';

interface AuthState {
  user: User | null;
  profile: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; profile: AuthUser } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_PROFILE'; payload: AuthUser };

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}

interface AuthContextType {
  user: User | null;
  profile: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  isAdmin: () => boolean;
  isDeveloper: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const profile = await authService.getUserProfile(user.id);
          if (profile) {
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user, profile }
            });
          } else {
            dispatch({ type: 'LOGOUT' });
          }
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };

    initializeAuth();

    // Listen to auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await authService.getUserProfile(session.user.id);
        if (profile) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: session.user, profile }
          });
        }
      } else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const { user, error } = await authService.signIn(credentials);
      
      if (error) {
        throw new Error(error.message);
      }

      if (user) {
        const profile = await authService.getUserProfile(user.id);
        if (profile) {
          // Log user activity
          await adminService.recordSystemMetric('user_login', 1, {
            user_id: user.id,
            email: user.email
          });

          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, profile }
          });
        } else {
          throw new Error('Profile not found');
        }
      }
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const { user, error } = await authService.signUp(userData);
      
      if (error) {
        throw new Error(error.message);
      }

      if (user) {
        const profile = await authService.getUserProfile(user.id);
        if (profile) {
          // Log user registration
          await adminService.recordSystemMetric('user_registration', 1, {
            user_id: user.id,
            email: user.email
          });

          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, profile }
          });
        }
      }
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.user) {
        await adminService.recordSystemMetric('user_logout', 1, {
          user_id: state.user.id
        });
      }

      await authService.signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!state.user) return;

    try {
      const { error } = await authService.updateProfile(state.user.id, updates);
      
      if (error) {
        throw new Error(error.message);
      }

      const updatedProfile = await authService.getUserProfile(state.user.id);
      if (updatedProfile) {
        dispatch({ type: 'UPDATE_PROFILE', payload: updatedProfile });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const isAdmin = () => {
    return state.profile?.role === 'admin';
  };

  const isDeveloper = () => {
    return state.profile?.role === 'developer';
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
        updateProfile,
        isAdmin,
        isDeveloper
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};