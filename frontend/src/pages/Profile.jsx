import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import api from '../services/api'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Profile(){
  const { user, setUser } = useContext(AuthContext)
  const [name, setName] = useState(user?.name || '')

  async function save(){
    try{
      const { data } = await api.put('/users/me', { name })
      setUser(data.user)
      alert('Saved')
    }catch(e){ alert('Save failed') }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-white">Profile</h2>
        <div className="space-y-3">
          <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
          <div className="pt-2">
            <Button onClick={save} className="w-full">Save profile</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
