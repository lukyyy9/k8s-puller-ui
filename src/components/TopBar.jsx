import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function TopBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="fixed top-4 left-4 right-4 z-50 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-between px-6 py-4 shadow-lg">
      <div className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
            <img src="/mt.png" alt="Logo" className="w-8 mr-2" />
        k8s-puller UI
      </div>
      
      {isAuthenticated && (
        <button
          onClick={logout}
          className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors border border-rose-500/30 hover:border-rose-400/50 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-lg"
        >
          Log out
        </button>
      )}
    </div>
  );
}
