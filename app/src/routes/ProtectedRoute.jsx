import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function ProtectedRoute() {
  const { userId } = useAuth();

  if (userId === null) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}