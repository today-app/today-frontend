import { wrapper } from 'app/store'
import { AppProps } from 'next/app'
import '../styles/globals.css'

export interface IAppProps extends AppProps {}

const TodayApp = ({ Component, pageProps }: IAppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(TodayApp)
