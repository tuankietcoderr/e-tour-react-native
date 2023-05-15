import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllSavedTours,
  getAllSavedVouchers,
  saveTour,
  saveVoucher,
  unsaveTour,
  unsaveVoucher,
} from '@services/saved'
import { getRequest } from '@utils/api'

const getAllSavedToursThunk = createAsyncThunk('saved/getAllSavedTours', async () => {
  try {
    const res = await getAllSavedTours()
    return res
  } catch (err) {
    throw err
  }
})

const saveTourThunk = createAsyncThunk('saved/saveTour', async (tourId: string) => {
  try {
    const res = await saveTour(tourId)
    return res
  } catch (err) {
    throw err
  }
})

const unsaveTourThunk = createAsyncThunk('saved/unsaveTour', async (tourId: string) => {
  try {
    const res = await unsaveTour(tourId)
    return res
  } catch (err) {
    throw err
  }
})

const getAllSavedVouchersThunk = createAsyncThunk('saved/getAllSavedVouchers', async () => {
  try {
    const res = await getAllSavedVouchers()
    return res
  } catch (err) {
    throw err
  }
})

const saveVoucherThunk = createAsyncThunk('saved/saveVoucher', async (voucherId: string) => {
  try {
    const res = await saveVoucher(voucherId)
    return res
  } catch (err) {
    throw err
  }
})

const unsaveVoucherThunk = createAsyncThunk('saved/unsaveVoucher', async (voucherId: string) => {
  try {
    const res = await unsaveVoucher(voucherId)
    return res
  } catch (err) {
    throw err
  }
})

export {
  getAllSavedToursThunk,
  getAllSavedVouchersThunk,
  saveTourThunk,
  unsaveTourThunk,
  saveVoucherThunk,
  unsaveVoucherThunk,
}
