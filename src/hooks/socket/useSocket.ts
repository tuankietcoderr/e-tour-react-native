import { COMMON } from '@constants/common'
import { UserContext } from '@context/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_API_URL } from '@utils/server'
import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

export const getSocket = async () => {
  const token = await AsyncStorage.getItem(COMMON.ACCESS_TOKEN)
  if (token) {
    return io(`${BASE_API_URL}`, {
      path: '/socket',
      query: {
        type: 'client',
        token,
      },
    })
  }
  return null
}

let vSocket: Socket | null = null
export default function useSocket(onConnect: (socket: Socket) => void, dependencies: any) {
  const [socket, setSocket] = useState<Socket>()
  const { token } = React.useContext(UserContext)
  useEffect(() => {
    ;(async function () {
      if (!socket?.connected && vSocket?.connected) {
        if (vSocket) {
          setSocket(vSocket)
          onConnect(vSocket)
        }
      } else {
        const _socket = await getSocket()
        vSocket = _socket
        if (_socket) {
          setSocket(_socket)
          onConnect(_socket)
        }
      }
    })()
  }, [...(dependencies || []), token])

  return socket
}
