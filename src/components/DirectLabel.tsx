import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { AngleRightIcon } from '@assets/themes/icons/outline'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { useNavigation } from '@react-navigation/core'

export interface DirectLabelProps {
  title: string
  color?: string
  showLeftBorder?: boolean
  showAngle?: boolean
  to?: string
  style?: ViewStyle
}

const DirectLabel = ({
  color = AppColors.primary,
  showLeftBorder = true,
  showAngle = true,
  ...props
}: DirectLabelProps) => {
  const navigation = useNavigation()
  const handleOnPress = () => {
    if (props.to) {
      navigation.navigate(props.to as never)
    }
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        ...props.style,
      }}
      onPress={handleOnPress}
      disabled={!props.to}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          flex: 3,
        }}
      >
        {showLeftBorder && (
          <View
            style={{
              backgroundColor: color,
              width: 4,
              height: 24,
            }}
          />
        )}
        <Text
          style={{
            color: color,
            fontSize: AppFontSizes.h3 - 6,
            fontFamily: AppFonts.extraBold,
          }}
          numberOfLines={1}
        >
          {props.title}
        </Text>
      </View>
      {showAngle && (
        <AngleRightIcon
          color={color}
          style={{
            flex: 1,
          }}
          viewBox="0 0 16 16"
          width={20}
          height={20}
        />
      )}
    </TouchableOpacity>
  )
}

export default DirectLabel
