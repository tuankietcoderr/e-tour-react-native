import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import SecondaryTopBar from '@components/SecondaryTopBar'
import { AppColors } from '@assets/themes/colors'

const HotVouchers = () => {
  return (
    <View>
      <SecondaryTopBar title="Hot vouchers" backgroundColor={AppColors.lightRed} />
    </View>
  )
}

export default HotVouchers
