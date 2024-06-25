import React, {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Users from './pages/adminPages/Users'
import Products from './pages/adminPages/Products'
import AddProducts from './pages/adminPages/AddProducts'
import {useAuthStore} from './context/store'
import ProtectedRoute from './components/ProtectedRoute'
import AddCategory from './pages/adminPages/AddCategory'


const App = () => {
  const { validateToken, user } = useAuthStore()

  useEffect(() => {
    validateToken();
  }, []); 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/'  element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/login'  element={!user ? <Login /> : <Navigate to="/" />}/>
        <Route path='/register'  element={!user ? <Register /> : <Navigate to="/" />}/>
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/addcategory' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path='/admin/users' element={<Users/>} />
        <Route path='/admin/products' element={<Products/>} />
        <Route path='/admin/addProducts' element={<AddProducts/>} />
      </Routes>
    </Router>
  )
}

export default App

