import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import useVoucher from '@hooks/socket/useVoucher'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '@store/hooks'
import { selectSavedVouchers } from '@store/features/saved/selector'
import VoucherCard from './VoucherCard'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { randomUUID } from '@lib/converter'
import { State } from '@constants/state'

interface Props {
  showTitle?: boolean
  includeSaved?: boolean
}

const ExploreVoucher = ({ showTitle = true, includeSaved = true }: Props) => {
  const { vouchers } = useVoucher()
  const { data: savedVoucher, status } = useAppSelector(selectSavedVouchers)
  return (
    <View
      style={{
        overflow: 'scroll',
      }}
    >
      {showTitle && savedVoucher.length !== vouchers.length && (
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            fontSize: AppFontSizes.h5,
            marginVertical: 20,
          }}
        >
          Explore more available vouchers
        </Text>
      )}
      {status === State.IDLE ? (
        <FlatList
          data={
            !includeSaved
              ? vouchers.filter((item) => !savedVoucher?.includes(item._id as string))
              : vouchers
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
          ListEmptyComponent={() => (
            <View>
              {savedVoucher.length !== vouchers.length && (
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
              )}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => <VoucherCard {...item} />}
          key={'#'}
          keyExtractor={(item, index) => '#' + item?._id?.toString() || randomUUID()}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}

export default ExploreVoucher
