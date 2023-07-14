import { useState } from 'react'
import useSocket from './useSocket'
import { TouristsRoute } from '@schema/Company/TouristsRoute'
import { Ticket } from '@schema/User/Ticket'

export default function useHistory(num: number) {
  const [routes, setRoutes] = useState<Ticket[] | undefined>(undefined)
  const [error, setError] = useState(null)

  const socket = useSocket(
    (socket) => {
      socket.emit('view-booked-ticket', { num })
      socket.on('booked-ticket-list', (data) => {
        // sort by date
        setRoutes(
          (data.data as Ticket[]).sort(
            (a, b) =>
              new Date(b?.createdAt || new Date()).getTime() -
              new Date(a?.createdAt || new Date()).getTime()
          )
        )
      })

      socket.on('update-ticket-result', (data) => {
        setRoutes((prev) => prev?.map((route) => (route._id === data.data._id ? data.data : route)))
      })

      socket.on('error', (error) => {
        setError(error)
      })
    },
    [num]
  )

  function refresh() {
    socket?.emit('view-booked-ticket', { num })
  }

  return { data: routes, isError: error !== null, error, refresh }
}
