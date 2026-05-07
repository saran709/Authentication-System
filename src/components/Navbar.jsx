import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg text-white">AuthUI</Link>
        <nav className="space-x-4">
          <Link to="/login" className="text-white hover:underline">Login</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
          <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
