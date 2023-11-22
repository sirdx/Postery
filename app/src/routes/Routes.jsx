import { useAuth } from 'src/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Logout from 'src/pages/Logout';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import MainLayout from 'src/components/layouts/MainLayout';
import Posts from 'src/pages/Posts';
import NewPost from 'src/pages/NewPost';
import Register from 'src/pages/Register';

export default function Routes() {
  const { userId } = useAuth(); 

  const routesForPublic = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/posts',
          element: <Posts />
        }
      ]
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
        },
        {
          path: 'new-post',
          element: <NewPost />
        }
      ]
    }
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(userId === null ? routesForNotAuthenticatedOnly : []), // FIXME: Works only after the 2nd refresh
    ...routesForAuthenticatedOnly
  ]);

  return <RouterProvider router={router} />;
}