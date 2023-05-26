import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { ArrowRightIcon, BookmarkIconOutline, SearchIcon } from '@assets/themes/icons/outline'
import { ROUTES } from '@constants/route'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StatusBar, StatusBarStyle, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface Props {
  title?: string
  showSearch?: boolean
  backgroundColor?: string
  color?: string
  statusBarStyle?: StatusBarStyle
}

const SecondaryTopBar = ({
  showSearch = false,
  backgroundColor = AppColors.primary,
  color = '#fff',
  statusBarStyle = 'light-content',
  ...props
}: Props) => {
  const navigation = useNavigation()
  return (
    <>
      <View
        style={{
          backgroundColor,
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 20,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: showSearch ? 0 : 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
            <ArrowRightIcon
              style={{
                transform: [{ rotate: '180deg' }],
                padding: 10,
              }}
              color={color}
              viewBox="0 0 20 20"
              width={24}
              height={24}
            />
          </TouchableOpacity>
          {props.title && (
            <Text
              style={{
                color,
                fontFamily: AppFonts.bold,
                fontSize: AppFontSizes.medium,
              }}
            >
              {props.title}
            </Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SAVED as never)}>
            <BookmarkIconOutline
              color={color}
              viewBox="0 0 13 13"
              width={24}
              height={24}
              style={{
                padding: 10,
                opacity: 0,
              }}
            />
          </TouchableOpacity>
        </View>
        {showSearch && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: AppColors.white,
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            <SearchIcon
              width={20}
              height={20}
              color={AppColors.gray}
              style={{
                flex: 1,
                alignSelf: 'center',
              }}
              viewBox="0 0 14 14"
            />
            <TextInput
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.body,
              }}
              placeholder={`Discover new experiences in ${props.title}`}
              aria-disabled={true}
            />
          </View>
        )}
      </View>
      <StatusBar backgroundColor={backgroundColor} barStyle={statusBarStyle} animated />
    </>
  )
}

export default SecondaryTopBar
