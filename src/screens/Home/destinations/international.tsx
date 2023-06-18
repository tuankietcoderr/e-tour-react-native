import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import SecondaryTopBar from '@components/SecondaryTopBar'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import { randomUUID } from '@lib/converter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TouristsRouteType } from '@schema/Company/TouristsRoute'
import React from 'react'
import { ActivityIndicator, FlatList, StatusBar, TouchableOpacity, View } from 'react-native'

const InternationalDestinations = ({ navigation }: NativeStackScreenProps<any>) => {
  const { data } = useTouristRoute({ route: [], keyword: '' })
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.heavyYellow,
      },
      headerTintColor: AppColors.white,
      headerTitle: 'International destinations',
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerTitleAlign: 'center',
    })
  }, [])
  return (
    <View>
      {data.length !== 0 ? (
        <View style={{}}>
          <FlatList
            data={data.filter((item) => item.type === TouristsRouteType.FOREIGN)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => <View style={{ height: 300 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                key={item._id}
              >
                <CommonCardHorizontally
                  title={item.name}
                  // salePrice={500000}
                  originalPrice={item.reservationFee}
                  isDomestic={false}
                  rating={item.rate}
                  imageStyle={{
                    width: 200,
                    height: 180,
                  }}
                  image={item.images[0]}
                  // hideTourType
                  route={item.route}
                  id={item._id}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item?._id || randomUUID()}
          />
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <StatusBar backgroundColor={AppColors.heavyYellow} />
    </View>
  )
}

export default InternationalDestinations
