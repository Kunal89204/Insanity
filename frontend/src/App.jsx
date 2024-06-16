import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Users from './pages/adminPages/Users'
import Products from './pages/adminPages/Products'



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/users' element={<Users/>} />
        <Route path='/admin/products' element={<Products/>} />
      </Routes>
    </Router>
  )
}

export default App

