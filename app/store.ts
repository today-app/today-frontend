import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { watchImageLoad } from 'features/imageGrid/saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import counterReducer from '../features/counter/counterSlice'
import { imageGridSlice } from './../features/imageGrid/imageGridSlice'

const combinedReducer = combineReducers({
  counter: counterReducer,
  [imageGridSlice.name]: imageGridSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield all([watchImageLoad()])
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    if (state.count.count) nextState.count.count = state.count.count
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export function makeStore() {
  const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware],
  })

  sagaMiddleware.run(rootSaga)

  return store
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const wrapper = createWrapper(makeStore)
