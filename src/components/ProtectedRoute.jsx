import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store current path to redirect back after successful auth
      const returnTo = window.location.pathname + window.location.search;
      window.location.href = `/api/auth/oidc/redirect/keycloak?returnTo=${encodeURIComponent(returnTo)}`;
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2C4583]/30 border-t-[#2C4583] rounded-full animate-spin"></div>
          <span className="text-slate-400 font-medium">Authenticating...</span>
        </div>
      </div>
    );
  }

  return children;
}