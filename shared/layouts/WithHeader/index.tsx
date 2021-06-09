import { FC } from 'react'
import { useAuth } from 'shared/contexts/Auth'
import Header from '../../../components/Header'

const WithHeader: FC<any> = ({ children }) => {
  const { isSigned, signInUrl, data } = useAuth()

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div>
          <pre>{JSON.stringify({ isSigned, signInUrl, data }, null, 2)}</pre>
          <div>
            <a href={signInUrl}>{signInUrl}</a>
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}

export default WithHeader
