import {
  LocationAccuracy,
  LocationGeocodedAddress,
  LocationObjectCoords,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  getForegroundPermissionsAsync,
  PermissionStatus,
} from 'expo-location'

const getLocationPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await getForegroundPermissionsAsync()
    return status
  } catch (err) {
    throw err
  }
}

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await requestForegroundPermissionsAsync()
    return status === 'granted'
  } catch (err) {
    throw err
  }
}

const getCurrentLocation = async (): Promise<null | LocationObjectCoords> => {
  try {
    const { coords } = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    })
    return coords
  } catch (err) {
    throw err
  }
}

const toAddressString = (geo: LocationGeocodedAddress | null): string => {
  return [geo?.streetNumber, geo?.street, geo?.district, geo?.subregion, geo?.region, geo?.country]
    .filter((a) => a)
    .join(', ')
}

export { requestLocationPermission, getCurrentLocation, toAddressString, getLocationPermission }
