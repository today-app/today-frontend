import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IPostState {
  isPublicFeedLoading: boolean
  publicFeed: any[]
  userFeed: any[]
  error: string | null
}

const initialState: IPostState = {
  isPublicFeedLoading: false,
  publicFeed: [],
  userFeed: [],
  error: null,
}

const reducers = {
  loadPublicFeed: function (state: IPostState) {
    state.isPublicFeedLoading = true
  },
  loadPublicFeedSuccess(state: IPostState, { payload: data }: PayloadAction<any[]>) {
    state.isPublicFeedLoading = false
    state.publicFeed = [...state.publicFeed, ...data]
  },
  loadPublicFeedError(state: IPostState, { payload: error }: PayloadAction<string>) {
    state.isPublicFeedLoading = false
    state.error = error
  },
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers,
})

export const { loadPublicFeed, loadPublicFeedError, loadPublicFeedSuccess } = postSlice.actions
