
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // Redirect users who are not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users with the wrong role
  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Allow access to the protected page
  return <Outlet />;
}
