import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getUser } from 'src/api/User';
import { useAuth } from 'src/utils/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Layout from 'src/components/templates/Layout';
import MainLayout from 'src/components/templates/MainLayout';
import Home from 'src/pages/home/Home';
import Login from 'src/pages/login/Login';
import Logout from 'src/pages/logout/Logout';
import NewPost from 'src/pages/new-post/NewPost';
import NotFound from 'src/pages/not-found/NotFound';
import Post, { postLoader } from 'src/pages/post/Post';
import Posts from 'src/pages/posts/Posts';
import Register from 'src/pages/register/Register';
import Profile, { profileLoader } from 'src/pages/profile/Profile';
import EditPost from 'src/pages/edit-post/EditPost';

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
                  path: '/post/:slug',
                  loader: postLoader,
                  element: <Post />
                },
                {
                  path: '/profile/:id',
                  loader: profileLoader,
                  element: <Profile />
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
                },
                {
                  path: 'edit-post/:slug',
                  loader: postLoader,
                  element: <EditPost />
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