import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthState } from './types'

const initialState: IAuthState = {
  isLoading: false,
  data: null,
  error: null,
}

const reducers = {
  loadAccessToken(state: IAuthState) {
    state.isLoading = true
  },
  loadAccessTokenSuccess(state: IAuthState, { payload: tokenData }: PayloadAction<any>) {
    state.isLoading = false
    state.data = tokenData
  },
  loadAccessTokenFail(state: IAuthState, { payload: error }: PayloadAction<string>) {
    state.isLoading = false
    state.error = error
  },
  clearUserData(state: IAuthState) {
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
