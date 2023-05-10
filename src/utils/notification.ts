import { requestPermissionsAsync, getPermissionsAsync, PermissionStatus } from 'expo-notifications'
import * as Device from 'expo-device'
import { Linking, Platform } from 'react-native'

const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const version = Number(Device.osVersion)
    const platform = Platform.OS
    if (platform === 'android' && version < 13) {
      await Linking.openSettings()
      const status = await getNotificationPermission()
      return status === 'granted'
    }
    const { status, canAskAgain } = await requestPermissionsAsync()
    return status === 'granted'
  } catch (err) {
    throw err
  }
}

const getNotificationPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await getPermissionsAsync()
    return status
  } catch (err) {
    throw err
  }
}

export { requestNotificationPermission, getNotificationPermission }
