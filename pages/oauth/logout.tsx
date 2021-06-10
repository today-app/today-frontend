import axios from 'axios'
import { push } from 'connected-next-router'
import { clearUserData } from 'features/auth/authSlice'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { clearProfile } from 'stores/auth'

const OauthLogout: NextPage = () => {
  const dispatch = useDispatch()
  const revokeToken = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token')
    return axios
      .post('/api/oauth/revoke', {
        token_type_hint: 'access_token',
        token: accessToken,
      })
      .then(async res => {
        console.log(res)
        if (res.status === 200) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          dispatch(clearUserData())
          dispatch(push({ pathname: '/' }))
        }
      })
  }, [])

  useEffect(() => {
    void revokeToken()
  }, [])

  return <>loading...</>
}

export default OauthLogout
