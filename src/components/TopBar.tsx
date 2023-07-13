import { View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { BellIcon, SearchIcon } from '@assets/themes/icons/outline'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@constants/route'
import useNotification from '@hooks/socket/useNotification'

const TopBar = () => {
  // get dimensions

  const { width, height } = Dimensions.get('window')
  const navigation = useNavigation()
  const { data: notification } = useNotification()
  const numberOfNotification = notification
    ? (notification?.filter((n) => !n.isRead) || []).length
    : 0
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        backgroundColor: AppColors.primary,
        // alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
        gap: 10,
      }}
    >
      <View>
        <Image
          source={require('@assets/icon-transparent.png')}
          style={{ width: 40, flex: 1 }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: AppColors.white,
          flex: 1,
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 6,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate(ROUTES.SEARCH as never)}
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
            flex: 5,
            fontFamily: AppFonts.regular,
            fontSize: AppFontSizes.body,
          }}
          placeholder="Discover new experiences"
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate(ROUTES.NOTIFICATION as never)}
      >
        <BellIcon width={26} height={26} color={AppColors.white} viewBox="0 0 20 20" />
        <View
          style={{
            width: 16,
            height: 16,
            backgroundColor: AppColors.red,
            position: 'absolute',
            top: 2,
            right: -2,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            display: numberOfNotification > 0 ? 'flex' : 'none',
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.small,
              color: AppColors.white,
            }}
          >
            {numberOfNotification > 9 ? '9+' : numberOfNotification}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TopBar
