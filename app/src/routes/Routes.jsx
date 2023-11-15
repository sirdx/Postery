import { useAuth } from 'src/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Logout from 'src/pages/Logout';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';

export default function Routes() {
  const { token } = useAuth(); 

  const routesForPublic = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/posts',
      element: <></>
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'logout',
          element: <Logout />
        }
      ]
    }
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/login',
      element: <Login />
    }
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  return <RouterProvider router={router} />;
}