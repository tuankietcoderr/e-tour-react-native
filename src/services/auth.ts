import { COMMON } from '@constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '@utils/api'
import { User } from '@schema/User/User'

const signIn = async (username: string, password: string) => {
  try {
    const response = await api.post('/user/login/basic', {
      username,
      password,
    })
    if (response.status === 200) {
      const data = response.data.data
      Promise.all([
        AsyncStorage.setItem(COMMON.ACCESS_TOKEN, data.tokens.accessToken),
        AsyncStorage.setItem(COMMON.REFRESH_TOKEN, data.tokens.refreshToken),
        AsyncStorage.setItem(COMMON.TOKEN_EXP, new Date().toDateString()),
      ])
      return response.data
    }
  } catch (err) {
    throw err
  }
}

const signUp = async (user: User) => {
  const username = user.credential?.username
  const password = user.credential?.password
  delete user.credential
  delete user._id
  delete user.isEmailVerified
  delete user.isPhoneVerified
  delete user.phoneNumber
  delete user.address
  delete user.identityExpiredAt
  delete user.image
  try {
    const response = await api.post('/user/signup/basic', { ...user, username, password })
    if (response.status === 200) {
      const data = response.data.data
      Promise.all([
        AsyncStorage.setItem(COMMON.ACCESS_TOKEN, data.tokens.accessToken),
        AsyncStorage.setItem(COMMON.REFRESH_TOKEN, data.tokens.refreshToken),
        AsyncStorage.setItem(COMMON.TOKEN_EXP, new Date().toDateString()),
      ])
      return response.data
    }
  } catch (err) {
    throw err
  }
}

const signUpWithGoogle = async (user: User, accessToken: string) => {
  try {
    const response = await api.post('/user/signup/google', {
      accessToken,
      ...user,
    })
    if (response.status === 200) {
      const data = response.data.data
      Promise.all([
        AsyncStorage.setItem(COMMON.ACCESS_TOKEN, data.tokens.accessToken),
        AsyncStorage.setItem(COMMON.REFRESH_TOKEN, data.tokens.refreshToken),
        AsyncStorage.setItem(COMMON.TOKEN_EXP, new Date().toDateString()),
      ])
      return response.data
    }
  } catch (err) {
    throw err
  }
}

const signInWithGoogle = async (accessToken: string) => {
  try {
    const response = await api.post('/user/login/google', {
      accessToken,
    })
    if (response.status === 200) {
      const data = response.data.data
      Promise.all([
        AsyncStorage.setItem(COMMON.ACCESS_TOKEN, data.tokens.accessToken),
        AsyncStorage.setItem(COMMON.REFRESH_TOKEN, data.tokens.refreshToken),
        AsyncStorage.setItem(COMMON.TOKEN_EXP, new Date().toDateString()),
      ])
      return response.data
    } else {
      throw new Error('ERROR')
    }
  } catch (err) {
    throw err
  }
}

const signOut = async () => {
  try {
    Promise.all([
      AsyncStorage.removeItem(COMMON.ACCESS_TOKEN),
      AsyncStorage.removeItem(COMMON.REFRESH_TOKEN),
      AsyncStorage.removeItem(COMMON.TOKEN_EXP),
    ])
  } catch (err) {
    throw err
  }
}

export { signIn, signOut, signUp, signInWithGoogle, signUpWithGoogle }
