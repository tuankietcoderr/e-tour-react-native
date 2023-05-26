import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { AppColors } from '@assets/themes/colors'
import { AngleRightIcon } from '@assets/themes/icons/outline'
import { AppFonts, AppFontSizes } from '@assets/themes/font'

export interface ILinkCard {
  showIcon?: boolean
  showShadow?: boolean
  subtitle?: string
  title: string | JSX.Element | ReactNode
  icon?: JSX.Element | ReactNode
  style?: StyleProp<ViewStyle>
  showBorder?: boolean
  onPress?: () => void
}

const LinkCard = ({
  showIcon = true,
  showShadow = true,
  showBorder = false,
  ...props
}: ILinkCard) => {
  const { subtitle, title, icon } = props
  const Icon: JSX.Element | ReactNode = icon || <></>
  return (
    <TouchableOpacity
      style={[
        {
          elevation: showShadow ? 5 : 0,
          backgroundColor: AppColors.white,
          borderRadius: 6,
          paddingVertical: 16,
          paddingHorizontal: 10,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: showBorder ? 1 : 0,
          borderColor: AppColors.gray,
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <View>{showIcon && Icon}</View>
        <View>
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.body,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.small,
                color: AppColors.gray,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <AngleRightIcon color={AppColors.gray} viewBox="0 0 16 16" width={16} height={16} />
    </TouchableOpacity>
  )
}

export default LinkCard
