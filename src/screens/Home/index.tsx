import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CommonCard from '@components/CommonCard'
import DirectLabel from '@components/DirectLabel'
import { ROUTES } from '@constants/route'
import { State } from '@constants/state'
import useSavedRoute from '@hooks/socket/useSavedRoute'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import { randomUUID } from '@lib/converter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TouristsRouteType } from '@schema/Company/TouristsRoute'
import { selectSavedTours } from '@store/features/saved/selector'
import { useAppSelector } from '@store/hooks'
import React from 'react'
import {
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from 'react-native'
const Home = ({ navigation }: NativeStackScreenProps<any>) => {
  const { data, isError, popularRoutes, recommendedRoutes } = useTouristRoute({
    route: [],
    keyword: '',
  })
  const savedTours = useAppSelector(selectSavedTours)
  const { status, data: savedRoute } = savedTours
  const dataArray = [
    {
      to: ROUTES.FOR_YOU,
      title: 'For you',
      color: AppColors.primary,
      data: recommendedRoutes?.slice(0, 5),
    },
    {
      to: ROUTES.DOMESTIC_TOURS,
      title: 'Domestic destinations',
      color: AppColors.secondary,
      data: data?.filter((item) => item.type === TouristsRouteType.COUNTRY).slice(0, 5),
    },
    {
      to: ROUTES.INTERNATIONAL_TOURS,
      title: 'International destinations',
      color: AppColors.heavyYellow,
      data: data?.filter((item) => item.type === TouristsRouteType.FOREIGN).slice(0, 5),
    },
    {
      to: ROUTES.POPULAR,
      title: 'Popular',
      color: AppColors.purple,
      data: popularRoutes?.slice(0, 5),
    },
  ]
  return (
    <>
      <FlatList
        data={dataArray}
        keyExtractor={(item, index) => item.to}
        renderItem={({ item: data, index }) => (
          <View
            style={{
              gap: 10,
              // paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <DirectLabel
              title={data.title}
              to={data.to}
              style={{
                paddingHorizontal: 20,
              }}
              color={data.color}
            />
            {data.data ? (
              data.data.length !== 0 ? (
                <FlatList
                  data={data.data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                  }}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: AppColors.gray,
                          fontFamily: AppFonts.semiBold,
                          textAlign: 'center',
                        }}
                      >
                        No data
                      </Text>
                    </View>
                  )}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        alignSelf: 'flex-start',
                        marginBottom: 10,
                      }}
                      key={item._id}
                    >
                      <CommonCard
                        title={item.name}
                        // salePrice={500000}
                        originalPrice={item.reservationFee}
                        isDomestic={item.type === TouristsRouteType.COUNTRY}
                        rating={item.rate}
                        imageStyle={{
                          width: 260,
                          height: 180,
                        }}
                        reviewCount={item.num}
                        image={item.images[0]}
                        id={item._id || ''}
                        isSaved={savedRoute?.find((r) => r === item._id) !== undefined}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => item?._id + randomUUID() || randomUUID()}
                />
              ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: AppColors.gray,
                      fontFamily: AppFonts.semiBold,
                      textAlign: 'center',
                    }}
                  >
                    No data
                  </Text>
                </View>
              )
            ) : (
              <ActivityIndicator size="large" color={data.color} />
            )}
          </View>
        )}
      />

      <StatusBar backgroundColor={AppColors.primary} barStyle={'light-content'} />
    </>
  )
}

export default Home
