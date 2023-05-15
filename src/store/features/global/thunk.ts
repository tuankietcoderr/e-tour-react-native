import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getCurrentLocation,
  getLocationPermission,
  requestLocationPermission,
} from '@utils/location'
import { getNotificationPermission, requestNotificationPermission } from '@utils/notification'

const getLocationPermissionThunk = createAsyncThunk(
  'global/getLocationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLocationPermission()
      return res === 'granted'
    } catch (err) {
      throw err
    }
  }
)

const getCurrentLocationThunk = createAsyncThunk(
  'global/getCurrentLocation',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentLocation()
      return res
    } catch (err) {
      throw err
    }
  }
)

const requestLocationPermissionThunk = createAsyncThunk(
  'global/requestLocationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await requestLocationPermission()
      return res
    } catch (err) {
      throw err
    }
  }
)

const getNotificationPermissionThunk = createAsyncThunk(
  'global/getNotificationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNotificationPermission()
      return res === 'granted'
    } catch (err) {
      throw err
    }
  }
)

const requestNotificationPermissionThunk = createAsyncThunk(
  'global/requestNotificationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await requestNotificationPermission()
      return res
    } catch (err) {
      throw err
    }
  }
)

export {
  getLocationPermissionThunk,
  getCurrentLocationThunk,
  requestLocationPermissionThunk,
  getNotificationPermissionThunk,
  requestNotificationPermissionThunk,
}
