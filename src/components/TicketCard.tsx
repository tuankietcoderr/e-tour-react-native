import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { CalendarOutline, PhoneRingOutline } from '@assets/themes/icons/outline'
import { AppColors } from '@assets/themes/colors'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@constants/route'
import { Tour } from '@schema/Company/Tour'
import moment from 'moment'
import { toDot } from '@lib/converter'
import Toast from 'react-native-root-toast'

interface ITicketCardProps {
  tour: Tour
  date: string // Date string
  from: Date
  to: Date
}

const TicketCard = (props: ITicketCardProps) => {
  const navigation = useNavigation<any>()
  const { tour, from, to, date } = props
  const isRender =
    new Date(from).getTime() <= new Date(date || new Date()).getTime() &&
    new Date(to).getTime() >= new Date(date || new Date()).getTime()
  const handleOnPressBooking = () => {
    // ! Uncomment this to enable date validation
    // if (!isRender) {
    //   return Toast.show('This ticket is not available on this date', {
    //     position: Toast.positions.BOTTOM,
    //     backgroundColor: AppColors.red,
    //   })
    // }
    navigation.navigate(ROUTES.TICKET_QUANTITY, { ...props })
  }

  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        elevation: 5,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: AppFontSizes.body,
            fontFamily: AppFonts.semiBold,
          }}
        >
          {props.tour?.name || 'No given name'}
        </Text>
        <View style={styles.labelIcon}>
          <CalendarOutline />
          <Text style={{ ...styles.text, fontSize: AppFontSizes.small }}>
            Use on{' '}
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              {' '}
              chosen date (from {moment(props.tour.from).format('MMM Do YYYY')} to{' '}
              {moment(props.tour.to).format('MMM Do YYYY')})
            </Text>
          </Text>
        </View>
        <View style={styles.labelIcon}>
          <PhoneRingOutline color={AppColors.success} />
          <Text style={{ ...styles.text, fontSize: AppFontSizes.small, color: AppColors.success }}>
            No need to book
          </Text>
        </View>
        {/* <TouchableOpacity>
          <Text
            style={{ ...styles.text, fontFamily: AppFonts.semiBold, color: AppColors.lightRed }}
          >
            View details
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: AppColors.gray,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <Text style={{ ...styles.text, color: AppColors.lightRed, fontFamily: AppFonts.semiBold }}>
          VND {toDot(props.tour?.price || 0)}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.blue,
            paddingHorizontal: 20,
            paddingVertical: 6,
            borderRadius: 6,
            // opacity: isRender ? 1 : 0.7,
          }}
          onPress={handleOnPressBooking}
        >
          <Text
            style={{
              ...styles.text,
              color: AppColors.white,
              fontSize: AppFontSizes.normal,
              fontFamily: AppFonts.semiBold,
            }}
          >
            {'Book'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TicketCard

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.normal,
  },
  labelIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
})
