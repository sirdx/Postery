import { useMemo } from 'react';
import { login, logout, register } from 'src/api/Auth';
import { getUser } from 'src/api/User';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export const USER_ID_KEY = 'userId';

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY, null);

  const handleUserData = async () => {
    return await getUser(userId);
  };

  const handleLogin = async (nameOrEmail, password) => {
    const response = await login(nameOrEmail, password);

    if (response.id === undefined) {
      return response;
    }

    setUserId(response.id);
    return null;
  };

  const handleLogout = async () => {
    await logout();
    setUserId(null);
  };

  const handleRegister = async (
    name,
    displayName,
    email,
    password,
    profileColor
  ) => {
    const response = await register(name, displayName, email, password, profileColor);

    if (response.id === undefined) {
      return response;
    }

    setUserId(response.id);
    return null;
  };

  const contextValue = useMemo(
    () => ({
      userId,
      onUserData: handleUserData,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onRegister: handleRegister
    }),
    [userId]
  );

  return ( 
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider> 
  );
}