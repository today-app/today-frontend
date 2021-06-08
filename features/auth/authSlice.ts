import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../app/store'
import { fetchProfile } from './authAPI'

export interface AuthState {
  value: any
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  value: null,
  status: 'idle',
}

export const fetchProfileThunk = createAsyncThunk('auth/fetchProfile', async () => {
  const response = await fetchProfile()
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfileThunk.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.status = 'idle'
        state.value = null
      })
  },
})

// export const { increment, decrement, incrementByAmount } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectValue = (state: AppState) => state.auth.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState())
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount))
//   }
// }

export default authSlice.reducer
