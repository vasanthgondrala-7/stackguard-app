import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresConfig?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresConfig = false 
}) => {
  const { isAuthenticated, hasConfigKey } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiresConfig && !hasConfigKey) {
    return <Navigate to="/configuration" replace />;
  }

  return <>{children}</>;
};
