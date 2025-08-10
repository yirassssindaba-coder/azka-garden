import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: null };
    case 'AUTH_FAILURE':
      return { ...state, user: null, isAuthenticated: false, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('azka_garden_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        
        // Track active session for developer dashboard
        const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
        const existingSession = activeSessions.find((s: any) => s.userId === user.id);
        if (!existingSession) {
          activeSessions.push({
            userId: user.id,
            userEmail: user.email,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString()
          });
          localStorage.setItem('active_sessions', JSON.stringify(activeSessions));
        }
      } catch (error) {
        localStorage.removeItem('azka_garden_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await authService.login({ email, password });
      
      // Save user to localStorage
      localStorage.setItem('azka_garden_user', JSON.stringify(response.user));
      
      // Track login session
      const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
      activeSessions.push({
        userId: response.user.id,
        userEmail: response.user.email,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      });
      localStorage.setItem('active_sessions', JSON.stringify(activeSessions));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login gagal' 
      });
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const user = await authService.register(userData);
      
      // Save user to localStorage
      localStorage.setItem('azka_garden_user', JSON.stringify(user));
      
      // Track registration session
      const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
      activeSessions.push({
        userId: user.id,
        userEmail: user.email,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      });
      localStorage.setItem('active_sessions', JSON.stringify(activeSessions));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registrasi gagal' 
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Remove from active sessions
      if (state.user) {
        const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
        const updatedSessions = activeSessions.filter((s: any) => s.userId !== state.user?.id);
        localStorage.setItem('active_sessions', JSON.stringify(updatedSessions));
      }
      
      localStorage.removeItem('azka_garden_user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateProfile = async (data: any) => {
    try {
      if (!state.user) throw new Error('User not found');
      
      const updatedUser = await authService.updateProfile(state.user.id, data);
      
      // Update localStorage
      localStorage.setItem('azka_garden_user', JSON.stringify(updatedUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
        updateProfile
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