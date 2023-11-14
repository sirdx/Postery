import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export default function AuthProvider({ children, userData }) {
  const [user, setUser] = useLocalStorage('user', userData);
  const navigate = useNavigate();

  const login = (data) => {
    setUser(data);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}