import { useState } from 'react'
import useSocket from './useSocket'
import { Tour } from '@schema/Company/Tour'
import { Rate } from '@schema/User/Rate'
import { TouristsRoute } from '@schema/Company/TouristsRoute'

export default function useCreateSave() {
  const [error, setError] = useState(null)

  const socket = useSocket((socket) => {
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  const saveRoute = (id: string) => {
    socket?.emit('save-route', { routeId: id })
  }

  const unSaveRoute = (id: string) => {
    socket?.emit('remove-route-from-saved', { routeId: id })
  }

  return { saveRoute, unSaveRoute, isError: error !== null, error }
}
