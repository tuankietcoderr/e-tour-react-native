import { State } from '@constants/state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tour, TourType } from '@schema/Company/Tour'

interface ITour {
  status?: State
  tours?: Tour[]
}

const initialState: ITour = {
  tours: [] as Tour[],
  status: State.IDLE,
}

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setTours: (state, action: PayloadAction<{ tour: Tour }>) => {
      state.tours?.push(action.payload.tour)
    },
    removeTours: (state) => {
      state.tours = undefined
    },
  },
})

export default tourSlice.reducer

export const { setTours, removeTours } = tourSlice.actions
