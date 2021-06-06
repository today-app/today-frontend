import { FC } from 'react'
import Header from '../../../components/Header'

const WithHeader: FC<any> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}

export default WithHeader
