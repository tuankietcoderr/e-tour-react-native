import { useState } from 'react'
import useSocket from './useSocket'
import { TouristsRoute } from '@schema/Company/TouristsRoute'

export default function useSavedRoute() {
  const [route, setRoute] = useState<TouristsRoute[] | null>(null)
  const [error, setError] = useState(null)
  useSocket((socket) => {
    socket.emit('view-saved-route')
    socket.on('saved-route', (data) => {
      setRoute(data.data)
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  return { data: route, isError: error !== null, error }
}
