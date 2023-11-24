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

export default function Routes() {
  const router = createBrowserRouter([
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
          element: <ProtectedRoute />,
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
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
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
  ]);

  return <RouterProvider router={router} />;
}