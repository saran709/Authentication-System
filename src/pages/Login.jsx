import React, { useState, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    setError('')
    try{
      console.log('Logging in with:', email)
      const { data } = await api.post('/auth/login', { email, password })
      console.log('Login successful:', data)
      setUser(data.user)
      console.log('User state updated, navigating to dashboard')
      navigate('/dashboard')
    }catch(err){
      const errorMsg = err.response?.data?.error || 'Login failed'
      console.error('Login error:', errorMsg, err)
      setError(errorMsg)
      alert(errorMsg)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <h2 className="text-2xl font-semibold text-white mb-4">Welcome back</h2>
        <p className="text-sm text-gray-300 mb-4">Sign in to continue to the dashboard.</p>
        {error && <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <Input 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            placeholder="Email"
            disabled={loading}
          />
          <Input 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="Password" 
            type="password"
            disabled={loading}
          />
          <div className="pt-2">
            <Button className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-blue-400 mb-3">🔐 Test Credentials</h3>
        <div className="bg-gray-800 p-3 rounded border border-gray-700 text-xs space-y-1">
          <div><span className="text-gray-500">Email:</span> <code className="text-white">admin@example.com</code></div>
          <div><span className="text-gray-500">Password:</span> <code className="text-white">P@ssw0rd123</code></div>
        </div>
      </Card>
    </div>
  )
}
