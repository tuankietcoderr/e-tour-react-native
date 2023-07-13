import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  FlatList,
} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { SearchIcon } from '@assets/themes/icons/outline'
import SearchBar from '@components/SearchBar'
import useSearch from '@hooks/socket/useSearch'
import CommonCardHorizontally from '@components/CommonCardHorizontally'
import { useAppSelector } from '@store/hooks'
import { selectSavedTours } from '@store/features/saved/selector'

const Search = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Search',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])

  const { search, data } = useSearch()
  React.useEffect(() => {
    if (data) {
    }
  }, [data])
  const onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    search(e.nativeEvent.text)
  }
  const savedTours = useAppSelector(selectSavedTours)
  const { data: saved, status } = savedTours

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SearchBar onEndEditing={onEndEditing} />
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
    </View>
  )
}

export default Search
