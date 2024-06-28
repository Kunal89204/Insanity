import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/store'

const AdminProtectedRoute = ({children}) => {
    const { user } = useAuthStore()
    
    if (!user && !user.role == "admin") {
        // If no user or accessToken is found, redirect to login
        return <Navigate to="/login" />
    } else if (user.role == undefined || user.role == "customer"){
        return <Navigate to="/login" />
    }

    return children
}

export default AdminProtectedRoute
