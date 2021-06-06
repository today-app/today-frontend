declare interface IConfig {
  baseUrl: string
  oauthRedirectUrl: string
  oauthAuthorizationEndpoint: string
  oauthTokenEndpoint: string
  oauthTokenRevocationEndpoint: string
  apiEndpoint: string
  oauthClientId: string
  oauthClientSecret: string
  oauthScope: string
  bitmovinPlayerKey: string
  bitmovinAnalyticsKey: string
  gaAppId: string
}

declare interface IPublicConfig {
  oauthAuthorizationEndpoint: string
  oauthRedirectUrl: string
  oauthScope: string
  oauthClientId: string
  apiEndpoint: string
  gaAppId: string
  bitmovinPlayerKey: string
  bitmovinAnalyticsKey: string
}
