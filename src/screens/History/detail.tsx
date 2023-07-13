import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { StarIconFill } from '@assets/themes/icons/fill'
import ShieldIcon from '@assets/themes/icons/fill/ShieldIcon'
import { CalendarOutline, HeadphoneIcon, UserIconOutline } from '@assets/themes/icons/outline'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import ImageSlider from '@components/ImageSlider'
import LinkCard from '@components/LinkCard'
import { ROUTES } from '@constants/route'
import useTicket from '@hooks/socket/useTicket'
import { rateColorConverter, rateConverter } from '@lib/converter'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ReportType } from '@schema/User/Report'
import { PaymentStatus, Ticket } from '@schema/User/Ticket'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-root-toast'

type ParamList = {
  RateTourParams: {
    ticket: Ticket
  }
}

const HistoryTourDetail = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'RateTourParams'>>().params
  const { ticket } = params
  const {
    tourId: tour,
    specialRequirement,
    pickupLocation,
    totalRating,
    userRating,
    ratingComment,
    visitors,
  } = ticket
  const { width, height } = Dimensions.get('window')
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: tour?.name || 'Loading...',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [tour])
  const { updateTicket, updateResult, error, isError } = useTicket()
  React.useEffect(() => {
    if (isError) {
    }
    if (updateResult) {
      if (updateResult.status === PaymentStatus.CHECKED_OUT) {
        setTicketState((prev) => ({
          ...prev,
          status: PaymentStatus.CHECKED_OUT,
        }))
        Toast.show('Check in successfully', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.success,
        })
      }
    }
  }, [updateResult, isError])
  const [ticketState, setTicketState] = React.useState<Ticket>(ticket)

  const handlePressContactSupport = () => {
    navigation.navigate(ROUTES.CONTACT_SUPPORT_ROOM, { ticket: ticketState })
  }

  const handlePressCheckIn = () => {
    updateTicket({
      ...ticketState,
      status: PaymentStatus.CHECKED_OUT,
    })
  }

  const handlePressReport = () => {
    navigation.navigate(ROUTES.REPORT_TOUR, {
      objectId: ticket.tourId._id,
      reportType: ReportType.TOUR,
    })
  }

  const handlePressDiscard = () => {}

  return (
    <>
      <View
        style={{
          minHeight: height,
        }}
      >
        <ScrollView>
          {tour ? (
            <View
              style={{
                paddingBottom: 200,
                gap: 10,
              }}
            >
              <View>
                <ImageSlider images={[tour.image || '']} autoplay />

                <LinearGradient
                  // Button Linear Gradient
                  colors={['black', 'transparent', 'transparent']}
                  style={{
                    height: 300,
                    opacity: 0.6,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.medium,
                    fontSize: AppFontSizes.h4,
                    marginBottom: 8,
                  }}
                >
                  {tour?.name}
                </Text>

                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                    color: rateColorConverter(totalRating?.rate || 0),
                  }}
                >
                  {totalRating?.rate?.toFixed(2) || 0} {rateConverter(totalRating?.rate || 0)}{' '}
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      color: AppColors.gray,
                      fontSize: AppFontSizes.small,
                    }}
                  >
                    ({totalRating?.num || 0} reviews)
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <MarkerIcon viewBox="0 0 24 24" width={18} height={18} />
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      fontSize: AppFontSizes.normal,
                      marginBottom: 10,
                    }}
                  >
                    {tour?.touristRoute?.route.join(' - ')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <CalendarOutline viewBox="0 0 12 12" width={18} height={18} />
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      fontSize: AppFontSizes.normal,
                      marginBottom: 10,
                    }}
                  >
                    {moment(tour.createdAt).format('MMMM Do YYYY, hh:mm A')}
                  </Text>
                </View>
                <View
                  style={{
                    gap: 20,
                  }}
                >
                  {ticketState.status === PaymentStatus.PENDING && (
                    <>
                      <LinkCard
                        title="Visitors management"
                        icon={<UserIconOutline viewBox="0 0 12 12" width={24} height={24} />}
                        subtitle="Manage visitor information"
                        onPress={() =>
                          navigation.navigate(ROUTES.VISITORS_MANAGEMENT, { ticket: ticketState })
                        }
                        style={{
                          borderColor: AppColors.gray,
                          borderWidth: 1,
                        }}
                        showShadow={false}
                      />
                      <LinkCard
                        title="Contact support"
                        icon={<HeadphoneIcon viewBox="0 0 20 20" width={24} height={24} />}
                        subtitle="Contact our support centre"
                        onPress={handlePressContactSupport}
                        style={{
                          borderColor: AppColors.gray,
                          borderWidth: 1,
                        }}
                        showShadow={false}
                      />
                    </>
                  )}
                  {ticketState.status === PaymentStatus.CHECKED_OUT && (
                    <LinkCard
                      title="Rate"
                      subtitle="Rate this tour"
                      icon={<StarIconFill width={26} height={26} viewBox="0 0 26 26" />}
                      onPress={() => navigation.navigate(ROUTES.RATE_TOUR, { ticket })}
                      style={{
                        borderColor: AppColors.gray,
                        borderWidth: 1,
                      }}
                      showShadow={false}
                    />
                  )}
                  <LinkCard
                    title="Report this tour"
                    icon={<ShieldIcon viewBox="0 0 26 26" width={20} height={20} />}
                    subtitle="Send report"
                    onPress={handlePressReport}
                    style={{
                      borderColor: AppColors.red,
                      borderWidth: 1,
                    }}
                    showShadow={false}
                  />
                </View>
              </View>
              {ticketState.status === PaymentStatus.PENDING && (
                <View
                  style={{
                    margin: 20,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: AppColors.blue,
                      padding: 10,
                      paddingVertical: 16,
                      borderRadius: 6,
                    }}
                    onPress={handlePressCheckIn}
                  >
                    <Text
                      style={{
                        fontFamily: AppFonts.extraBold,
                        color: AppColors.white,
                        textAlign: 'center',
                        fontSize: AppFontSizes.normal,
                      }}
                    >
                      Check in now
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={{
                      backgroundColor: AppColors.white,
                      borderColor: AppColors.red,
                      borderWidth: 1,
                      padding: 16,
                      borderRadius: 6,
                    }}
                    onPress={handlePressDiscard}
                  >
                    <Text
                      style={{
                        fontFamily: AppFonts.semiBold,
                        color: AppColors.red,
                        textAlign: 'center',
                      }}
                    >
                      Discard this ticket
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </View>
          ) : (
            <ActivityIndicator size={'large'} color={AppColors.blue} />
          )}
        </ScrollView>
      </View>
      <StatusBar backgroundColor={AppColors.blue} />
    </>
  )
}

export default HistoryTourDetail
