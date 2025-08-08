import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'admin' | 'developer';
  phoneNumber?: string;
  createdAt: string;
}

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

// Demo users with role separation
const demoUsers = {
  // Customer accounts
  'customer@azkagarden.com': {
    id: 'user-1',
    email: 'customer@azkagarden.com',
    fullName: 'Pelanggan Demo',
    role: 'customer' as const,
    password: 'customer123',
    phoneNumber: '081234567890',
    createdAt: new Date().toISOString()
  },
  'user@test.com': {
    id: 'user-2',
    email: 'user@test.com',
    fullName: 'User Test',
    role: 'customer' as const,
    password: 'user123',
    phoneNumber: '081234567891',
    createdAt: new Date().toISOString()
  },
  // Admin account
  'admin@azkagarden.com': {
    id: 'admin-1',
    email: 'admin@azkagarden.com',
    fullName: 'Administrator Azka Garden',
    role: 'admin' as const,
    password: 'admin123',
    phoneNumber: '081234567892',
    createdAt: new Date().toISOString()
  },
  // Developer account
  'dev@azkagarden.com': {
    id: 'dev-1',
    email: 'dev@azkagarden.com',
    fullName: 'Developer Azka Garden',
    role: 'developer' as const,
    password: 'dev123',
    phoneNumber: '081234567893',
    createdAt: new Date().toISOString()
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = demoUsers[email as keyof typeof demoUsers];
      
      if (!user || user.password !== password) {
        throw new Error('Email atau password salah');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = user;
      
      // Store auth data
      localStorage.setItem('authToken', 'token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: userWithoutPassword });
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (demoUsers[userData.email as keyof typeof demoUsers]) {
        throw new Error('Email sudah terdaftar');
      }
      
      const newUser: User = {
        id: 'user-' + Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        role: 'customer',
        phoneNumber: userData.phoneNumber,
        createdAt: new Date().toISOString()
      };
      
      // Store auth data
      localStorage.setItem('authToken', 'token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });
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
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('adminRole'); // Clear admin role
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateProfile = async (data: any) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...data };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
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