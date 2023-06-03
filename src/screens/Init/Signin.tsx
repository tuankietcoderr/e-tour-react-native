import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { EyeIcon, EyeIconCrossed, GoogleIcon } from '@assets/themes/icons/outline'
import CustomAlert from '@components/CustomAlert'
import { ROUTES } from '@constants/route'
import useGoogleSignIn from '@hooks/services/useGoogleSignIn'
import { useNavigation } from '@react-navigation/core'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { User } from '@schema/User/User'
import { signIn, signInWithGoogle, signUpWithGoogle } from '@services/auth'
import { useAppDispatch } from '@store/hooks'
import React from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import Toast from 'react-native-root-toast'
interface ISignin {
  username: string
  password: string
}

const Signin = ({ navigation }: NativeStackScreenProps<any>) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [form, setForm] = React.useState<ISignin>({
    username: '',
    password: '',
  })

  const [error, setError] = React.useState({
    username: false,
    password: false,
  })

  const [loading, setLoading] = React.useState(false)

  const dispatch = useAppDispatch()

  const onInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onBlur = (key: any) => {
    if (!form[key as keyof ISignin]) {
      setError((prev) => ({ ...prev, [key]: true }))
    } else {
      setError((prev) => ({ ...prev, [key]: false }))
    }
  }

  const handleSignIn = async () => {
    // **! VALIDATE FORM ** //
    if (!form.username && !form.password) {
      return setError((prev) => ({ ...prev, username: true, password: true }))
    }
    if (!form.username) {
      return setError((prev) => ({ ...prev, username: true }))
    }
    if (!form.password) {
      return setError((prev) => ({ ...prev, password: true }))
    }
    // **! END VALIDATE FORM ** //
    // ** SIGN IN ** //
    setLoading(true)
    await signIn(form.username, form.password)
      .then((res) => res.data)
      .then(async (res) => {
        const {
          tokens,
          user: { _id },
        } = res
        navigation.navigate(ROUTES.APP_PROVIDER)
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.APP_PROVIDER }],
        })
      })
      .catch((err) => {
        Alert.alert('Login failed', err.response?.data?.message || "Can't connect to server")
      })
      .finally(() => {
        setLoading(false)
      })
    // navigation.navigate('AppProvider')
    // ** END SIGN IN ** //
  }

  const { height } = useWindowDimensions()

  return (
    <ScrollView
      style={{
        backgroundColor: AppColors.white,
      }}
    >
      <View
        style={{
          minHeight: height,
          backgroundColor: AppColors.white,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: AppFontSizes.h2,
            color: AppColors.primary,
            fontFamily: AppFonts.extraBold,
            textAlign: 'center',
          }}
        >
          Sign In
        </Text>
        <View
          style={{
            gap: 20,
            width: '100%',
            paddingHorizontal: 20,
          }}
        >
          <View>
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <TextInput
                onBlur={() => onBlur('username')}
                style={[
                  styles.input,
                  {
                    borderColor: error.username ? AppColors.red : AppColors.gray,
                  },
                ]}
                placeholder="Username"
                autoComplete="username"
                key="username"
                onChangeText={(value) => onInputChange('username', value)}
              />
              <CustomAlert
                visible={error.username}
                message="Please enter your username"
                variant="error"
              />
            </View>

            <View
              style={{
                position: 'relative',
              }}
            >
              <TextInput
                onBlur={() => onBlur('password')}
                style={[
                  styles.input,
                  {
                    borderColor: error.password ? AppColors.red : AppColors.gray,
                  },
                ]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoComplete="password"
                keyboardType="default"
                onChangeText={(value) => onInputChange('password', value)}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 10,
                  justifyContent: 'center',
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon width={24} height={24} viewBox={'0 0 24 24'} />
                ) : (
                  <EyeIconCrossed width={24} height={24} viewBox={'0 0 24 24'} />
                )}
              </TouchableOpacity>
            </View>
            <CustomAlert
              visible={error.password}
              message="Please enter your password"
              variant="error"
            />
          </View>
          {/* <TouchableOpacity>
            <Text
              style={{
                fontSize: AppFontSizes.body,
                color: AppColors.primary,
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
                fontFamily: AppFonts.semiBold,
                alignSelf: 'flex-end',
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.primary,
              borderRadius: 6,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              opacity:
                loading || form.password.length === 0 || form.username.length === 0 ? 0.5 : 1,
            }}
            onPress={handleSignIn}
            disabled={loading || form.password.length === 0 || form.username.length === 0}
          >
            {!loading ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: AppFontSizes.body,
                  color: AppColors.white,
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Let's go
              </Text>
            ) : (
              <ActivityIndicator size={'small'} />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.body,
              }}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  color: AppColors.primary,
                  fontFamily: AppFonts.semiBold,
                  fontSize: AppFontSizes.body,
                }}
              >
                Sign up here
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.body,
              color: AppColors.white,
            }}
          >
            or
          </Text>
          <GoogleSignIn />
        </View>
      </View>
    </ScrollView>
  )
}

export default Signin

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppColors.white,
    width: '100%',
    height: 50,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
  },
})

const GoogleSignIn = () => {
  const { onGoogleButtonPress, setToken } = useGoogleSignIn()
  const navigation = useNavigation<any>()
  const [trigger, setTrigger] = React.useState(false)
  const handleOnPress = async () => {
    try {
      setTrigger(true)
      const { user } = await onGoogleButtonPress()
      const userSent: User = {
        fullName: user?.displayName || '',
        email: user?.email || '',
        isForeigner: false,
      }
      const token = await user.getIdToken()
      setToken(token)
      await signInWithGoogle(token as string)
        .then(() => {
          navigation.navigate(ROUTES.APP_PROVIDER)
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.APP_PROVIDER }],
          })
        })
        .catch((err) => {
          const message = err.response.data.message
          if (message === 'User not found') {
            navigation.navigate(ROUTES.SIGNUP_GOOGLE, { user: userSent, token })
          } else {
            Toast.show(message, {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              backgroundColor: AppColors.red,
            })
          }
        })
    } catch (err) {
    } finally {
      setTrigger(false)
    }
  }
  return (
    <TouchableOpacity
      disabled={trigger}
      style={{
        opacity: trigger ? 0.5 : 1,
      }}
      onPress={handleOnPress}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          backgroundColor: AppColors.white,
          borderColor: AppColors.primary,
          borderWidth: 0.5,
          height: 50,
          alignItems: 'center',
          borderRadius: 6,
        }}
      >
        {trigger ? (
          <ActivityIndicator />
        ) : (
          <>
            <GoogleIcon width={24} height={24} viewBox={'0 0 20 20'} color={AppColors.tertiary} />
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.body,
              }}
            >
              Sign in with Google
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}