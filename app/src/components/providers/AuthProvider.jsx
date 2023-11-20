import {  useMemo } from 'react';
import { login, logout } from 'src/api/Auth';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useLocalStorage('userId', null);

  const handleLogin = async (nameOrEmail, password) => {
    const userId = await login(nameOrEmail, password);
    setUserId(userId);
  };

  const handleLogout = async () => {
    await logout();
    setUserId(null);
  };

  const contextValue = useMemo(
    () => ({
      userId,
      onLogin: handleLogin,
      onLogout: handleLogout
    }),
    [userId]
  );

  return ( 
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider> 
  );
}