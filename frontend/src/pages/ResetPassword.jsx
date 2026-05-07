import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function ResetPassword(){
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  async function submit(e){
    e.preventDefault()
    try{
      await api.post('/auth/reset-password', { token, id, password })
      alert('Password reset')
      navigate('/login')
    }catch(err){ alert(err.response?.data?.error || 'Failed') }
  }

  if(!token || !id) return <div className="max-w-md mx-auto bg-gray-900 p-6 rounded shadow text-white">Invalid link</div>

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded shadow">
      <h2 className="text-xl mb-4 font-semibold text-white">Reset Password</h2>
      <form onSubmit={submit}>
        <input className="w-full p-2 border border-gray-700 mb-2 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-800" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" type="password" />
        <button className="w-full bg-green-600 text-white p-2 rounded font-medium hover:bg-green-700">Set password</button>
      </form>
    </div>
  )
}
