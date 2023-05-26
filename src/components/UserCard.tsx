import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import { BASE_IMAGES_URL } from '@utils/server'
import { avatarStorage, imageStorage } from '@lib/converter'

const UserCard = ({ navigation }) => {
  const { user } = React.useContext(UserContext)
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: AppColors.white,
        borderRadius: 6,
        gap: 16,
        borderWidth: 1,
        borderColor: AppColors.gray,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            elevation: 2,
            borderRadius: 20,
          }}
        >
          <Image
            source={{
              uri: avatarStorage(user?.image || ''),
              width: 80,
              height: 80,
            }}
            style={{
              borderRadius: 20,
            }}
          />
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              textTransform: 'capitalize',
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.body,
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontFamily: AppFonts.light,
              color: AppColors.gray,
            }}
          >
            Sign in using Google
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 6,
          backgroundColor: AppColors.secondary,
          paddingVertical: 10,
        }}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            textAlign: 'center',
            color: AppColors.white,
            fontSize: AppFontSizes.normal,
          }}
        >
          View profile
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserCard
