import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import BookingStep, { steps } from '@components/BookingStep'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { ROUTES } from '@constants/route'
import { RouteProp, useRoute } from '@react-navigation/core'
import { Tour } from '@schema/Company/Tour'
import { toDot } from '@lib/converter'
import { UserContext } from '@context/UserContext'
import moment from 'moment'
import { Ticket } from '@schema/User/Ticket'
import { IVoucher } from '@schema/User/Voucher'

type ParamList = {
  Confirm: {
    bookingResult: Ticket
    vouchers: IVoucher[]
    tour: Tour
    quantity: number
  }
}

const Confirm = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'Confirm'>>().params
  const { bookingResult, vouchers, tour, quantity } = params
  const { createdAt, fullName, phoneNumber, status, price } = bookingResult
  const { information, visitors, pickupLocation, specialRequest } = React.useContext(UserContext)
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Result',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
      headerShadowVisible: false,
    })
  }, [])
  return (
    <ScrollView>
      <View>
        <View
          style={{
            backgroundColor: AppColors.lightRed,
            paddingVertical: 20,
          }}
        >
          <BookingStep steps={steps} currentStep={2} stepsToShow={[1, 2]} />
        </View>
        <View
          style={{
            padding: 20,
            gap: 20,
            backgroundColor: AppColors.white,
          }}
        >
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Total price
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.extraBold,
                fontSize: AppFontSizes.medium,
              }}
            >
              VND {toDot(price || 0)}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                color: AppColors.gray,
              }}
            >
              {tour.name} {quantity} ticket(s)
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.normal,
              }}
            >
              VND {toDot(tour.price || 0)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Vouchers applied
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: AppFontSizes.normal,
              }}
            >
              {vouchers.length > 0
                ? vouchers
                    .map((v) => {
                      return `- ${v.name} (-${toDot((tour.price || 0) * v.value)}VND)`
                    })
                    .join('\n')
                : 'No voucher applied'}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: AppColors.gray,
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              marginVertical: 10,
            }}
          />
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Booking owner
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              {fullName}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Phone number
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              {phoneNumber}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Booking date
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              {moment(createdAt).format('DD/MM/YYYY HH:mm A')}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Pickup location
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              {pickupLocation || 'No given location'}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.gray,
              }}
            >
              Special request
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              {specialRequest || 'No given request'}
            </Text>
          </View>
          {visitors.length > 0 && (
            <View style={styles.contentContainer}>
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  color: AppColors.gray,
                }}
              >
                Guests
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.regular,
                }}
              >
                {visitors.map((v) => `${v.name} (${v.phoneNumber})`).join(', ')}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: AppColors.white,
            paddingVertical: 16,
            alignItems: 'center',
            margin: 20,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: AppColors.lightRed,
          }}
          onPress={() => {
            navigation.navigate(ROUTES.APP_PROVIDER)
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.lightRed,
            }}
          >
            Back to homepage
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Confirm

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
})
