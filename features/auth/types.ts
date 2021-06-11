export interface IAuthState {
  isLoading: boolean
  data: any
  error: string | null
}

export interface ILoadAccessTokenPayload {
  code: string
}

export interface ITokenResponse {
  access_token: string
  expires_in: number
  id_token: string
  refresh_token: string
  scope: string
  token_type: string
}