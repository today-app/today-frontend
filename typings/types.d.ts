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
}

declare interface IPublicConfig {
  oauthAuthorizationEndpoint: string
  oauthRedirectUrl: string
  oauthScope: string
  oauthClientId: string
  apiEndpoint: string
}

declare interface ServerRuntimeConfig {
  projectIniConfig: string
}
