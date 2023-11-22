import {  useMemo } from 'react';
import { login, logout, register } from 'src/api/Auth';
import { getUser } from 'src/api/User';
import { AuthContext } from 'src/hooks/useAuth';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export const USER_ID_KEY = 'userId';
export const USER_NAME_KEY = 'userName';
export const USER_DISPLAY_NAME_KEY = 'userDisplayName';
export const USER_PROFILE_COLOR_KEY = 'userProfileColor';

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useLocalStorage(USER_ID_KEY, null);
  // TODO: This data should be fetched from API when needed
  //       (changes in profile color etc. won't refresh currently if user is logged in)
  const [userName, setUserName] = useLocalStorage(USER_NAME_KEY, null);
  const [userDisplayName, setUserDisplayName] = useLocalStorage(USER_DISPLAY_NAME_KEY, null);
  const [userProfileColor, setUserProfileColor] = useLocalStorage(USER_PROFILE_COLOR_KEY, null);

  const saveUserData = (data) => {
    setUserId(data.id);
    setUserName(data.name);
    setUserDisplayName(data.displayName);
    setUserProfileColor(data.profileColor);
  };

  const handleUserData = async () => {
    return await getUser(userId);
  };

  const handleLogin = async (nameOrEmail, password) => {
    const userData = await login(nameOrEmail, password);
    saveUserData(userData);
  };

  const handleLogout = async () => {
    await logout();
    setUserId(null);
    setUserName(null);
    setUserDisplayName(null);
    setUserProfileColor(null);
  };

  const handleRegister = async (
    name,
    displayName,
    email,
    password,
    profileColor
  ) => {
    const userData = await register(name, displayName, email, password, profileColor);
    saveUserData(userData);
  };

  const contextValue = useMemo(
    () => ({
      userId,
      onUserData: handleUserData,
      userName, // TODO: Remove these
      userDisplayName,
      userProfileColor,
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