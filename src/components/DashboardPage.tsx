import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const handleReconfigure = () => {
    localStorage.removeItem('stackguard_config_key');
    navigate('/configuration');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <h1 className="mb-1">Hello {user?.firstName || 'user'},</h1>
        <p className="text-gray-600">How are you doing today?</p>

      
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleReconfigure}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Reconfigure Key
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
