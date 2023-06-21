import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteProp, useRoute } from '@react-navigation/core'
import { CalendarOutline, PhoneRingOutline } from '@assets/themes/icons/outline'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { toDot } from '@lib/converter'
import { ROUTES } from '@constants/route'
import { Tour } from '@schema/Company/Tour'
import { UserContext } from '@context/UserContext'
import { ITicketVisitor } from '@schema/User/Ticket'

type ParamList = {
  TicketParams: {
    date: Date | string
    tour: Tour
  }
}

const Quantity = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'TicketParams'>>().params
  const { date, tour } = params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.medium,
      },
      headerTintColor: 'white',
      title: tour.name || 'Ticket',
    })
  }, [])
  const { setVisitors } = React.useContext(UserContext)
  const [quantity, setQuantity] = React.useState(1)

  const handleOnPressContinue = React.useCallback(() => {
    setVisitors(Array(quantity - 1).fill({} as ITicketVisitor))
    navigation.navigate(ROUTES.TICKET_FILL_INFO, {
      quantity,
      tour,
      date,
    })
  }, [quantity, date])

  return (
    <>
      <ScrollView>
        <View
          style={{
            padding: 20,
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: AppColors.white,
              elevation: 5,
              padding: 10,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
              }}
            >
              Chosen date
            </Text>
            <View
              style={{
                borderBottomColor: AppColors.gray,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.medium,
                }}
              >
                {date.toString()}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: AppColors.white,
              elevation: 5,
              borderRadius: 6,
              marginBottom: 10,
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
                {tour.name || 'No given name'}
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
                    {date.toString()}
                  </Text>
                </Text>
              </View>
              <View style={styles.labelIcon}>
                <PhoneRingOutline color={AppColors.success} />
                <Text
                  style={{ ...styles.text, fontSize: AppFontSizes.small, color: AppColors.success }}
                >
                  No need to book
                </Text>
              </View>
              {/* <TouchableOpacity>
            <Text style={{ fontFamily: AppFonts.semiBold, color: AppColors.lightRed }}>
              View details
            </Text>
          </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              backgroundColor: AppColors.white,
              elevation: 5,
              borderRadius: 6,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Chooose quantity
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  width: 100,
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: quantity === 0 ? '#D9D9D9' : '#FFB4AB',
                    opacity: quantity === 0 ? 0 : 1,
                  }}
                  disabled={quantity === 0}
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity((prev) => prev - 1)
                    }
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.semiBold,
                      color: quantity === 0 ? AppColors.gray : AppColors.lightRed,
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text>{quantity}</Text>
                <TouchableOpacity
                  disabled={quantity === 20}
                  style={{
                    ...styles.button,
                    backgroundColor: AppColors.light,
                    opacity: quantity === 20 ? 0 : 1,
                  }}
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.semiBold,
                      color: AppColors.blue,
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          // alignSelf: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: AppColors.white,
          zIndex: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: AppFonts.regular,
              color: AppColors.gray,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontFamily: AppFonts.bold,
              color: AppColors.lightRed,
              fontSize: AppFontSizes.h4,
            }}
          >
            VND {toDot((tour.price || 0) * quantity)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.blue,
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6,
          }}
          onPress={handleOnPressContinue}
        >
          <Text
            style={{
              fontFamily: AppFonts.bold,
              color: AppColors.white,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={AppColors.lightRed} />
    </>
  )
}

export default Quantity

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
  button: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
