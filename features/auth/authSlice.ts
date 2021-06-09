import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isLoading: boolean
  data: any
  error: string | null
}

export interface LoadAccessTokenPayload {
  code: string
}

const initialState: AuthState = {
  isLoading: false,
  data: null,
  error: null,
}

const reducers = {
  loadAccessToken: (state: AuthState, _payload: any) => {
    state.isLoading = true
  },
  loadAccessTokenSuccess: (state: AuthState, { payload: tokenData }: PayloadAction<any>) => {
    state.isLoading = false
    state.data = tokenData
    console.log({ tokenData })
  },
  loadAccessTokenFail: (state: AuthState, { payload }: PayloadAction<any>) => {
    state.isLoading = false
  },
  clearUserData: (state: AuthState, _payload: any) => {
    state.data = null
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
})

export default authSlice.reducer

export const { loadAccessToken, loadAccessTokenSuccess, loadAccessTokenFail, clearUserData } =
  authSlice.actions
