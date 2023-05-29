import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AngleRightIcon, EyeIcon, EyeIconCrossed } from '@assets/themes/icons/outline'
import CustomAlert from '@components/CustomAlert'
import InputWithDynamicLable from '@components/InputWithDynamicLabel'
import { ROUTES } from '@constants/route'
import { SignUpContext } from '@context/SignUpContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthenticationType, Credential, UserType } from '@schema/Credential'
import { User } from '@schema/User/User'
import { useAppDispatch } from '@store/hooks'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'

interface ICredential {
  username: string
  password: string
  confirmPassword: string
}

const SignUp = ({ navigation }: NativeStackScreenProps<any>) => {
  const { signUpForm, setSignUpForm } = React.useContext(SignUpContext)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)
  const [error, setError] = React.useState({
    username: false,
    password: false,
    confirmPassword: false,
    samePassword: true,
  })
  const [credential, setCredential] = React.useState<ICredential>({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const onInputChange = (key: keyof ICredential, value: string) => {
    setCredential((prev) => ({ ...prev, [key]: value }))
  }

  const onBlur = (key: keyof ICredential) => {
    if (!credential[key]) {
      setError((prev) => ({ ...prev, [key]: true }))
    } else {
      setError((prev) => ({ ...prev, [key]: false }))
    }
    if (key === 'confirmPassword') {
      if (credential.password !== credential.confirmPassword) {
        setError((prev) => ({ ...prev, samePassword: false }))
      } else {
        setError((prev) => ({ ...prev, samePassword: true }))
      }
    }
  }

  const handlePressNext = () => {
    // **! VALIDATE FORM ** //
    if (!credential.username && !credential.password && !credential.confirmPassword) {
      return setError((prev) => ({
        ...prev,
        username: true,
        password: true,
        confirmPassword: true,
      }))
    }
    if (!credential.username.length) {
      return setError((prev) => ({ ...prev, username: true }))
    }
    if (!credential.password.length) {
      return setError((prev) => ({ ...prev, password: true }))
    }
    // **! END VALIDATE FORM ** //
    setSignUpForm({
      ...signUpForm,
      credential: {
        ...credential,
        authenticationType: AuthenticationType.PASSWORD,
        userType: UserType.CLIENT,
      },
    })
    navigation.navigate(ROUTES.NEXT_SIGNUP)
  }
  const { height } = useWindowDimensions()

  const canNext =
    credential.confirmPassword.length > 0 &&
    credential.password.length > 0 &&
    credential.username.length > 0 &&
    error.samePassword

  return (
    <ScrollView>
      <View style={[styles.container, { height }]}>
        <View
          style={{
            width: '100%',
            gap: 25,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                zIndex: 1,
              }}
              onPress={() => navigation.goBack()}
            >
              <AngleRightIcon
                style={{
                  transform: [{ rotate: '180deg' }],
                }}
                width={30}
                height={30}
                fill={AppColors.white}
                viewBox="0 0 20 20"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: AppFonts.extraBold,
                fontSize: AppFontSizes.h2,
                color: AppColors.primary,
              }}
            >
              Sign Up
            </Text>
          </View>
          <View>
            <InputWithDynamicLable
              wrapperStyle={{
                borderColor: error.username ? AppColors.red : AppColors.gray,
                borderWidth: 1,
              }}
              inputProps={{
                placeholder: 'Enter your username',
                autoFocus: true,
                'aria-label': 'Username',
                autoComplete: 'username',
                onChangeText: (value) => onInputChange('username', value),
                onBlur: () => onBlur('username'),
                value: credential.username,
              }}
            />
            <CustomAlert
              message="Please enter your username"
              visible={error.username}
              variant="error"
            />
          </View>
          <View>
            <InputWithDynamicLable
              wrapperStyle={{
                borderColor: error.password ? AppColors.red : AppColors.gray,
                borderWidth: 1,
              }}
              inputProps={{
                secureTextEntry: !showPassword,
                placeholder: 'Enter your password',
                autoComplete: 'off',
                'aria-label': 'Password',
                // keyboardType: 'visible-password',
                onChangeText: (value) => onInputChange('password', value),
                onBlur: () => onBlur('password'),
                value: credential.password,
              }}
              wrapChildren={
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
                    <EyeIcon width={24} height={24} viewBox={'0 0 24 24'} color={AppColors.white} />
                  ) : (
                    <EyeIconCrossed
                      width={24}
                      height={24}
                      viewBox={'0 0 24 24'}
                      color={AppColors.white}
                    />
                  )}
                </TouchableOpacity>
              }
            />
            <CustomAlert
              message="Please enter your password"
              visible={error.password}
              variant="error"
            />
          </View>
          <View>
            <InputWithDynamicLable
              wrapperStyle={{
                borderColor: error.confirmPassword ? AppColors.red : AppColors.gray,
                borderWidth: 1,
              }}
              inputProps={{
                secureTextEntry: !showConfirmPassword,
                placeholder: 'Re-enter your password',
                autoComplete: 'off',
                'aria-label': 'Confirm password',
                // keyboardType: 'visible-password',
                onChangeText: (value) => onInputChange('confirmPassword', value),
                onBlur: () => onBlur('confirmPassword'),
                value: credential.confirmPassword,
              }}
              wrapChildren={
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 10,
                    justifyContent: 'center',
                  }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeIcon width={24} height={24} viewBox={'0 0 24 24'} color={AppColors.white} />
                  ) : (
                    <EyeIconCrossed
                      width={24}
                      height={24}
                      viewBox={'0 0 24 24'}
                      color={AppColors.white}
                    />
                  )}
                </TouchableOpacity>
              }
            />
            <CustomAlert
              message="Please confirm your password"
              visible={error.confirmPassword}
              variant="error"
            />
            <CustomAlert
              message="Password doesn't match"
              visible={!error.samePassword}
              variant="error"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.primary,
            height: 50,
            justifyContent: 'center',
            borderRadius: 6,
            opacity: canNext ? 1 : 0.5,
          }}
          disabled={!canNext}
          onPress={handlePressNext}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.body,
              textAlign: 'center',
              color: AppColors.white,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 30,
    gap: 60,
    backgroundColor: AppColors.white,
  },
  inputContainer: {
    width: '100%',
    // height: 50,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: AppColors.gray,
    borderWidth: 1,
    paddingVertical: 5,
  },
  label: {
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.small,
    color: AppColors.primary,
  },
  input: {
    color: AppColors.white,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
  },
})