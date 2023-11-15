import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export default function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  );

  return ( 
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider> 
  );
}