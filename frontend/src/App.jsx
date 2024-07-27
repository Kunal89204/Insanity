import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Admin from './pages/admin/Admin';
import Profile from './pages/Profile';
import AddCategory from './pages/admin/AddCategory';
import { useAuthStore } from './context/store';
import ProtectedRoute from './components/ProtectedRoute';
import Category from './pages/Category'
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ViewProduct from './pages/ViewProduct';


const App = () => {
  const { validateToken, user } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/product/:productId' element={<ProtectedRoute><ViewProduct /></ProtectedRoute>} />
        <Route path='/profile/:username' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/category/:name' element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/admin/*' element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
        <Route path='/addcategory' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
