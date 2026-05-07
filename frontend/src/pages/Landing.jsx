import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Landing(){
  return (
    <div className="space-y-12">
      <section className="bg-gray-900 rounded-lg p-12 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-white">Secure Authentication for your App</h1>
          <p className="text-gray-300 mb-6">A production-ready authentication & user management system with JWT, OAuth, RBAC, and admin tools — built with React, Node, and MongoDB.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/register"><Button className="px-6 py-3">Get Started — Free</Button></Link>
            <Link to="/login"><Button className="bg-white text-blue-600 hover:bg-gray-100 border border-blue-200">Sign In</Button></Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold mb-2 text-white">JWT + Refresh Tokens</h3>
          <p className="text-sm text-gray-300">Short-lived access tokens and secure refresh token rotation to keep sessions safe.</p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-white">OAuth Providers</h3>
          <p className="text-sm text-gray-300">Google and GitHub sign-in with account linking and profile images.</p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2 text-white">Admin & RBAC</h3>
          <p className="text-sm text-gray-300">Role-based access control, user management, and activity logs for enterprise needs.</p>
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="text-xl font-semibold mb-3 text-white">Why choose this stack?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Secure by default (Helmet, rate-limiting, bcrypt)</li>
            <li>Scalable architecture and Docker-ready</li>
            <li>Production-ready flows: email verification, password reset, OAuth</li>
          </ul>
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="text-xl font-semibold mb-3 text-white">🔐 Test Credentials</h2>
          <p className="text-gray-300 mb-4 text-sm">Use these to test the authentication system:</p>
          <div className="bg-gray-800 p-4 rounded border border-gray-700 space-y-2">
            <div>
              <span className="text-gray-400 text-sm">Email:</span>
              <p className="text-white font-mono text-lg">admin@example.com</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Password:</span>
              <p className="text-white font-mono text-lg">P@ssw0rd123</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Or <Link to="/register" className="text-blue-400 hover:text-blue-300">create a new account</Link> to test the registration flow.</p>
        </Card>
      </section>
    </div>
  )
}
