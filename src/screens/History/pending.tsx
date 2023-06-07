import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import useHistory from '@hooks/socket/useHistory'
import { PaymentStatus } from '@schema/User/Ticket'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import HistoryCard from '@components/HistoryCard'
import Toast from 'react-native-root-toast'

const PendingTicket = () => {
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
          data={data.filter((i) => i.status === PaymentStatus.PENDING)}
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
              No pending ticket found
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

export default PendingTicket
