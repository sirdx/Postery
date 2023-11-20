import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function Logout() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}