import { TouristsRoute } from '@schema/Company/TouristsRoute'
import useSocket from './useSocket'
import React from 'react'

export default function useSearch() {
  const [routes, setRoutes] = React.useState<TouristsRoute[]>([])
  const [error, setError] = React.useState(null)

  const socket = useSocket((socket) => {
    socket.on('search-route-result', (data) => {
      setRoutes(data.data)
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  function search(keyword: string) {
    socket?.emit('search-route', { keyword })
  }

  return { data: routes, isError: error !== null, error, socket, search }
}
