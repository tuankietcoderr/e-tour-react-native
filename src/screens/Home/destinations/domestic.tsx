import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import { randomUUID } from '@lib/converter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TouristsRouteType } from '@schema/Company/TouristsRoute'
import React from 'react'
import { ActivityIndicator, FlatList, StatusBar, TouchableOpacity, View } from 'react-native'

const DomesticDestinations = ({ navigation }: NativeStackScreenProps<any>) => {
  const { data } = useTouristRoute({ route: [], keyword: '' })
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.secondary,
      },
      headerTintColor: AppColors.white,
      headerTitle: 'Domestic destinations',
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerTitleAlign: 'center',
    })
  }, [])
  return (
    <View>
      <View style={{}}>
        {data.length !== 0 ? (
          <FlatList
            data={data.filter((item) => item.type === TouristsRouteType.COUNTRY)}
            showsVerticalScrollIndicator={false}
            style={{
              paddingBottom: 400,
            }}
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
                  id={item._id}
                  originalPrice={item.reservationFee}
                  isDomestic={item.type === TouristsRouteType.COUNTRY}
                  rating={item.rate}
                  image={item.images[0]}
                  route={item.route}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item?._id || randomUUID()}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
      <StatusBar backgroundColor={AppColors.secondary} />
    </View>
  )
}

export default DomesticDestinations
