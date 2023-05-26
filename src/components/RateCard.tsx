import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { avatarStorage, imageStorage } from '@lib/converter'
import { Ticket } from '@schema/User/Ticket'
import { Rate } from '@schema/User/Rate'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { Rating } from 'react-native-ratings'
import moment from 'moment'
import { AppColors } from '@assets/themes/colors'

const RateCard = (props: Rate) => {
  const { userId: user } = props
  const { width, height } = useWindowDimensions()
  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        borderColor: AppColors.gray,
        borderWidth: 0.5,
        borderRadius: 6,
        alignSelf: 'flex-start',
        maxWidth: width - 40,
      }}
    >
      <Image
        source={{ uri: avatarStorage(user?.image || ''), width: 60, height: 60 }}
        style={{
          flex: 2,
          borderRadius: 6,
        }}
      />
      <View
        style={{
          flex: 10,
          gap: 10,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: AppFonts.extraBold,
              }}
            >
              {user?.fullName}
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.small,
                color: AppColors.gray,
              }}
            >
              {moment(props.createdAt).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
          <Rating startingValue={props.star} readonly imageSize={12} />
        </View>
        <Text
          style={{
            fontFamily: AppFonts.regular,
          }}
        >
          {props.description}
        </Text>
      </View>
    </View>
  )
}

export default RateCard
