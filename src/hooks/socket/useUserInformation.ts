import { useState } from 'react'
import useSocket from './useSocket'
import { User } from '@schema/User/User'

export default function useUserInformation(deps?: any[]) {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [error, setError] = useState(null)

  useSocket(
    (socket) => {
      socket.emit('view-user-profile')
      socket.on('user-profile', (data) => {
        setUserInfo(data.data)
      })
      socket.on('error', (error) => {
        setError(error)
      })
    },
    [...(deps || [])]
  )

  return { data: userInfo, isError: error !== null, error }
}
