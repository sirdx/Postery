import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}