import { useState } from 'react'
import useSocket from './useSocket'
import { Tour } from '@schema/Company/Tour'
import { Rate } from '@schema/User/Rate'

export default function useCreateRate() {
  const [routes, setRoutes] = useState<Rate | null>(null)
  const [error, setError] = useState(null)

  const socket = useSocket((socket) => {
    socket.on('create-rate-result', (data) => {
      setRoutes(data.data)
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  const createRate = (rate: Rate) => {
    // setRoutes(null)
    // setError(null)
    socket?.emit('create-rate', {
      star: rate.star,
      description: rate.description,
      touristsRouteId: rate.touristsRouteId,
    })
  }

  return { createRate, data: routes, isError: error !== null, error }
}
