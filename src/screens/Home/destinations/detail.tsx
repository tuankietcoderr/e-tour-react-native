import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import CompanyCard from '@components/CompanyCard'
import FollowModal from '@components/FollowModal'
import ImageSlider from '@components/ImageSlider'
import { onClose, onOpen } from '@components/Picker'
import RateCard from '@components/RateCard'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import { FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import useRate from '@hooks/socket/useRate'
import useRouteById from '@hooks/socket/useRouteById'
import useTourByRouteId from '@hooks/socket/useTourByRouteId'
import { rateColorConverter, rateConverter, toDot } from '@lib/converter'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IFollower, NotificationType } from '@schema/User/Notification'
import { ReportType } from '@schema/User/Report'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-root-toast'

type ParamList = {
  RouteDetail: {
    route_id: string
    isSaved?: boolean
  }
}

const TourDetail = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'RouteDetail'>>().params
  const { isSaved, route_id } = params
  const { width, height } = Dimensions.get('window')
  const { data: tour, isError } = useRouteById(route_id)
  const [risk, setRisk] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  const { user } = React.useContext(UserContext)
  const { data: rate } = useRate(route_id)

  React.useEffect(() => {
    if (tour) {
      setRisk(false)
    }
  }, [tour])

  React.useEffect(() => {
    if (isError) {
      Toast.show('Error when getting route information', {
        position: Toast.positions.CENTER,
        backgroundColor: AppColors.red,
      })
    }
  }, [isError])

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: tour?.name || 'Loading...',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerRight: (props) => (
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={onOpenSheet}>
            {!!follower ? (
              <MaterialCommunityIcons name="bell-ring-outline" size={24} color={props.tintColor} />
            ) : (
              <MaterialCommunityIcons name="bell-plus-outline" size={24} color={props.tintColor} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.REPORT_TOUR, {
                objectId: route_id,
                reportType: ReportType.ROUTE,
              })
            }}
          >
            <FontAwesome name="flag" size={24} color={props.tintColor} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [route_id, tour])

  const { data } = useTourByRouteId(route_id)
  const minPrice =
    data.length !== 0 ? data.reduce((min, p) => Math.min(min, p.price || 0), data[0].price || 0) : 0
  const maxPrice = data.length !== 0 ? data.reduce((max, p) => Math.max(max, p.price || 0), 0) : 0
  const followers = tour ? tour.followers : ([] as IFollower[])
  const follower = followers.find((fl) => (fl.user as string) === user?._id) as IFollower

  const handleOnPressBooking = () => {
    navigation.navigate(ROUTES.RELATIVE_TICKET, {
      route_id,
      name: tour?.name,
      tours: data,
    })
  }
  const onCloseSheet = () => {
    onClose(route_id)
    setIsOpen(false)
  }
  const onOpenSheet = () => {
    onOpen(route_id)
    setIsOpen(true)
  }

  if (risk && !tour) {
    return (
      <>
        <ActivityIndicator size={'large'} color={AppColors.lightRed} />
        <StatusBar backgroundColor={AppColors.lightRed} />
      </>
    )
  }

  return (
    <>
      <View
        style={{
          minHeight: height,
        }}
      >
        {tour && !risk && (
          <FollowModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            id={route_id}
            follower={follower}
            notificationType={follower?.notificationType || NotificationType.ALL}
            onOpenSheet={onOpenSheet}
            onCloseSheet={onCloseSheet}
            additionalFunction={() => {}}
          />
        )}
        <ScrollView>
          {tour ? (
            <View
              style={{
                paddingBottom: 200,
                gap: 10,
              }}
            >
              <View>
                <ImageSlider images={tour.images} autoplay />

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
                    flex: 3,
                  }}
                >
                  {tour?.name}
                </Text>
                {/* <Text>
                  by <Text>{tour.companyId}</Text>
                </Text> */}
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                    color: rateColorConverter(tour?.rate || 0),
                  }}
                >
                  {tour?.rate.toFixed(2) || 0} {rateConverter(tour?.rate || 0)}{' '}
                  <Text
                    style={{
                      color: AppColors.gray,
                      fontFamily: AppFonts.regular,
                      fontSize: AppFontSizes.small,
                    }}
                  >
                    {' '}
                    ({tour.num || 0} reviews)
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
                    {tour?.route.join(' - ')}
                  </Text>
                </View>
                <CompanyCard companyId={tour?.companyId} />
                <View
                  style={{
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.bold,
                      fontSize: AppFontSizes.body,
                      marginBottom: 10,
                    }}
                  >
                    You will experience
                  </Text>
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                    }}
                  >
                    {tour?.description}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: AppFonts.bold,
                      fontSize: AppFontSizes.body,
                      marginBottom: 10,
                    }}
                  >
                    What people say
                  </Text>
                  <View>
                    {rate ? (
                      <FlatList
                        pagingEnabled
                        data={rate}
                        ListEmptyComponent={() => (
                          <Text
                            style={{
                              fontFamily: AppFonts.regular,
                              color: AppColors.gray,
                            }}
                          >
                            No person rates this tour
                          </Text>
                        )}
                        keyExtractor={(item, index) => item._id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => <RateCard {...item} />}
                      />
                    ) : (
                      <ActivityIndicator size={'large'} />
                    )}
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <ActivityIndicator size={'large'} color={AppColors.lightRed} />
          )}
        </ScrollView>
      </View>
      {tour && (
        <View
          style={{
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
            borderWidth: 1,
            borderColor: AppColors.lightRed,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                color: AppColors.gray,
              }}
            >
              Price
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.bold,
                color: AppColors.lightRed,
                fontSize: AppFontSizes.h4,
                maxWidth: width / 1.5,
              }}
              numberOfLines={2}
            >
              VND {toDot(minPrice)} {'->'} {toDot(maxPrice)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.lightRed,
              alignSelf: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 6,
            }}
            onPress={handleOnPressBooking}
          >
            <Text
              style={{
                fontFamily: AppFonts.bold,
                color: AppColors.white,
              }}
            >
              Find ticket
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor={AppColors.lightRed} />
    </>
  )
}

export default TourDetail
