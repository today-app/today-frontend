import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getSplashImage } from './imageGridAPI'
import { load, loadFail, loadSuccess } from './imageGridSlice'
import { LoadPayload } from './types'

function* handleImageLoad(action: PayloadAction<LoadPayload>): Generator<any, void, void> {
  const { key, page } = action.payload
  try {
    const images = yield call(getSplashImage, page, key)
    //@ts-ignore
    yield put(loadSuccess(images))
  } catch (err) {
    yield put(loadFail(err))
  }
}

export function* watchImageLoad() {
  yield takeLatest(load, handleImageLoad)
}
