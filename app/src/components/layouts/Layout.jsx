import './Layout.scss';
import { Outlet } from 'react-router-dom';
import AppBar from '../appbar/AppBar';
import { useAuth } from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Layout() {
  const { userId, onUserData } = useAuth();
  const [userName, setUserName] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userProfileColor, setUserProfileColor] = useState('#ffffff');

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        return;
      }

      const userData = await onUserData();
      const data = userData.data;

      if (data === null) {
        return;
      }

      setUserName(data.name);
      setUserDisplayName(data.displayName);
      setUserProfileColor(data.profileColor);
    };

    fetchData();
  }, [userId]);

  return (
    <div className='layout'>
      <AppBar 
        userId={userId} 
        userProfileColor={userProfileColor}
      />
      <Outlet />
    </div>
  );
}