import { RootState } from '../..'

export const isLoggedIn = (state: RootState) => {
  return state.auth.token !== undefined
}

export const getAccessToken = (state: RootState) => {
  return state.auth.token?.accessToken
}

export const getRefreshToken = (state: RootState) => {
  return state.auth.token?.refreshToken
}
