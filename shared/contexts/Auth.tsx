import { AppState } from 'app/store'
import qs from 'qs'
import { createContext, FC, useMemo, useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'

interface AuthContextState {
  isSigned: boolean
  signInUrl: string
  data: any
}

const AuthContext = createContext<AuthContextState>({
  isSigned: false,
  signInUrl: '',
  data: null,
})

interface AppProviderProps {
  children: any
  config: any
}

export const useAuth = () => useContext(AuthContext)

const AuthProvider: FC<AppProviderProps> = ({ children, config }) => {
  const { data } = useSelector((state: AppState) => state.auth)
  const signInUrl = '/oauth/login'

  return (
    <AuthContext.Provider value={{ isSigned: !!data, signInUrl, data }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
