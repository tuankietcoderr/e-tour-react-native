import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import useHistory from '@hooks/socket/useHistory'
import HistoryCard from '@components/HistoryCard'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import { PaymentStatus } from '@schema/User/Ticket'
import Toast from 'react-native-root-toast'

const History = () => {
  const { data, isError } = useHistory(1)
  React.useEffect(() => {
    if (isError) {
      Toast.show('Error when getting history', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.primary,
      })
    }
  }, [isError])
  return (
    <View>
      {data ? (
        <FlatList
          data={data.filter((i) => i.status === PaymentStatus.CHECKED_OUT)}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.medium,
                color: AppColors.gray,
              }}
            >
              No booked ticket found
            </Text>
          )}
          renderItem={({ item }) => <HistoryCard {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListHeaderComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}

export default History
