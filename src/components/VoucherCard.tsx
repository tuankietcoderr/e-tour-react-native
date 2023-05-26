import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { IVoucher, VoucherType } from '@schema/User/Voucher'
import { capitalize, imageStorage, voucherStorage } from '@lib/converter'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@constants/route'

const VoucherCard = (voucher: IVoucher) => {
  const { image, _id, value, name, type } = voucher
  const { width } = useWindowDimensions()
  const navigation = useNavigation<any>()
  const handleOnPress = () => {
    navigation.navigate(ROUTES.VOUCHER_DETAIL, {
      voucher_id: _id,
    })
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        gap: 10,
        backgroundColor: AppColors.white,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: type === VoucherType.DISCOUNT ? AppColors.lightRed : AppColors.success,
        borderRadius: 6,
      }}
      onPress={handleOnPress}
    >
      <Image source={{ uri: voucherStorage(image || ''), width: width / 3, height: width / 3 }} />
      <View
        style={{
          width: 10,
          height: 30,
          position: 'absolute',
          top: -10,
          left: width / 3 + 6,
          backgroundColor: type === VoucherType.DISCOUNT ? AppColors.lightRed : AppColors.success,
          borderRadius: 6,
        }}
      />
      <View
        style={{
          width: 10,
          height: 30,
          position: 'absolute',
          bottom: -10,
          left: width / 3 + 6,
          backgroundColor: type === VoucherType.DISCOUNT ? AppColors.lightRed : AppColors.success,
          borderRadius: 6,
        }}
      />
      <View
        style={{
          alignSelf: 'center',
          gap: 20,
          padding: 10,
          width: width - width / 3 - 20,
          borderLeftWidth: 2,
          borderColor: type === VoucherType.DISCOUNT ? AppColors.lightRed : AppColors.success,
          borderStyle: 'dashed',
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.bold,
            fontSize: AppFontSizes.body,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            color: type === VoucherType.FREE ? AppColors.success : AppColors.lightRed,
          }}
          numberOfLines={2}
        >
          {capitalize(type)} {type === VoucherType.FREE ? '' : `${value * 100}%`}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default VoucherCard
