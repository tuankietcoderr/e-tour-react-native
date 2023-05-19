import { COMMON } from '@constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function useAccessToken() {
  const [token, setToken] = useState<string>()
  useEffect(() => {
    ;(async function () {
      const token = await AsyncStorage.getItem(COMMON.ACCESS_TOKEN)
      setToken(token as string)
    })()
  }, [])
  return token
}
