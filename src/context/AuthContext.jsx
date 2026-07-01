import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('growthos_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('growthos_token')
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get('/api/auth/me')
      .then((res) => {
        setUser(res.data)
        localStorage.setItem('growthos_user', JSON.stringify(res.data))
      })
      .catch(() => {
        localStorage.removeItem('growthos_token')
        localStorage.removeItem('growthos_user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  function persist(token, userData) {
    localStorage.setItem('growthos_token', token)
    localStorage.setItem('growthos_user', JSON.stringify(userData))
    setUser(userData)
  }

  async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password })
    persist(res.data.access_token, res.data.user)
    return res.data.user
  }

  async function register(name, email, password) {
    const res = await api.post('/api/auth/register', { name, email, password })
    persist(res.data.access_token, res.data.user)
    return res.data.user
  }

  function logout() {
    localStorage.removeItem('growthos_token')
    localStorage.removeItem('growthos_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
