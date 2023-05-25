import useSocket from './useSocket'
import React from 'react'

export default function useFollow() {
  const [error, setError] = React.useState<boolean | null>(null)
  const [companyFollow, setCompanyFollow] = React.useState<any>(undefined)
  const [routeFollow, setRouteFollow] = React.useState<any>(undefined)
  const socket = useSocket((socket) => {
    socket.on('follow-company-result', (data) => {
      setCompanyFollow(data.data)
    })
    socket.on('unfollow-company-result', (data) => {
      setCompanyFollow(undefined)
    })
    socket.on('follow-tourist-route-result', (data) => {
      setRouteFollow(data.data)
    })
    socket.on('unfollow-tourist-route-result', (data) => {
      setRouteFollow(undefined)
    })
    socket.on('error', (error) => {
      setError(error)
    })
  }, [])

  function followRoute(routeId: string, notificationType: string) {
    socket?.emit('follow-tourist-route', { routeId, notificationType })
  }
  function unfollowRoute(routeId: string) {
    socket?.emit('unfollow-tourist-route', { routeId })
  }
  function followCompany(companyId: string, notificationType: string) {
    socket?.emit('follow-company', { companyId, notificationType })
  }

  function unfollowCompany(companyId: string) {
    socket?.emit('unfollow-company', { companyId })
  }

  return {
    companyFollow,
    routeFollow,
    followCompany,
    followRoute,
    unfollowCompany,
    unfollowRoute,
    error,
    isError: error !== null,
  }
}
