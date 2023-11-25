import ProtectedRoute from './ProtectedRoute';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Logout from 'src/pages/Logout';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import Layout from 'src/components/layouts/Layout';
import MainLayout from 'src/components/layouts/MainLayout';
import Posts from 'src/pages/Posts';
import NewPost from 'src/pages/NewPost';
import Register from 'src/pages/Register';
import Post from 'src/pages/Post';
import NotFound from 'src/pages/NotFound';
import { getUser } from 'src/api/User';
import { useAuth } from 'src/hooks/useAuth';

export default function Routes() {
  const { userId } = useAuth();

  const router = createBrowserRouter([
    {
      id: 'root',
      loader: () => getUser(userId),
      children: [
        {
          element: <Layout />,
          children: [
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
                },
                {
                  path: '/post/:id',
                  element: <Post />
                }
              ]
            },
            {
              path: '/',
              element: <ProtectedRoute isAuth target='/login' />,
              children: [
                {
                  path: 'logout',
                  element: <Logout />
                },
                {
                  path: 'new-post/:content?',
                  element: <NewPost />
                }
              ]
            }
          ]
        },
        {
          element: <ProtectedRoute target='/' />,
          children: [
            {
              path: '/login',
              element: <Login />
            },
            {
              path: '/register',
              element: <Register />
            },
          ]
        },
        {
          element: <Layout />,
          children: [
            {
              path: '*',
              element: <NotFound />
            }
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}