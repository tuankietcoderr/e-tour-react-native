import { RootState } from '@store/index'

export const selectSavedTours = (state: RootState) => state.saved.tours
export const selectSavedVouchers = (state: RootState) => state.saved.vouchers
