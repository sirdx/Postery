import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setToken(''); // TODO: api/auth/authenticate
    navigate('/', { replace: true });
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}