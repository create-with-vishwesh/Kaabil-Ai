/**
 * Protected route wrapper – redirects to login if not authenticated.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../common/Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader message="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
