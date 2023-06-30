import { View, Text, Button, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteProp, useRoute } from '@react-navigation/core'
import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import DateTimePicker from 'react-native-modal-datetime-picker'
import TicketCard from '@components/TicketCard'
import { Tour } from '@schema/Company/Tour'

type ParamList = {
  RouteDetail: {
    route_id: string
    name: string
    tours: Tour[]
  }
}

const RelativeTicket = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'RouteDetail'>>().params
  const { route_id, name: route_name, tours } = params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.medium,
      },
      headerTintColor: 'white',
      title: route_name,
    })
  }, [route_id])

  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [isVisible, setIsVisible] = React.useState(false)

  const showDatePicker = React.useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleConfirm = React.useCallback((date: Date) => {
    setDate(date)
    setIsVisible(false)
  }, [])

  const handleCancel = React.useCallback(() => {
    setIsVisible(false)
  }, [])

  const Picker = React.useCallback(
    () => (
      <DateTimePicker
        date={date === undefined ? new Date() : date}
        mode="date"
        isVisible={isVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    ),
    [date, isVisible]
  )

  return (
    <View
      style={{
        overflow: 'scroll',
      }}
    >
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.medium,
              }}
            >
              {date ? date.toDateString() : 'All tickets'}
            </Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                backgroundColor: AppColors.lightRed,
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.medium,
                  color: AppColors.white,
                }}
              >
                Choose date
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Picker />
      </View>
      <FlatList
        ListEmptyComponent={() => (
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.gray,
            }}
          >
            No ticket found
          </Text>
        )}
        data={
          date
            ? tours.filter((tour) => {
                const isRender =
                  new Date(tour.from).getTime() <= new Date(date || new Date()).getTime() &&
                  new Date(tour.to).getTime() >= new Date(date || new Date()).getTime()
                return isRender
              })
            : tours
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => (
          <TicketCard
            date={date?.toDateString() || new Date().toDateString()}
            tour={item}
            from={item.from}
            to={item.to}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        style={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar backgroundColor={AppColors.lightRed} />
    </View>
  )
}

export default RelativeTicket
