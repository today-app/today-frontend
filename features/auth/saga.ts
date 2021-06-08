import { all, fork, takeLatest } from 'redux-saga/effects'

function* watchLogin() {
  yield takeLatest()
}

export default function* authSaga() {
  yield all([fork(watchLogin)])
}
