import { State } from '@constants/state'
import { createSlice } from '@reduxjs/toolkit'
import {
  getAllSavedToursThunk,
  getAllSavedVouchersThunk,
  saveTourThunk,
  saveVoucherThunk,
  unsaveTourThunk,
  unsaveVoucherThunk,
} from './thunk'

interface Saved {
  tours: {
    data: string[]
    status: State
  }
  vouchers: {
    data: string[]
    status: State
  }
}

const initialState: Saved = {
  tours: {
    data: [],
    status: State.IDLE,
  },
  vouchers: {
    data: [],
    status: State.IDLE,
  },
}

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    clearSaved: (state) => {
      state.tours = {
        data: [],
        status: State.IDLE,
      }
      state.vouchers = {
        data: [],
        status: State.IDLE,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSavedToursThunk.pending, (state) => {
        state.tours = {
          ...state.tours,
          status: State.LOADING,
        }
      })
      .addCase(getAllSavedToursThunk.fulfilled, (state, action) => {
        state.tours = {
          data: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(getAllSavedToursThunk.rejected, (state) => {
        state.tours = {
          ...state.tours,
          status: State.IDLE,
        }
      })

    builder
      .addCase(saveTourThunk.pending, (state) => {
        state.tours = {
          ...state.tours,
          status: State.LOADING,
        }
      })
      .addCase(saveTourThunk.fulfilled, (state, action) => {
        state.tours = {
          data: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(saveTourThunk.rejected, (state) => {
        state.tours = {
          ...state.tours,
          status: State.IDLE,
        }
      })

    builder
      .addCase(unsaveTourThunk.pending, (state) => {
        state.tours = {
          ...state.tours,
          status: State.LOADING,
        }
      })
      .addCase(unsaveTourThunk.fulfilled, (state, action) => {
        state.tours = {
          data: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(unsaveTourThunk.rejected, (state) => {
        state.tours = {
          ...state.tours,
          status: State.IDLE,
        }
      })

    builder
      .addCase(getAllSavedVouchersThunk.pending, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.LOADING,
        }
      })
      .addCase(getAllSavedVouchersThunk.fulfilled, (state, action) => {
        state.vouchers = {
          data: action.payload,
          status: State.IDLE,
        }
      })
      .addCase(getAllSavedVouchersThunk.rejected, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.IDLE,
        }
      })

    builder
      .addCase(saveVoucherThunk.pending, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.LOADING,
        }
      })
      .addCase(saveVoucherThunk.fulfilled, (state, action) => {
        state.vouchers = {
          data: action.payload.updatedVouchers,
          status: State.IDLE,
        }
      })
      .addCase(saveVoucherThunk.rejected, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.IDLE,
        }
      })

    builder
      .addCase(unsaveVoucherThunk.pending, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.LOADING,
        }
      })
      .addCase(unsaveVoucherThunk.fulfilled, (state, action) => {
        state.vouchers = {
          data: action.payload.updatedVouchers,
          status: State.IDLE,
        }
      })
      .addCase(unsaveVoucherThunk.rejected, (state) => {
        state.vouchers = {
          ...state.vouchers,
          status: State.IDLE,
        }
      })
  },
})

export default savedSlice.reducer

export const { clearSaved } = savedSlice.actions
