import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function Logout() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate('/', { replace: true });
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}