import { wrapper } from 'app/store'
import { ConnectedRouter } from 'connected-next-router'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import React from 'react'
import AuthProvider from '../shared/contexts/Auth'
import '../styles/globals.css'

export interface IAppProps extends AppProps {
  config: IPublicConfig | null
}

const TodayApp = ({ Component, pageProps, config }: IAppProps): JSX.Element => {
  return (
    <AuthProvider config={config as IConfig}>
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </AuthProvider>
  )
}

TodayApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  let config = null

  if (typeof window === 'undefined') {
    const allConfig: IConfig = require('../utils/config').default
    config = {
      oauthAuthorizationEndpoint: allConfig.oauthAuthorizationEndpoint,
      oauthClientId: allConfig.oauthClientId,
      oauthScope: allConfig.oauthScope,
      apiEndpoint: allConfig.apiEndpoint,
      oauthRedirectUrl: allConfig.oauthRedirectUrl,
    }
  } else {
    // @ts-ignore
    config = { ...window.__PUBLIC_CONFIG__ }
  }

  return { ...appProps, config }
}

export default wrapper.withRedux(TodayApp)
