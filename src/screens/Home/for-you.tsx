import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ActivityIndicator, FlatList, StatusBar, TouchableOpacity, View } from 'react-native'

const ForYou = ({ navigation }: NativeStackScreenProps<any>) => {
  const { recommendedRoutes: data } = useTouristRoute({ route: [], keyword: '' })

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTintColor: AppColors.white,
      headerTitle: 'For you',
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
            keyExtractor={(item, index) => item._id.toString()}
            ListFooterComponent={<View style={{ height: 200 }} />}
          />
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <StatusBar backgroundColor={AppColors.primary} barStyle={'light-content'} />
    </View>
  )
}

export default ForYou
