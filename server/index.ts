// const express = require('express')
import express from 'express'
import fs from 'fs'
import ini from 'ini'
import next from 'next'
import qs from 'qs'

const port: number = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/oauth/login', (_req: any, res: any) => {
    const configFile = `${__dirname}/../config.ini`
    if (!fs.existsSync(configFile)) console.log('Config file not found')

    let bareConfig: { [k: string]: string | null } = {
      base_url: null,
      oauth_redirect_url: null,
      oauth_authorization_endpoint: null,
      oauth_token_endpoint: null,
      oauth_token_revocation_endpoint: null,
      api_endpoint: null,
      oauth_client_id: null,
      oauth_client_secret: null,
      oauth_scope: null,
    }

    bareConfig = ini.parse(fs.readFileSync(configFile, 'utf-8'))

    const config = {
      baseUrl: bareConfig.base_url,
      oauthRedirectUrl: bareConfig.oauth_redirect_url,
      oauthAuthorizationEndpoint: bareConfig.oauth_authorization_endpoint,
      oauthTokenEndpoint: bareConfig.oauth_token_endpoint,
      oauthTokenRevocationEndpoint: bareConfig.oauth_token_revocation_endpoint,
      apiEndpoint: bareConfig.api_endpoint,
      oauthClientId: bareConfig.oauth_client_id,
      oauthClientSecret: bareConfig.oauth_client_secret,
      oauthScope: bareConfig.oauth_scope,
    }

    const params = qs.stringify({
      response_type: 'code',
      client_id: config.oauthClientId,
      redirect_uri: config.oauthRedirectUrl,
      scope: config.oauthScope,
      nonce: `${new Date()}`,
    })

    const signInUrl = `${config.oauthAuthorizationEndpoint}?${params}`

    res.redirect(302, signInUrl)
  })

  server.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  server
    .listen(port, () => console.log(`> Ready on http://localhost:${port}`))
    .on('error', err => console.log(err))
})
