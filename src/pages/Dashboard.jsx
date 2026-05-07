import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import Card from '../components/Card'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="col-span-1">
          <div className="text-sm text-gray-300">Total users</div>
          <div className="text-2xl font-bold text-white">—</div>
        </Card>
        <Card className="col-span-1">
          <div className="text-sm text-gray-300">Active sessions</div>
          <div className="text-2xl font-bold text-white">—</div>
        </Card>
        <Card className="col-span-1">
          <div className="text-sm text-gray-300">Recent login</div>
          <div className="text-2xl font-bold text-white">{user?.email || '—'}</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-2 text-white">Welcome</h2>
        <p className="text-gray-300">Hello <strong>{user?.name || user?.email || 'Guest'}</strong> — this is your dashboard.</p>
      </Card>
    </div>
  )
}
