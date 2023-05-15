import { RootState } from '@store/index'

export const selectTours = (state: RootState) => state.tour.tours
