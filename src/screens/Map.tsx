import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { selectLocation } from '@store/features/global/selector'
import {
  getCurrentLocationThunk,
  requestLocationPermissionThunk,
} from '@store/features/global/thunk'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { toAddressString } from '@utils/location'
import MapboxGL from '@utils/mapbox-gl'
import { LocationGeocodedAddress, LocationObjectCoords, reverseGeocodeAsync } from 'expo-location'
import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'

type ParamList = {
  Map: {
    setAddressParams: (address: string) => void
  }
}

const Map = ({ navigation }: NativeStackScreenProps<any>) => {
  const [Mapbox, setMapbox] = useState<any>(null)
  React.useEffect(() => {
    if (!MapboxGL.ins) {
      MapboxGL.config()
    }
    setMapbox(MapboxGL.ins)
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
  }, [])

  const { permissionStatus, currentLocation } = useAppSelector(selectLocation)

  const [location, setLocation] = useState<LocationObjectCoords | null>(currentLocation)
  const { setAddressParams } = useRoute<RouteProp<ParamList, 'Map'>>().params
  const [address, setAddress] = useState<LocationGeocodedAddress | null>(null)

  const handleOnPress = (feature) => {
    const [longitude, latitude] = feature.geometry.coordinates
    setLocation((prev) => ({
      ...(prev as LocationObjectCoords),
      longitude,
      latitude,
    }))
  }

  const fullAddress: string = toAddressString(address)

  React.useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation)
    }
  }, [currentLocation])

  React.useEffect(() => {
    ;(async function () {
      if (location) {
        try {
          const res = await reverseGeocodeAsync(location)
          setAddress(res[0])
          const addresses = toAddressString(res[0])
          setAddressParams(addresses)
        } catch (err) {}
      }
    })()
  }, [location])
  const dispatch = useAppDispatch()
  const handleGrantLocation = () => {
    dispatch(requestLocationPermissionThunk()).then((res) => {
      if (res) {
        dispatch(getCurrentLocationThunk())
      }
    })
  }

  if (!permissionStatus) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <MaterialCommunityIcons
          name="map-marker-off-outline"
          size={200}
          color={AppColors.lightRed}
        />
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            textAlign: 'center',
            color: AppColors.lightRed,
          }}
        >
          Location permission is not granted
        </Text>
        <TouchableOpacity
          onPress={handleGrantLocation}
          style={{
            backgroundColor: AppColors.lightRed,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
            }}
          >
            Grant location
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!Mapbox) {
    return (
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 40,
            zIndex: 999,
            backgroundColor: AppColors.white,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderColor: AppColors.primary,
            borderWidth: 1,
            borderRadius: 6,
          }}
          onPress={() => navigation.canGoBack() && navigation.goBack()}
        >
          <Text
            style={{
              color: AppColors.primary,
              fontFamily: AppFonts.semiBold,
            }}
          >
            Return
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: AppColors.red,
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.medium,
            }}
          >
            Map is not available on Expo
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          top: 40,
          zIndex: 999,
          backgroundColor: AppColors.white,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderColor: AppColors.primary,
          borderWidth: 1,
          borderRadius: 6,
        }}
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      >
        <Text
          style={{
            color: AppColors.primary,
            fontFamily: AppFonts.semiBold,
          }}
        >
          Return
        </Text>
      </TouchableOpacity>
      {location && (
        <>
          <Mapbox.MapView
            style={styles.map}
            styleURL={Mapbox.StyleURL.Outdoors}
            onPress={handleOnPress}
          >
            <Mapbox.Camera
              zoomLevel={15}
              centerCoordinate={[location?.longitude || 0, location?.latitude || 0]}
              animationMode={location.longitude !== currentLocation?.longitude ? 'easeTo' : 'none'}
              animationDuration={1000}
            />

            <Mapbox.PointAnnotation
              id="userLocation"
              coordinate={[location?.longitude || 0, location?.latitude || 0]}
              title="Your location"
              children={<></>}
            />
          </Mapbox.MapView>
          {address && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 16,
                paddingVertical: 24,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  fontSize: AppFontSizes.medium,
                  color: AppColors.primary,
                }}
              >
                {fullAddress}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  map: {
    flex: 1,
  },
})