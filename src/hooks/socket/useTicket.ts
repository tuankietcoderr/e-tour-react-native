import { Ticket } from '@schema/User/Ticket'
import React from 'react'
import useSocket from './useSocket'

export default function useTicket() {
  const [data, setData] = React.useState<Ticket | null>(null)
  const [error, setError] = React.useState(null)
  const [updateResult, setUpdateResult] = React.useState<Ticket | null>(null)
  const socket = useSocket((socket) => {
    socket.on('booked-ticket', (data) => {
      setData(data.data)
    })
    socket.on('update-ticket-result', (data) => {
      setUpdateResult(data.data)
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  function bookTicket(data) {
    socket?.emit('book-ticket', data)
  }

  function updateTicket(data: Ticket) {
    socket?.emit('update-ticket', {
      ticketId: data._id,
      ticketInfo: {
        status: data.status,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber.toString(),
        pickupLocation: data.pickupLocation,
        specialRequirement: data.specialRequirement,
        tourId: data.tourId._id,
        visitors: data.visitors.map((visitor) => {
          delete visitor._id
          visitor.phoneNumber = visitor.phoneNumber?.toString() || ''
          return visitor
        }),
      },
    })
  }

  return { data, isError: error !== null, error, bookTicket, updateTicket, updateResult }
}
