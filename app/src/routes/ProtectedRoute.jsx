import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function ProtectedRoute({ isAuth, target }) {
  const { userId } = useAuth();

  if (isAuth) {
    return userId != null ? <Outlet /> : <Navigate to={target} replace />;
  }

  return userId == null ? <Outlet /> : <Navigate to={target} replace />;
}