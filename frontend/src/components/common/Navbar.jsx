/**
 * Reusable Navbar component.
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="text-xl font-bold text-primary-700">Career Compass</span>
          </Link>

          {/* Nav Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link to="/resume" className="text-gray-600 hover:text-primary-600 font-medium">
                Resume
              </Link>
              <Link to="/skill-gap" className="text-gray-600 hover:text-primary-600 font-medium">
                Skill Gap
              </Link>
              <Link to="/roadmap" className="text-gray-600 hover:text-primary-600 font-medium">
                Roadmap
              </Link>
              <Link to="/interview" className="text-gray-600 hover:text-primary-600 font-medium">
                Interview
              </Link>
              <Link to="/portfolio" className="text-gray-600 hover:text-primary-600 font-medium">
                Portfolio
              </Link>

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                <Link to="/profile" className="text-gray-600 hover:text-primary-600">
                  {user?.name || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
