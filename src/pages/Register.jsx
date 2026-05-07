import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      await api.post('/auth/register', { email, password })
      alert('Registered, check email to verify')
      navigate('/login')
    }catch(err){
      alert(err.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-white">Create account</h2>
        <p className="text-sm text-gray-300 mb-4">Start your secure session with a free account.</p>
        <form onSubmit={submit} className="space-y-3">
          <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <Input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <div className="pt-2">
            <Button className="w-full bg-green-600 hover:bg-green-700">Create account</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
