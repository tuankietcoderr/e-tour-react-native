import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/core'
import { Ticket } from '@schema/User/Ticket'
import ImageSlider from '@components/ImageSlider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { Rating } from 'react-native-ratings'
import useRate from '@hooks/socket/useRate'
import RateCard from '@components/RateCard'
import LeaveRating from '@components/LeaveRating'

type ParamList = {
  RateTourParams: {
    ticket: Ticket
  }
}

const RateTour = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList>>().params
  const ticket = params.ticket
  const {
    tourId: { touristRoute },
    totalRating,
  } = ticket
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Rate ' + touristRoute?.name,
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
    })
  }, [])
  const { height, width } = useWindowDimensions()
  const { data: rate } = useRate(touristRoute?._id)
  return (
    <View
      style={{
        overflow: 'scroll',
      }}
    >
      {touristRoute && <ImageSlider images={touristRoute?.images} autoplay duration={4000} />}
      <View
        style={{
          padding: 20,
          backgroundColor: AppColors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          transform: [{ translateY: -40 }],
          zIndex: 2,
          minHeight: height,
          gap: 10,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            fontSize: AppFontSizes.medium,
          }}
        >
          {touristRoute?.name}
        </Text>
        <Rating ratingCount={5} startingValue={totalRating?.rate || 0} readonly />
        <LeaveRating route_id={touristRoute?._id || ''} />
        {rate ? (
          rate.length > 0 ? (
            <FlatList
              data={rate}
              contentContainerStyle={{
                paddingVertical: 10,
                zIndex: 2,
              }}
              ListFooterComponent={() => <View style={{ height: 300 }} />}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => <RateCard {...item} />}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <Text>No rating yet</Text>
          )
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
      <StatusBar backgroundColor={AppColors.blue} />
    </View>
  )
}

export default RateTour
