import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Button } from './ui/button';
import React from 'react';

import { useState, useRef } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#1A73E8]" />
            <span className="text-xl font-bold text-[#1A73E8]">SecureLife</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
              Home
            </Link>

            <Link to="/about" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
              About
            </Link>

            <Link to="/policies" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
              Policies
            </Link>
            
            {user && (
              <Link to="/my-policies" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
                My Policies
              </Link>
            )}

            {user && (
              <Link to="/claims" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
                Claims
              </Link>
            )}

            {user && (
              <Link to="/dashboard" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
                Dashboard
              </Link>
            )}
            
             <Link to="/support" className="text-foreground hover:text-[#1A73E8] transition-colors font-medium">
              Support
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="relative">
                      <User className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </span>
                  </Button>
                </div>
                {/* User Dropdown - click to open, closes on outside click */}
                <div className="relative" ref={dropdownRef}>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowDropdown(v => !v)} aria-haspopup="true" aria-expanded={showDropdown}>
                    <User className="w-5 h-5" />
                  </Button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                          {user?.role}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => { setShowDropdown(false); handleLogout(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-[#1A73E8] border border-[#1A73E8] rounded-lg hover:bg-[#1A73E8]/10 transition">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-[#1A73E8] rounded-lg hover:bg-[#1A73E8]/90 transition">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
