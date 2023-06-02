import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { User } from '@schema/User/User'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteProp, useRoute } from '@react-navigation/core'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import CustomAlert from '@components/CustomAlert'
import { InputWithDynamicLabel } from '@components/index'
import Toast from 'react-native-root-toast'
import { signUpWithGoogle } from '@services/auth'
import { ROUTES } from '@constants/route'

type ParamList = {
  SignupGoogleParams: {
    user: User
    token: string
  }
}

const SignupGoogle = ({ navigation }: NativeStackScreenProps<any>) => {
  const { user, token } = useRoute<RouteProp<ParamList, 'SignupGoogleParams'>>().params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Welcome to E-Tour',
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTintColor: AppColors.white,
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])

  const [userState, setUserState] = React.useState<User>(user)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleOnPress = async () => {
    if (userState.identity === '') {
      return Toast.show('Please enter your ID/Passport number', {
        position: Toast.positions.CENTER,
      })
    }
    setLoading(true)
    try {
      const res = await signUpWithGoogle(userState, token)
      if (res) {
        navigation.navigate(ROUTES.APP_PROVIDER)
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.APP_PROVIDER }],
        })
      }
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: AppFonts.semiBold,
          textAlign: 'center',
          fontSize: AppFontSizes.medium,
          marginVertical: 20,
          color: AppColors.primary,
        }}
      >
        One more step to use our app
      </Text>

      <View
        style={{
          gap: 20,
        }}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <InputWithDynamicLabel
            inputProps={{
              placeholder: 'Enter your ID/Passport number',
              keyboardType: 'number-pad',
              'aria-label': 'ID/Passport number',
              onChangeText: (text) => setUserState({ ...userState, identity: text }),
              value: userState.identity,
            }}
          />
          <CustomAlert
            message="Please enter your ID/Passport number"
            variant="error"
            visible={userState.identity === ''}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.primary,
            paddingVertical: 16,
            borderRadius: 6,
            opacity: loading ? 0.5 : 1,
          }}
          disabled={loading}
          onPress={handleOnPress}
        >
          {!loading ? (
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                textAlign: 'center',
                color: AppColors.white,
              }}
            >
              Submit
            </Text>
          ) : (
            <ActivityIndicator color={AppColors.white} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupGoogle