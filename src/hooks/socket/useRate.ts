import { useState } from 'react'
import useSocket from './useSocket'
import { TouristsRoute } from '@schema/Company/TouristsRoute'
import { Rate } from '@schema/User/Rate'

export default function useRate(id: any) {
  const [route, setRoute] = useState<Rate[] | null>(null)
  const [error, setError] = useState(null)

  useSocket(
    (socket) => {
      socket.emit('view-rate-of-route', { id })
      socket.on('rate-of-route', (data) => {
        setRoute(data.data)
      })
      socket.on('create-rate-result', (data) => {
        setRoute((prev) => {
          return prev
            ? [...prev.filter((item) => item._id !== data.data._id), data.data]
            : [data.data]
        })
      })
      socket.on('error', (error) => {
        setError(error)
      })
    },
    [id]
  )

  return { data: route, isError: error !== null, error }
}
