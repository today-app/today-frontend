import '../styles/globals.css'

import { FC } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

import store from '../app/store'

const TodayApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default TodayApp
