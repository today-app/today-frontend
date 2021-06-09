import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

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
    }

    return { ...initialProps, config }
  }

  render() {
    const { config } = this.props
    const setConfigScript = `window.__PUBLIC_CONFIG__ = ${JSON.stringify(config)}`

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <script
            dangerouslySetInnerHTML={{
              __html: setConfigScript,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
