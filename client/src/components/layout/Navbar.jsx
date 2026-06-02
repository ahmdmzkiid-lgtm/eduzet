import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NotificationDropdown from '../NotificationDropdown';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-bg-primary/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gradient">Eduzet</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link to="/dashboard" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                  <Link to="/latihan" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Latihan</Link>
                  <Link to="/riwayat" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Riwayat</Link>
                  <Link to="/bookmark" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Bookmark</Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-accent-amber hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin Panel</Link>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">Hi, {user?.name.split(' ')[0]}</span>
                  <NotificationDropdown />
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-slate-300 hover:text-accent-red transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                  <Link to="/register" className="bg-accent-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
