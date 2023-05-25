import useSocket from './useSocket'
import React from 'react'
export default function useSocketManager() {
  const [error, setError] = React.useState(null)
  const socket = useSocket((socket) => {
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])
  function disconnect() {
    socket?.disconnect()
  }
  return { disconnect, error, isError: error !== null }
}
