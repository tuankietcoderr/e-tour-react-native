import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '@constants/route'
import SignUp from '.'
import NextSignUp from './next'
import { useFocusEffect } from '@react-navigation/core'

const Stack = createNativeStackNavigator()
const SignUpProvider = ({ navigation }: NativeStackScreenProps<any>) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate(ROUTES.SIGNUP)
    }, [])
  )
  return (
    <>
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
      <Stack.Screen name={ROUTES.NEXT_SIGNUP} component={NextSignUp} />
    </>
  )
}

export default SignUpProvider