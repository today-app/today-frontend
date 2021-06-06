import fs from 'fs'
import getConfig from 'next/config'
import ini from 'ini'

const { serverRuntimeConfig }: { serverRuntimeConfig: ServerRuntimeConfig } = getConfig()

const configFile = serverRuntimeConfig.projectIniConfig

let config: { [k: string]: string | null } = {
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

// TODO sentry
if (!fs.existsSync(configFile)) console.log('Config file not found')

config = ini.parse(fs.readFileSync(configFile, 'utf-8'))

export default {
  baseUrl: config.base_url,
  oauthRedirectUrl: config.oauth_redirect_url,
  oauthAuthorizationEndpoint: config.oauth_authorization_endpoint,
  oauthTokenEndpoint: config.oauth_token_endpoint,
  oauthTokenRevocationEndpoint: config.oauth_token_revocation_endpoint,
  apiEndpoint: config.api_endpoint,
  oauthClientId: config.oauth_client_id,
  oauthClientSecret: config.oauth_client_secret,
  oauthScope: config.oauth_scope,
  bitmovinPlayerKey: config.bitmovin_player_key,
  bitmovinAnalyticsKey: config.bitmovin_analytics_key,
  gaAppId: config.ga_app_id,
} as IConfig
