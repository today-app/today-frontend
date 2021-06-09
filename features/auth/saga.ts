import { push } from 'connected-next-router'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { fetchAccessToken } from './authAPI'
import {
  LoadAccessTokenPayload,
  loadAccessToken,
  loadAccessTokenFail,
  loadAccessTokenSuccess,
} from './authSlice'
import jwt_decode from 'jwt-decode'

export interface TokenResponse {
  access_token: string
  expires_in: number
  id_token: string
  refresh_token: string
  scope: string
  token_type: string
}

function* handleFetchAccessToken(action: PayloadAction<LoadAccessTokenPayload>) {
  console.log({ action })
  const code = action.payload
  yield put(loadAccessToken)
  try {
    //@ts-ignore
    const tokenData: TokenResponse = yield call(fetchAccessToken, code)
    const idTokenData = jwt_decode(tokenData.id_token)
    yield put(loadAccessTokenSuccess(idTokenData))
    yield call([localStorage, localStorage.setItem], 'access_token', tokenData.access_token)
    yield call([localStorage, localStorage.setItem], 'refresh_token', tokenData.refresh_token)
  } catch (err) {
    yield put(loadAccessTokenFail(err))
  }
  yield put(push({ pathname: '/' }))
}

export function* watchFetchAccessToken() {
  yield takeLatest(loadAccessToken, handleFetchAccessToken)
}

export default function* authSaga() {
  yield all([fork(watchFetchAccessToken)])
}
