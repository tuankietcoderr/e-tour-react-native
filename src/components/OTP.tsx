import { AppColors } from '@assets/themes/colors'
import { AppFontSizes } from '@assets/themes/font'
import { MAX_PIN_LENGTH } from '@constants/global'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import OtpInputs from 'react-native-otp-inputs'

interface OTPProps {
  otp?: string
  setOtp: (otp: string) => void
}

const OTP = ({ otp, setOtp, ...props }: OTPProps) => {
  return (
    <View style={styles.container}>
      <OtpInputs
        inputContainerStyles={{ height: 52, justifyContent: 'center', alignItems: 'center' }}
        inputStyles={{
          color: 'black',
          backgroundColor: AppColors.white,
          height: 50,
          width: 50,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: AppFontSizes.body,
        }}
        focusStyles={{
          borderColor: AppColors.primary,
          borderRadius: 10,
          borderWidth: 1,
        }}
        handleChange={(code) => setOtp(code)}
        numberOfInputs={MAX_PIN_LENGTH}
        autofillFromClipboard={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
})

export default OTP
