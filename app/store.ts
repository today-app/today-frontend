import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit'
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router'
import { watchImageLoad } from 'features/imageGrid/saga'
import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { AppContext } from 'next/app'
import Router from 'next/router'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import counterReducer from '../features/counter/counterSlice'
import { imageGridSlice } from './../features/imageGrid/imageGridSlice'
import logger from 'redux-logger'

const combinedReducer = combineReducers({
  counter: counterReducer,
  router: routerReducer,
  [imageGridSlice.name]: imageGridSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield all([watchImageLoad()])
}

const rootReducer = (state, action) => {
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

const makeStore: MakeStore = (context: Context) => {
  const routerMiddleware = createRouterMiddleware()
  const middlewares = [routerMiddleware, sagaMiddleware, logger]

  const { asPath } = (context as AppContext).ctx || Router.router || {}
  let initialState
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    }
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: true }), ...middlewares],
    preloadedState: initialState,
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export type AppState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const wrapper = createWrapper(makeStore)
