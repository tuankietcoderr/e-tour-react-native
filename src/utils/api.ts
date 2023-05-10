import axios from 'axios'
import { BASE_API_URL, BASE_API_URL_SOCKET } from './server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COMMON } from '@constants/common'
import { Socket } from 'socket.io-client'
import { SocketEvent } from '@constants/socket'

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
})

export const socket_api = axios.create({
  baseURL: BASE_API_URL_SOCKET,
  timeout: 10000,
})

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(COMMON.ACCESS_TOKEN)
    return token
  } catch (err) {}
}

export const getRequest = async (url: string, params?: any) => {
  try {
    const token = await getToken()
    const res = await api.get(BASE_API_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const postRequest = async (url: string, data: any, params?: any) => {
  try {
    const token = await getToken()
    const res = await api.post(BASE_API_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const putRequest = async (url: string, data: any, params?: any) => {
  try {
    const token = await getToken()
    const res = await api.put(BASE_API_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const deleteRequest = async (url: string, params?: any) => {
  try {
    const token = await getToken()
    const res = await api.delete(BASE_API_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}

export const asyncSocket = (as: SocketEvent) => {
  const { data, eventEmitterName, eventOnName, socket } = as
  return new Promise((resolve, reject) => {
    eventEmitterName && socket.emit(eventEmitterName, data)
    socket.on(eventOnName, (res) => {
      // socket.off(eventOnName)
      resolve(res)
    })
    setTimeout(reject, 1000)
  })
}
