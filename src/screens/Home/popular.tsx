import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import SecondaryTopBar from '@components/SecondaryTopBar'
import { AppColors } from '@assets/themes/colors'
import { StatusBar } from 'react-native'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppFonts } from '@assets/themes/font'
import { randomUUID } from '@lib/converter'

const Popular = ({ navigation }: NativeStackScreenProps<any>) => {
  const { popularRoutes: data } = useTouristRoute({ route: [], keyword: '' })
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.purple,
      },
      headerTintColor: AppColors.white,
      headerTitle: 'Popular',
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
            data={data}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            ListFooterComponentStyle={{
              height: 400,
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  marginRight: 10,
                  justifyContent: 'center',
                }}
                key={index}
              >
                <CommonCardHorizontally
                  hideSaved
                  title={item.name}
                  // salePrice={500000}
                  originalPrice={item.reservationFee}
                  isDomestic={true}
                  rating={item.rate}
                  imageStyle={{
                    width: 200,
                    height: 180,
                  }}
                  image={item.images[0]}
                  hideTourType
                  route={item.route}
                  id={item._id}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item?._id || randomUUID()}
            ListFooterComponent={<View style={{ height: 200 }} />}
          />
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <StatusBar backgroundColor={AppColors.purple} />
    </View>
  )
}

export default Popular
