import { createContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/api'

export const AuthContext = createContext(null)

const tokenKey = 'jobportal_token'
const userKey = 'jobportal_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(userKey)
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) ?? '')
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem(tokenKey, token)
    } else {
      localStorage.removeItem(tokenKey)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(userKey, JSON.stringify(user))
    } else {
      localStorage.removeItem(userKey)
    }
  }, [user])

  const syncSession = (payload) => {
    setUser(payload.user)
    setToken(payload.token)
    setError('')
  }

  const register = async (payload) => {
    const response = await authApi.register(payload)
    syncSession(response)
    return response
  }

  const login = async (payload) => {
    const response = await authApi.login(payload)
    syncSession(response)
    return response
  }

  const logout = async () => {
    try {
      if (token) {
        await authApi.logout()
      }
    } finally {
      setUser(null)
      setToken('')
      setError('')
    }
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isReady,
      error,
      setError,
      register,
      login,
      logout,
    }),
    [user, token, isReady, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}