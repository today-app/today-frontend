import { loadAccessToken } from 'features/auth/authSlice'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const OauthCallback: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    if (router.query && router.query.code) {
      if (Array.isArray(router.query.code)) {
        setCode(router.query.code.join())
      } else {
        setCode(router.query.code)
      }
    }
  }, [router])

  useEffect(() => {
    if (code) {
      dispatch(loadAccessToken(code))
    }
  }, [code])

  return <div>Loading ...</div>
}

export default OauthCallback
