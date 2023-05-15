import { TopBarType } from '@constants/global'
import { State } from '@constants/state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocationObjectCoords } from 'expo-location'
import {
  getCurrentLocationThunk,
  getLocationPermissionThunk,
  getNotificationPermissionThunk,
  requestLocationPermissionThunk,
  requestNotificationPermissionThunk,
} from './thunk'

export interface Global {
  location: {
    permissionStatus: boolean
    currentLocation: LocationObjectCoords | null
    status: State
  }
  notification: {
    permissionStatus: boolean
    status: State
  }
}

const initialState: Global = {
  location: {
    permissionStatus: false,
    currentLocation: null,
    status: State.IDLE,
  },
  notification: {
    permissionStatus: false,
    status: State.IDLE,
  },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocationPermissionThunk.pending, (state) => {
        state.location = {
          ...state.location,
          status: State.LOADING,
        }
      })
      .addCase(getLocationPermissionThunk.fulfilled, (state, action) => {
        state.location = {
          ...state.location,
          permissionStatus: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(getLocationPermissionThunk.rejected, (state) => {
        state.location = {
          ...state.location,
          status: State.IDLE,
        }
      })

    builder
      .addCase(getCurrentLocationThunk.pending, (state) => {
        state.location = {
          ...state.location,
          status: State.LOADING,
        }
      })
      .addCase(getCurrentLocationThunk.fulfilled, (state, action) => {
        state.location = {
          ...state.location,
          currentLocation: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(getCurrentLocationThunk.rejected, (state) => {
        state.location = {
          ...state.location,
          status: State.IDLE,
        }
      })

    builder
      .addCase(requestLocationPermissionThunk.pending, (state) => {
        state.location = {
          ...state.location,
          status: State.LOADING,
        }
      })
      .addCase(requestLocationPermissionThunk.fulfilled, (state, action) => {
        state.location = {
          ...state.location,
          permissionStatus: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(requestLocationPermissionThunk.rejected, (state) => {
        state.location = {
          ...state.location,
          status: State.IDLE,
        }
      })

    builder
      .addCase(getNotificationPermissionThunk.pending, (state) => {
        state.notification = {
          ...state.notification,
          status: State.LOADING,
        }
      })
      .addCase(getNotificationPermissionThunk.fulfilled, (state, action) => {
        state.notification = {
          ...state.notification,
          permissionStatus: action.payload,
          status: State.IDLE,
        }
      })

    builder
      .addCase(requestNotificationPermissionThunk.pending, (state) => {
        state.notification = {
          ...state.notification,
          status: State.LOADING,
        }
      })
      .addCase(requestNotificationPermissionThunk.fulfilled, (state, action) => {
        state.notification = {
          ...state.notification,
          permissionStatus: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(requestNotificationPermissionThunk.rejected, (state) => {
        state.notification = {
          ...state.notification,
          status: State.IDLE,
        }
      })
  },
})

export const {} = globalSlice.actions
export default globalSlice.reducer
