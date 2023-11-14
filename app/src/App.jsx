import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
import Layout from './components/navigation/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';
import AuthLayout from './components/layouts/AuthLayout';

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(null);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='posts' element={<Posts />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Route>
  )
);