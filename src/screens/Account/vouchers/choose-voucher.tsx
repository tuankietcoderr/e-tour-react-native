import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IVoucher } from '@schema/User/Voucher'
import { RouteProp, useRoute } from '@react-navigation/core'
import useVoucher from '@hooks/socket/useVoucher'
import { AppColors } from '@assets/themes/colors'
import { useAppSelector } from '@store/hooks'
import { selectSavedVouchers } from '@store/features/saved/selector'
import { randomUUID } from '@lib/converter'
import VoucherCard from '@components/VoucherCard'
import { AppFontSizes, AppFonts } from '@assets/themes/font'

type ParamList = {
  ChooseVoucher: {
    pickVouchers: (v: IVoucher[]) => void
    currentPickedVouchers: IVoucher[]
  }
}

const ChooseVoucher = ({ navigation }: NativeStackScreenProps<any>) => {
  const { currentPickedVouchers, pickVouchers } =
    useRoute<RouteProp<ParamList, 'ChooseVoucher'>>().params
  const { vouchers } = useVoucher()
  const { data: savedVouchers } = useAppSelector(selectSavedVouchers)
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Choose voucher',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const renderVouchers = vouchers.filter((v) => savedVouchers.includes(v._id as string))
  const [picked, setPicked] = React.useState<IVoucher[]>(currentPickedVouchers)

  React.useEffect(() => {
    pickVouchers(picked)
  }, [picked])

  const handleOnPressSelect = (voucher: IVoucher) => {
    const isSelect = picked.find((v) => v._id === voucher._id)
    if (isSelect) {
      setPicked(picked.filter((v) => v._id !== voucher._id))
    } else {
      setPicked([...picked, voucher])
    }
  }

  return (
    <View>
      <FlatList
        data={renderVouchers}
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
        renderItem={({ item }) => {
          const isSelect = picked.find((v) => v._id === item._id)
          return (
            <View
              style={{
                gap: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <VoucherCard {...item} />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: isSelect ? AppColors.primary : AppColors.white,
                  padding: 10,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: isSelect ? 0 : 1,
                  borderColor: AppColors.primary,
                }}
                onPress={() => handleOnPressSelect(item)}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                    color: isSelect ? AppColors.white : AppColors.primary,
                  }}
                >
                  {isSelect ? 'Selected' : 'Select'}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
        key={'#'}
        keyExtractor={(item, index) => '#' + item?._id?.toString() || randomUUID()}
      />
    </View>
  )
}

export default ChooseVoucher
