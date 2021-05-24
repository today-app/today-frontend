import '../styles/globals.css'

import { AppProps } from 'next/app'
import { FC } from 'react'
import { wrapper } from 'app/store'

const TodayApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(TodayApp)
