import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import SecondaryTopBar from '@components/SecondaryTopBar'
import { AppColors } from '@assets/themes/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useVoucher from '@hooks/socket/useVoucher'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import VoucherCard from '@components/VoucherCard'
import { useAppSelector } from '@store/hooks'
import { selectSavedVouchers } from '@store/features/saved/selector'
import { State } from '@constants/state'
import { randomUUID } from '@lib/converter'
import ExploreVoucher from '@components/ExploreVoucher'
import Toast from 'react-native-root-toast'

const SavedVouchers = ({ navigation }: NativeStackScreenProps<any>) => {
  const { vouchers, isError } = useVoucher()
  const { data: savedVoucher, status } = useAppSelector(selectSavedVouchers)
  React.useEffect(() => {
    if (isError) {
      Toast.show('Error when getting saved vouchers', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.primary,
      })
    }
  }, [isError])
  return (
    <View>
      <View
        style={{
          overflow: 'scroll',
        }}
      >
        {status === State.IDLE && vouchers ? (
          <FlatList
            data={vouchers.filter((item) => savedVoucher?.includes(item._id as string))}
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
                    marginBottom: 10,
                  }}
                >
                  You have no saved vouchers
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => <VoucherCard {...item} />}
            key={'#'}
            keyExtractor={(item, index) => '#' + item?._id?.toString() || randomUUID()}
            ListFooterComponent={<ExploreVoucher includeSaved={false} />}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
    </View>
  )
}

export default SavedVouchers
