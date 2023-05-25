import { Notification } from '@schema/User/Notification'
import useSocket from './useSocket'
import React from 'react'

export default function useNotification() {
  const [data, setData] = React.useState<Notification[] | null>(null)
  const [error, setError] = React.useState<boolean | null>(null)

  const socket = useSocket((socket) => {
    socket.emit('view-all-notification', {})
    socket.on('read-notification-result', (data) => {
      setData(data.data)
    })
    socket.on('all-notification-list', (d) => {
      setData(d.data || ([] as Notification[]))
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])
  const readNotification = (ids: string[]) => {
    socket?.emit('read-notification', { notificationIDs: ids })
  }
  return { readNotification, data, error, isError: error !== null }
}
