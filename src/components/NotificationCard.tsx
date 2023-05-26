import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Notification } from '@schema/User/Notification'
import { imageStorage } from '@lib/converter'
import { AppColors } from '@assets/themes/colors'
import moment from 'moment'
import { AppFontSizes, AppFonts } from '@assets/themes/font'

type Props = {
  notification: Notification
  onPress: () => void
}

const NotificationCard = (props: Props) => {
  const { notification, onPress } = props
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: AppColors.white,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: AppColors.gray,
        opacity: notification.isRead ? 0.7 : 1,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 20,
          height: 20,
          zIndex: 2,
          backgroundColor: AppColors.red,
          position: 'absolute',
          right: -10,
          top: -10,
          borderRadius: 100,
          display: notification.isRead ? 'none' : 'flex',
        }}
      />
      <Image
        source={{ uri: imageStorage(notification.image || '') }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 6,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          ...styles.text,
          fontSize: AppFontSizes.medium,
          fontFamily: AppFonts.extraBold,
          marginVertical: 10,
        }}
      >
        {notification.title}
      </Text>
      <Text style={{ ...styles.text, paddingBottom: 10 }}>{notification.content}</Text>
      <Text
        style={{
          ...styles.text,
          fontSize: AppFontSizes.small,
          color: AppColors.gray,
          alignSelf: 'flex-end',
        }}
      >
        {moment(notification.createdAt || new Date()).format('DD-MM-YYYY HH:MM A')}
      </Text>
      <Text
        style={{
          ...styles.text,
          fontSize: AppFontSizes.small,
          color: notification.isRead ? AppColors.gray : AppColors.primary,
          alignSelf: 'flex-end',
          fontFamily: notification.isRead ? AppFonts.regular : AppFonts.semiBold,
        }}
      >
        {notification.isRead ? 'Read' : 'Unread'}
      </Text>
    </TouchableOpacity>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.regular,
  },
})
