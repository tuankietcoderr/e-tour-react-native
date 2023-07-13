import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { BellIcon } from '@assets/themes/icons/outline'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import useNotification from '@hooks/socket/useNotification'
import { avatarStorage, imageStorage } from '@lib/converter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'

const Profile = ({ navigation }: NativeStackScreenProps<any>) => {
  const { data: notification } = useNotification()
  const numberOfNotification = notification?.filter((n) => !n.isRead).length || 0
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Profile',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.NOTIFICATION)}
          style={{
            justifyContent: 'center',
          }}
        >
          <BellIcon viewBox="0 0 20 20" width={26} height={26} color={AppColors.white} />
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: AppColors.red,
              position: 'absolute',
              top: -2,
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
      ),
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTintColor: AppColors.white,
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])
  const { user } = React.useContext(UserContext)
  if (!user)
    return (
      <ActivityIndicator
        style={{
          marginTop: StatusBar.currentHeight,
        }}
        size={'large'}
        color={AppColors.primary}
      />
    )
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
      }}
    >
      <View
        style={{
          backgroundColor: AppColors.white,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          elevation: 5,
        }}
      >
        <View>
          <View
            style={{
              elevation: 10,
              backgroundColor: AppColors.white,
              alignSelf: 'flex-start',
              borderRadius: 6,
              transform: [{ translateY: -40 }],
            }}
          >
            <Image
              source={{
                uri: avatarStorage(user?.image || ''),
                width: 80,
                height: 80,
              }}
              style={{
                borderRadius: 6,
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
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.medium,
              }}
            >
              {user.fullName}
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              Address: <Text style={styles.textSemibold}>{user.address}</Text>
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              Phone:{' '}
              <Text style={styles.textSemibold}>{user.phoneNumber || 'No phone number yet'}</Text>
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              Email: <Text style={styles.textSemibold}>{user.email}</Text>
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              ID: <Text style={styles.textSemibold}>{user.identity}</Text>
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              Join on <Text style={styles.textSemibold}>{moment(user.createdAt).format('ll')}</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.secondary,
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 100,
            position: 'absolute',
            right: 20,
            top: 20,
          }}
          onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
            }}
          >
            Edit profile
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={AppColors.primary} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.regular,
    color: AppColors.gray,
  },
  textSemibold: {
    fontFamily: AppFonts.semiBold,
    color: AppColors.dark,
  },
})
