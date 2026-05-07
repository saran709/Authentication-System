import React, { useState } from 'react'
import api from '../services/api'

export default function ForgotPassword(){
  const [email, setEmail] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      await api.post('/auth/forgot-password', { email })
      alert('If the email exists you will receive reset instructions')
    }catch(err){ alert('Failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded shadow">
      <h2 className="text-xl mb-4 font-semibold text-white">Forgot Password</h2>
      <form onSubmit={submit}>
        <input className="w-full p-2 border border-gray-700 mb-2 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-800" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <button className="w-full bg-yellow-600 text-white p-2 rounded font-medium hover:bg-yellow-700">Send reset</button>
      </form>
    </div>
  )
}
