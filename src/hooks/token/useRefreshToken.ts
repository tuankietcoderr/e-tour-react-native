import { COMMON } from '@constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function useRefreshToken() {
  const token = await AsyncStorage.getItem(COMMON.REFRESH_TOKEN)
  return token
}
