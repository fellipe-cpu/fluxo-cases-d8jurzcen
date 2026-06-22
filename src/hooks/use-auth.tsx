import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock authentication state using localStorage for persistence across reloads
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('auth_mock') === 'true',
  )

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('auth_mock', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('auth_mock')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
