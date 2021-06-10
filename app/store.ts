import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Reducer,
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
import { watchFetchAccessToken } from 'features/auth/saga'
import { authSlice } from 'features/auth/authSlice'
import thunkMiddleware from 'redux-thunk'

const combinedReducer = combineReducers({
  counter: counterReducer,
  router: routerReducer,
  [authSlice.name]: authSlice.reducer,
  [imageGridSlice.name]: imageGridSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield all([watchImageLoad(), watchFetchAccessToken()])
}

const rootReducer = (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    if (state.counter.value) nextState.counter.value = state.counter.value
    if (typeof window !== 'undefined' && state?.router) {
      nextState.router = state.router
    }
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

  const isServer = typeof window === 'undefined'
  if (isServer) {
    const store = configureStore({
      reducer: rootReducer as Reducer,
      // middleware: [...getDefaultMiddleware({ thunk: true }), ...middlewares],
      middleware: [thunkMiddleware, ...middlewares],
      preloadedState: initialState,
    })

    sagaMiddleware.run(rootSaga)

    return store
  }

  const { persistStore, persistReducer } = require('redux-persist')
  const storage = require('redux-persist/lib/storage').default
  const persistConfig = {
    key: 'todayAppPersistStore',
    storage,
    whitelist: ['auth'],
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = configureStore({
    reducer: persistedReducer,
    // middleware: [...getDefaultMiddleware({ thunk: true }), ...middlewares],
    middleware: [thunkMiddleware, ...middlewares],
    preloadedState: initialState,
  })
  // @ts-ignore
  store.__persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return store
}

export type AppState = ReturnType<typeof combinedReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const wrapper = createWrapper(makeStore)
