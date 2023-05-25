import { TouristsRoute } from '@schema/Company/TouristsRoute'
import { useState } from 'react'
import useSocket from './useSocket'
interface useTouristRouteProps {
  route: string[]
  keyword: string
}

export default function useTouristRoute({ route, keyword }: useTouristRouteProps) {
  const [routes, setRoutes] = useState<TouristsRoute[]>([])
  const [error, setError] = useState(null)
  const [popularRoutes, setPopularRoutes] = useState<TouristsRoute[]>([])
  const [recommendedRoutes, setRecommendedRoutes] = useState<TouristsRoute[]>([])
  useSocket(
    (socket) => {
      socket.emit('filter-route', { route, keyword })
      socket.on('retrieve-tourist-route', (data) => {
        setRoutes(data.data)
      })
      socket.on('new-route', (data) => {
        setRoutes((prev) => {
          return prev.length === 0 ? [data.data] : [...prev, data.data]
        })
      })

      socket.emit('view-popular-route', { num: 5 })
      socket.on('view-popular-route-result', (data) => {
        if (popularRoutes.length === 0) {
          setPopularRoutes(data.data)
        } else {
          setPopularRoutes((prev) => [...prev, data.data])
        }
      })

      socket.emit('view-recommend-route', { num: 3 })
      socket.on('list-route', (data) => {
        if (popularRoutes.length === 0) {
          setRecommendedRoutes(data.data)
        } else {
          setRecommendedRoutes((prev) => [...prev, data.data])
        }
      })

      socket.on('error', (error) => {
        setError(error)
      })
    },
    [route.join(''), keyword]
  )

  return { data: routes, isError: error !== null, error, popularRoutes, recommendedRoutes }
}
