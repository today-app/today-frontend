export interface ImageGridState {
  isLoading: boolean
  images: any[]
  error: any
}

export interface LoadPayload {
  key: string
  page?: number
}

export type LoadSuccessPayload = any[]

export type LoadFailPayload = string
