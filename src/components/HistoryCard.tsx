import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { CalendarOutline, UserIconOutline } from '@assets/themes/icons/outline'
import CarIcon from '@assets/themes/icons/outline/CarIcon'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import MoneyIcon from '@assets/themes/icons/outline/MoneyIcon'
import { ROUTES } from '@constants/route'
import { toDot } from '@lib/converter'
import { useNavigation } from '@react-navigation/core'
import { PaymentStatus, Ticket } from '@schema/User/Ticket'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import ImageSlider from './ImageSlider'

const HistoryCard = (props: Ticket) => {
  const {
    visitors,
    createdAt,
    status,
    fullName,
    pickupLocation,
    price,
    tourId: tour,
    specialRequirement,
  } = props
  const { touristRoute } = tour
  const { width, height } = useWindowDimensions()
  const navigation = useNavigation<any>()
  const onPressRate = React.useCallback(() => {
    navigation.navigate(ROUTES.BOOKING_HISTORY_DETAIL, { ticket: props })
  }, [])

  const onPressCheckIn = React.useCallback(() => {
    navigation.navigate(ROUTES.BOOKING_HISTORY_DETAIL, { ticket: props })
  }, [])

  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        borderRadius: 6,
        elevation: 5,
      }}
    >
      <View>
        <ImageSlider
          images={touristRoute?.images.slice(0, 1)}
          width={width - 40}
          autoplay
          duration={4000}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: AppFontSizes.body,
            fontFamily: AppFonts.semiBold,
            flex: 5,
          }}
        >
          {touristRoute?.name}
        </Text>
        <View
          style={{
            ...styles.iconAndText,
          }}
        >
          <MoneyIcon viewBox="0 0 10 10" width={12} height={12} />
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              flex: 2,
              justifyContent: 'flex-end',
            }}
          >
            {toDot(price || 0)} VND
          </Text>
        </View>
        <View
          style={{
            ...styles.iconAndText,
          }}
        >
          <MarkerIcon viewBox="0 0 24 24" width={12} height={12} />
          <Text style={styles.text}>{touristRoute?.route.join(' - ')}</Text>
        </View>
        <View
          style={{
            ...styles.iconAndText,
          }}
        >
          <CarIcon viewBox="0 0 24 24" width={12} height={12} />
          <Text style={styles.text}>{pickupLocation || 'No pickup location'}</Text>
        </View>
        <View
          style={{
            ...styles.iconAndText,
          }}
        >
          <UserIconOutline viewBox="0 0 12 12" width={12} height={12} />
          <Text style={styles.text}>{visitors.length}</Text>
        </View>
        <View
          style={{
            ...styles.iconAndText,
          }}
        >
          <CalendarOutline viewBox="0 0 12 12" width={12} height={12} />
          <Text
            style={{
              ...styles.text,
            }}
          >
            You have booked this ticket on{' '}
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
              }}
              numberOfLines={2}
            >
              {moment(createdAt).fromNow()}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: status === PaymentStatus.PENDING ? AppColors.blue : AppColors.lightRed,
            paddingVertical: 16,
            marginTop: 10,
            borderRadius: 6,
          }}
          onPress={status === PaymentStatus.CHECKED_OUT ? onPressCheckIn : onPressRate}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              textAlign: 'center',
              color: AppColors.white,
            }}
          >
            {status === PaymentStatus.PENDING ? 'Check in' : 'Rate'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontFamily: AppFonts.regular,
  },
})
