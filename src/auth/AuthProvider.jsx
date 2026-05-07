import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load(){
      try{
        const { data } = await api.get('/users/me');
        setUser(data.user);
      }catch(e){
        console.error('Failed to load user:', e.message)
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    load();
  },[])

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
}
