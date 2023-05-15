import { State } from '@constants/state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Token {
  accessToken: string
  refreshToken: string
}
export interface AuthState {
  token?: Token
  status?: State
}

const initialState: AuthState = {
  token: {
    accessToken: '',
    refreshToken: '',
  },
  status: State.IDLE,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: Token }>) => {
      state.token = action.payload.token
    },
    removeToken: (state) => {
      state.token = undefined
    },
  },
})

export default authSlice.reducer

export const { setToken, removeToken } = authSlice.actions
