import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { EyeIcon, EyeIconCrossed } from '@assets/themes/icons/outline'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import moment from 'moment'
import { LinearGradient } from 'expo-linear-gradient'
import { CreditCard } from '@schema/User/Card'

const Icons = {
  cvc: require('@icons/stp_card_cvc.png'),
  cvc_amex: require('@icons/stp_card_cvc_amex.png'),
  'american-express': require('@icons/stp_card_amex.png'),
  'diners-club': require('@icons/stp_card_diners.png'),
  'master-card': require('@icons/stp_card_mastercard.png'),
  discover: require('@icons/stp_card_discover.png'),
  jcb: require('@icons/stp_card_jcb.png'),
  placeholder: require('@icons/stp_card_unknown.png'),
  visa: require('@icons/stp_card_visa.png'),
}

const CardView = ({ cardNumber, cvv, expiredDate, name, type }: CreditCard) => {
  const [hideCVV, setHideCVV] = React.useState(true)
  const onPressHideCVV = () => {
    setHideCVV((prev) => !prev)
  }
  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        padding: 20,
        height: 240,
        borderRadius: 16,
      }}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={[AppColors.blue, AppColors.purple]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.3, y: 0 }}
        style={{
          opacity: 0.6,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          borderRadius: 16,
        }}
      />
      <Image
        source={Icons[type || 'visa']}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      />
      <View
        style={{
          zIndex: 1,
          justifyContent: 'space-evenly',
          height: 240,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: AppColors.white,
            fontFamily: AppFonts.bold,
            fontSize: AppFontSizes.h2,
          }}
        >
          E-Tour
        </Text>
        <Text
          style={{
            color: AppColors.white,
            fontFamily: AppFonts.semiBold,
            fontSize: 28,
          }}
        >
          {cardNumber}
        </Text>
        <Text
          style={{
            color: AppColors.white,
            fontFamily: AppFonts.semiBold,
            fontSize: AppFontSizes.h5,
          }}
        >
          {name?.toUpperCase()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: AppColors.white,
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.normal,
            }}
          >
            VALID UNTIL: {moment(expiredDate).format('MM/YY')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text
              style={{
                color: AppColors.white,
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.normal,
              }}
            >
              CVC/CCV: {!hideCVV ? cvv : '***'}
            </Text>
            <TouchableOpacity
              onPress={onPressHideCVV}
              style={{
                padding: 4,
                backgroundColor: AppColors.white,
                borderRadius: 100,
              }}
            >
              {hideCVV ? (
                <EyeIconCrossed
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  color={AppColors.purple}
                />
              ) : (
                <EyeIcon viewBox="0 0 24 24" width={16} height={16} color={AppColors.purple} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardView
