import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchPublicFeed } from './postAPI'
import { loadPublicFeed, loadPublicFeedError, loadPublicFeedSuccess } from './postSlice'

function* handleFetchPublicFeed() {
  yield put(loadPublicFeed)
  try {
    const postData = yield call(fetchPublicFeed, {})
    yield put(loadPublicFeedSuccess(postData))
  } catch (err) {
    yield put(loadPublicFeedError, err)
  }
}

export function* watchFetchPublicFeed() {
  yield takeLatest(loadPublicFeed, handleFetchPublicFeed)
}
