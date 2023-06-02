import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { COMMON } from '@constants/common'
import { ROUTES } from '@constants/route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView } from 'react-native'
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import Onboarding, { Page } from 'react-native-onboarding-swiper'

const MyOnboarding = ({ navigation }: NativeStackScreenProps<any>) => {
  useFocusEffect(
    React.useCallback(() => {
      ;(async function () {
        await AsyncStorage.getItem(COMMON.ACCESS_TOKEN)
          .then(async (token) => {
            if (token) {
              // Authorize token
              const exp = await AsyncStorage.getItem(COMMON.TOKEN_EXP)
              if (!exp) {
                SplashScreen.hideAsync()
                return
              }
              const expDate = new Date(exp)
              const now = new Date()
              const diffTime = Math.abs(now.getTime() - expDate.getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              if (diffDays >= 30) {
                await AsyncStorage.removeItem(COMMON.ACCESS_TOKEN)
                await AsyncStorage.removeItem(COMMON.TOKEN_EXP)
                SplashScreen.hideAsync()
                return
              }
              navigation.navigate(ROUTES.APP_PROVIDER as never)
              setTimeout(() => {
                SplashScreen.hideAsync()
              }, 1000)
            } else {
              SplashScreen.hideAsync()
            }
          })
          .catch(() => {
            SplashScreen.hideAsync()
          })
      })()
    }, [])
  )

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const { height } = useWindowDimensions()
  const Title = (): JSX.Element => (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: AppFonts.regular,
          fontSize: AppFontSizes.h4,
          color: AppColors.white,
        }}
      >
        Welcome to
      </Text>
      <Image
        source={require('@assets/icon.png')}
        style={{ width: 200, height: 140, resizeMode: 'contain' }}
      />
    </View>
  )

  const onboardingData: Page[] = [
    {
      subtitle: (
        <Text style={styles.text}>
          'Lorem ipsum dolor sit amet consectetur. Ut ornare adipiscing sed purus neque gravida.',
        </Text>
      ),
      image: <></>,
      title: '',
      backgroundColor: 'transparent',
    },
    {
      subtitle: (
        <Text style={styles.text}>
          'Ei hay ne thu gi do hay hay di! Watashi wa betonamu jin desu. Yoroshiku onegaishimasu.',
        </Text>
      ),
      image: <></>,
      title: '',
      backgroundColor: 'transparent',
    },
    {
      subtitle: (
        <Text style={styles.text}>
          'We are from group 4 and this is our project, is it good? Ket thuc cau nay bang dau cham
          than!',
        </Text>
      ),
      image: <></>,
      title: '',
      backgroundColor: 'transparent',
    },
  ]

  return (
    <ScrollView
      style={{
        backgroundColor: AppColors.white,
      }}
    >
      <View
        style={{
          // maxHeight: height,
          minHeight: height,
          backgroundColor: AppColors.white,
          paddingBottom: 40,
          // flex: 1,
          // justifyContent: 'space-evenly',
        }}
      >
        <Image
          source={require('@assets/illustration/FlyCircle.png')}
          style={{
            width: '100%',
          }}
          resizeMode="stretch"
        />
        <Title />
        <Onboarding
          DoneButtonComponent={undefined}
          NextButtonComponent={undefined}
          SkipButtonComponent={undefined}
          showDone={false}
          showSkip={false}
          containerStyles={{
            flex: 1,
            justifyContent: 'center',
            maxHeight: 80,
          }}
          DotComponent={({ selected }) => (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 3,
                backgroundColor: selected ? AppColors.primary : AppColors.gray,
              }}
            />
          )}
          nextLabel=""
          bottomBarHighlight={false}
          pages={onboardingData}
        />
        <TouchableOpacity
          style={{
            borderRadius: 100,
            backgroundColor: AppColors.primary,
            alignSelf: 'center',
            paddingHorizontal: 45,
            paddingVertical: 12,
          }}
          onPress={() => navigation.navigate('Signin' as never)}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.medium,
              color: AppColors.white,
            }}
          >
            Get started
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  )
}

export default MyOnboarding

const styles = StyleSheet.create({
  text: {
    color: AppColors.primary,
    fontSize: AppFontSizes.body,
    textAlign: 'center',
    fontFamily: AppFonts.regular,
    paddingHorizontal: 20,
  },
})