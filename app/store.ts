import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import counterReducer from '../features/counter/counterSlice'

const combinedReducer = combineReducers({
  counter: counterReducer
})

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
  return configureStore({
    reducer: reducer,
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(makeStore)