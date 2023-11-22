import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function Logout() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    await onLogout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <p>Logging out...</p>
    </>
  );
}