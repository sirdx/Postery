import { useContext } from 'react';
import AuthContext from 'src/utils/context/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}