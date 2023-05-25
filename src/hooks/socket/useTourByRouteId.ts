import { useState } from 'react'
import useSocket from './useSocket'
import { Tour } from '@schema/Company/Tour'

export default function useTourByRouteId(id: string) {
  const [routes, setRoutes] = useState<Tour[]>([])
  const [error, setError] = useState(null)
  useSocket(
    (socket) => {
      socket.emit('filter-tour', { touristRoute: id })
      socket.on('list-tour', (data) => {
        setRoutes(data.data)
      })
      socket.on('error', (error) => {
        setError(error)
      })
    },
    [id]
  )

  return { data: routes, isError: error !== null, error }
}
