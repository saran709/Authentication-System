import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

export function ProtectedRoute({ children, requiredRoles = [] }){
  const { user, loading } = useContext(AuthContext)

  if(loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>
  
  if(!user) return <Navigate to="/login" replace />
  
  if(requiredRoles.length > 0){
    const hasRole = requiredRoles.some(role => user.roles?.includes(role))
    if(!hasRole) return <Navigate to="/dashboard" replace />
  }

  return children
}
