import { FC } from 'react'
import { useAuth } from 'shared/contexts/Auth'
import Header from '../../../components/Header'

const WithHeader: FC<any> = ({ children }) => {
  const { isSigned, signInUrl } = useAuth()

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header isSigned={isSigned} signInUrl={signInUrl} />
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}

export default WithHeader
