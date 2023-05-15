import { RootState } from '../..'

export const selectLocation = (state: RootState) => state.global.location
export const selectNotification = (state: RootState) => state.global.notification
