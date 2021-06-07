import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

export interface ImageGridState {
  isLoading: boolean
  images: any[]
  error: any
}

const initialState = {
  isLoading: false,
  images: [],
  error: null,
}

export interface LoadPayload {
  key: string
  page?: number
}
export type LoadSuccessPayload = any[]
export type LoadFailPayload = string

const reducers = {
  load: (state: ImageGridState, _payload: PayloadAction<LoadPayload>) => {
    state.isLoading = true
  },
  loadSuccess: (state: ImageGridState, { payload: images }: PayloadAction<LoadSuccessPayload>) => {
    state.isLoading = false
    state.images = images
  },
  loadFail: (state: ImageGridState, { payload: error }: PayloadAction<LoadFailPayload>) => {
    state.isLoading = false
    state.error = error
  },
}

const name = 'imageGrid'

export const imageGridSlice = createSlice({
  name,
  initialState,
  reducers,
})

export const { load, loadSuccess, loadFail } = imageGridSlice.actions
