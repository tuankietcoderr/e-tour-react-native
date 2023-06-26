import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { UserIconOutline } from '@assets/themes/icons/outline'
import MailIcon from '@assets/themes/icons/outline/MailIcon'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import BookingStep, { Step, steps } from '@components/BookingStep'
import Line from '@components/Line'
import LinkCard from '@components/LinkCard'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import { avatarStorage, imageStorage, toDot } from '@lib/converter'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tour } from '@schema/Company/Tour'
import { ITicketVisitor } from '@schema/User/Ticket'
import React from 'react'
import { Image, ScrollView, StatusBar, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Toast from 'react-native-root-toast'

type ParamList = {
  TicketFillInfoParams: {
    quantity: number
    tour: Tour
    date: Date | string
  }
}

const FillInformation = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Fill Information',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
      headerShadowVisible: false,
    })
  }, [])
  let index = 0
  const params = useRoute<RouteProp<ParamList, 'TicketFillInfoParams'>>().params
  const { quantity, tour, date } = params
  const {
    user,
    visitors,
    setVisitors,
    information,
    setSpecialRequest,
    specialRequest,
    pickupLocation,
    setPickupLocation,
  } = React.useContext(UserContext)
  const handleOnPressFillContactInformation = () => {
    navigation.navigate(ROUTES.TICKET_CONTACT)
  }

  const handleOnPressFillGuestInformation = (i: number) => {
    navigation.navigate(ROUTES.TICKET_PEOPLE, {
      index: i,
    })
  }

  const handleOnPressContinue = () => {
    if (visitors.every((v) => v.name && v.address && v.phoneNumber && v.address)) {
      navigation.navigate(ROUTES.TICKET_PAYMENT, {
        tour,
        quantity,
      })
    } else {
      Toast.show('Please fill all information', {
        backgroundColor: AppColors.lightRed,
      })
    }
  }

  const handleOnPressMarker = () => {
    navigation.navigate(ROUTES.MAP, {
      setAddressParams: (address: string) => {
        setPickupLocation(address)
      },
    })
  }

  return (
    <ScrollView>
      <View>
        <View
          style={{
            backgroundColor: AppColors.lightRed,
            paddingVertical: 20,
          }}
        >
          <BookingStep steps={steps} currentStep={0} stepsToShow={[0, 1]} />
        </View>
        <View
          style={{
            backgroundColor: AppColors.white,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={{
              uri: avatarStorage(user?.image || ''),
              width: 60,
              height: 60,
            }}
            style={{
              borderRadius: 60,
            }}
            resizeMode="cover"
          />
          <View style={{}}>
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              Login as <Text style={{ fontFamily: AppFonts.semiBold }}>{user?.fullName}</Text>
            </Text>
            <Text
              style={{
                color: AppColors.gray,
                fontSize: AppFontSizes.small,
                fontFamily: AppFonts.regular,
              }}
            >
              by{' '}
              <Text style={{ fontFamily: AppFonts.semiBold }}>
                {user?.credential?.authenticationType || 'Password'}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 20,
            gap: 16,
          }}
        >
          <View
            style={{
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.normal,
              }}
            >
              Contact information
            </Text>
            <View>
              <LinkCard
                title={
                  <Text
                    style={{
                      fontSize: AppFontSizes.normal,
                    }}
                  >
                    Fill contact information
                    <Text style={{ color: AppColors.red }}>*</Text>
                  </Text>
                }
                showShadow={false}
                onPress={handleOnPressFillContactInformation}
                icon={<MailIcon width={16} height={16} viewBox="0 0 10 10" />}
              />
              {information && Object.values(information).every((p) => p !== '') && (
                <View
                  style={{
                    backgroundColor: AppColors.white,
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                    }}
                  >
                    {information.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                    }}
                  >
                    {information.phoneNumber}
                  </Text>
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                    }}
                  >
                    {information?.address}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            {visitors.length !== 0 && (
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  fontSize: AppFontSizes.normal,
                }}
              >
                Guest information <Text style={{ color: AppColors.red }}>*</Text>
              </Text>
            )}
            {visitors.map((visitor, i) => (
              <View key={(++index).toString() + 'guest'}>
                <LinkCard
                  title={
                    <Text
                      style={{
                        fontSize: AppFontSizes.normal,
                      }}
                    >
                      Guest {index + 1}
                      <Text style={{ color: AppColors.red }}>*</Text>
                    </Text>
                  }
                  showShadow={false}
                  onPress={index === i ? () => handleOnPressFillGuestInformation(i) : undefined}
                  icon={<UserIconOutline width={16} height={16} viewBox="0 0 13 13" />}
                />
                {visitor &&
                  Object.values(visitor).length > 0 &&
                  Object.values(visitor).every((p) => p) && (
                    <View
                      style={{
                        backgroundColor: AppColors.white,
                        padding: 10,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: AppFonts.regular,
                        }}
                      >
                        {visitor.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: AppFonts.regular,
                        }}
                      >
                        {visitor.phoneNumber}
                      </Text>
                      <Text
                        style={{
                          fontFamily: AppFonts.regular,
                        }}
                      >
                        {visitor?.address}
                      </Text>
                    </View>
                  )}
              </View>
            ))}
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ fontFamily: AppFonts.semiBold, fontSize: AppFontSizes.normal }}>
              Special request
            </Text>
            <View>
              <TextInput
                style={{
                  backgroundColor: AppColors.white,
                  padding: 10,
                  borderRadius: 6,
                  fontFamily: AppFonts.regular,
                }}
                value={specialRequest}
                onChangeText={(text) => setSpecialRequest(text)}
                placeholder="Type your special request here"
              />
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ fontFamily: AppFonts.semiBold, fontSize: AppFontSizes.normal }}>
              Pickup location
            </Text>
            <View>
              <TextInput
                style={{
                  backgroundColor: AppColors.white,
                  padding: 10,
                  borderRadius: 6,
                  fontFamily: AppFonts.regular,
                }}
                multiline
                value={pickupLocation}
                onChangeText={(text) => setPickupLocation(text)}
                placeholder="Enter your pickup location here"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  zIndex: 3,
                  bottom: 0,
                  justifyContent: 'center',
                }}
                onPress={handleOnPressMarker}
              >
                <MarkerIcon width={20} height={20} viewBox="0 0 24 24" color={AppColors.red} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
              }}
            >
              Price detail
            </Text>
            <View
              style={{
                backgroundColor: AppColors.white,
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    fontSize: AppFontSizes.normal,
                  }}
                >
                  You pay
                </Text>
                <Text
                  style={{
                    fontFamily: AppFonts.extraBold,
                    fontSize: AppFontSizes.medium,
                  }}
                >
                  VND {toDot((tour?.price || 0) * quantity)}
                </Text>
              </View>
              <Line />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    color: AppColors.gray,
                  }}
                >
                  {tour.name}
                </Text>
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                  }}
                >
                  {tour.type}
                </Text>
              </View>
              <Line />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    color: AppColors.gray,
                  }}
                >
                  Quantity ({quantity})
                </Text>
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                  }}
                >
                  VND {toDot(tour?.price || 0)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.secondary,
              paddingVertical: 16,
              borderRadius: 6,
              alignItems: 'center',
            }}
            onPress={handleOnPressContinue}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.white,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar backgroundColor={AppColors.lightRed} />
      </View>
    </ScrollView>
  )
}

export default FillInformation
