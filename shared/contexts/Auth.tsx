import { AppState } from 'app/store'
import qs from 'qs'
import { createContext, FC, useMemo, useContext } from 'react'
import { useSelector } from 'react-redux'

interface AuthContextState {
  isSigned: boolean
  signInUrl: string
  profile: any
}

const AuthContext = createContext<AuthContextState>({
  isSigned: false,
  signInUrl: '',
  profile: null,
})

interface AppProviderProps {
  children: any
  config: any
}

export const useAuth = () => useContext(AuthContext)

const AuthProvider: FC<AppProviderProps> = ({ children, config }) => {
  const { profile } = useSelector((state: AppState) => state.auth)

  const signInUrl = useMemo(() => {
    if (!config) return 'this is a error'

    const params = qs.stringify({
      response_type: 'code',
      client_id: config.oauthClientId,
      redirect_uri: config.oauthRedirectUrl,
      scope: config.oauthScope,
      nonce: `${new Date()}`,
    })

    return `${config.oauthAuthorizationEndpoint}?${params}`
  }, [config])

  return (
    <AuthContext.Provider value={{ isSigned: !!profile, signInUrl, profile }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
