import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'CUSTOMER' | 'ADMIN' | 'DEVELOPER' | 'customer' | 'admin' | 'developer';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo = '/login'
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== requiredRole.toUpperCase()) {
    // Redirect based on user role
    switch (user?.role) {
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      case 'DEVELOPER':
        return <Navigate to="/developer/portal" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;