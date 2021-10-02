import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
  const [token, setToken] = useState(null)

  const login = useCallback((jwtToken, user) => {
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('userData', JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userData')

  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const data = localStorage.getItem('userData')

    if (token && data) {
      login(token, data)
    }
  }, [login])

  return { login, logout, token }
}
