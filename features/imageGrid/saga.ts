import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { load, loadFail, LoadPayload, loadSuccess } from './imageGridSlice'

const getSplashImage = (page = 20, key = ''): Promise<any[]> => {
  return fetch(`https://api.unsplash.com/photos/?client_id=${key}&per_page=${page}`)
    .then(res => res.json())
    .catch(err => {
      throw err
    })
}

function* handleImageLoad(action: PayloadAction<LoadPayload>): Generator<any, void, void> {
  const { key, page } = action.payload
  try {
    const images = yield call(getSplashImage, page, key)
    yield put(loadSuccess(images))
  } catch (err) {
    yield put(loadFail(err))
  }
}

export function* watchImageLoad() {
  yield takeLatest(load, handleImageLoad)
}
