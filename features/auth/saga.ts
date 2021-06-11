import { push } from 'connected-next-router'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { fetchAccessToken } from './authAPI'
import { loadAccessToken, loadAccessTokenFail, loadAccessTokenSuccess } from './authSlice'
import jwt_decode from 'jwt-decode'
import { ILoadAccessTokenPayload, ITokenResponse } from './types'

function* handleFetchAccessToken(action: PayloadAction<ILoadAccessTokenPayload>) {
  const code = action.payload
  yield put(loadAccessToken)
  try {
    const tokenData: ITokenResponse = yield call(fetchAccessToken, code)
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
