import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/auth'
import { globalSlice } from './features/global'
import { tourSlice } from './features/tour'
import { cardSlice } from './features/card'
import { savedSlice } from './features/saved'

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
    tour: tourSlice.reducer,
    card: cardSlice.reducer,
    saved: savedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
