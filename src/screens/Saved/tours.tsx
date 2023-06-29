import { View, Text, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import SecondaryTopBar from '@components/SecondaryTopBar'
import { AppColors } from '@assets/themes/colors'
import HorizontalCommonCard from '@components/HorizontalCommonCard'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import useSavedRoute from '@hooks/socket/useSavedRoute'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { useAppSelector } from '@store/hooks'
import { selectSavedTours } from '@store/features/saved/selector'
import { State } from '@constants/state'
import useTouristRoute from '@hooks/socket/useTouristRoute'
import Toast from 'react-native-root-toast'

const SavedTours = () => {
  const savedTours = useAppSelector(selectSavedTours)
  const { data: saved, status } = savedTours
  const { data, isError } = useTouristRoute({ keyword: '', route: [] })
  React.useEffect(() => {
    if (isError) {
      Toast.show('Error when getting saved tours', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.primary,
      })
    }
  }, [isError])
  return (
    <View
      style={{
        overflow: 'scroll',
      }}
    >
      <View style={{}} />
      {data ? (
        data.length !== 0 ? (
          <FlatList
            data={data ? data?.filter((item) => saved?.includes(item._id)) : []}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
            }}
            ListEmptyComponent={() => (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: AppFonts.semiBold,
                    fontSize: AppFontSizes.body,
                    color: AppColors.gray,
                  }}
                >
                  Empty
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => (
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
                isSaved={true}
                image={item.images[0]}
                hideTourType
                route={item.route}
                id={item._id}
              />
            )}
            key={'#'}
            keyExtractor={(item, index) => '#' + item._id.toString()}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.body,
                color: AppColors.gray,
              }}
            >
              Empty
            </Text>
          </View>
        )
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}

export default SavedTours
