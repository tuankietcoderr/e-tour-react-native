import { StatusBar } from 'react-native'
import { Platform } from 'react-native'
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
