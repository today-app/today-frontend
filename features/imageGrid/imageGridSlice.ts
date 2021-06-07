import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageGridState, LoadFailPayload, LoadPayload, LoadSuccessPayload } from './types'

const initialState = {
  isLoading: false,
  images: [],
  error: null,
}

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

export const imageGridSlice = createSlice({
  name: 'imageGrid',
  initialState,
  reducers,
})

export const { load, loadSuccess, loadFail } = imageGridSlice.actions
