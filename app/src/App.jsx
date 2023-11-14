import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/navigation/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';
import ThemeProvider from './components/common/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='posts' element={<Posts />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>      
  );
}