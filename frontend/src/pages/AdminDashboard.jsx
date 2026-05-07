import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../auth/AuthProvider'

export default function AdminDashboard(){
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadStats()
    loadUsers()
  }, [])

  async function loadStats(){
    try{
      const { data } = await api.get('/admin/stats')
      setStats(data)
    }catch(e){ console.error(e) }
  }

  async function loadUsers(){
    try{
      setLoading(true)
      const { data } = await api.get('/admin/users')
      setUsers(data.users)
    }catch(e){ console.error(e) }
    finally{ setLoading(false) }
  }

  async function updateRole(userId, newRoles){
    try{
      await api.put(`/admin/users/${userId}/roles`, { roles: newRoles })
      loadUsers()
    }catch(e){ alert('Failed') }
  }

  if(!user?.roles?.includes('Super Admin') && !user?.roles?.includes('Admin')){
    return <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">Access denied</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl mb-6 font-bold text-white">Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-900 p-4 rounded border border-blue-800">
          <div className="text-sm text-gray-300">Total Users</div>
          <div className="text-2xl font-bold text-white">{stats.totalUsers || 0}</div>
        </div>
        <div className="bg-green-900 p-4 rounded border border-green-800">
          <div className="text-sm text-gray-300">Active Sessions (24h)</div>
          <div className="text-2xl font-bold text-white">{stats.activeSessions || 0}</div>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded shadow mb-6">
        <h2 className="text-lg mb-4 font-semibold text-white">Users</h2>
        {loading ? <p className="text-gray-300">Loading...</p> : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 p-2 text-left text-white">Email</th>
                <th className="border border-gray-700 p-2 text-left text-white">Name</th>
                <th className="border border-gray-700 p-2 text-left text-white">Roles</th>
                <th className="border border-gray-700 p-2 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-800">
                  <td className="border border-gray-700 p-2 text-white">{u.email}</td>
                  <td className="border border-gray-700 p-2 text-white">{u.name || '-'}</td>
                  <td className="border border-gray-700 p-2 text-white">{u.roles?.join(', ') || 'User'}</td>
                  <td className="border border-gray-700 p-2">
                    <select 
                      defaultValue={u.roles?.[0] || 'User'}
                      onChange={e => updateRole(u._id, [e.target.value])}
                      className="p-1 border border-gray-600 rounded text-sm text-white bg-gray-700"
                    >
                      <option>User</option>
                      <option>Moderator</option>
                      <option>Admin</option>
                      <option>Super Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
