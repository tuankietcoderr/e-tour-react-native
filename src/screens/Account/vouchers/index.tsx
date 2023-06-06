import {
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectSavedVouchers } from '@store/features/saved/selector'
import { State } from '@constants/state'
import { VoucherType } from '@schema/User/Voucher'
import useVoucher from '@hooks/socket/useVoucher'
import ExploreVoucher from '@components/ExploreVoucher'
import VoucherCard from '@components/VoucherCard'
import { capitalize, randomUUID } from '@lib/converter'

const MyVouchers = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerTintColor: 'white',
      title: 'My vouchers',
    })
  }, [])

  const { data: savedVouchers, status } = useAppSelector(selectSavedVouchers)
  const { vouchers } = useVoucher()

  const types = Object.keys(VoucherType)
  types.unshift('ALL')
  const [filter, setFilter] = React.useState(types[0])

  const onChangeFilter = (newFilter: VoucherType) => {
    setFilter(newFilter)
  }

  const renderData = vouchers.filter(
    (v) =>
      (filter === 'ALL' || v.type === filter.toLowerCase()) &&
      savedVouchers.includes(v._id as string)
  )
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingBottom: 10,
        }}
      >
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={{
              backgroundColor: filter === type ? AppColors.secondary : AppColors.white,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 6,
              borderWidth: filter === type ? 0 : 1,
              borderColor: AppColors.secondary,
            }}
            onPress={() => onChangeFilter(type as VoucherType)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: type !== filter ? AppColors.secondary : AppColors.white,
                fontFamily: AppFonts.semiBold,
              }}
            >
              {capitalize(type)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {status === State.IDLE ? (
        savedVouchers.length === 0 ? (
          <Empty />
        ) : (
          <>
            <FlatList
              data={renderData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 20,
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
                    You have no {filter === 'ALL' ? '' : capitalize(filter)} vouchers
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item }) => <VoucherCard {...item} />}
              key={'#'}
              keyExtractor={(item, index) => '#' + item?._id?.toString() || randomUUID()}
              ListFooterComponent={<ExploreVoucher includeSaved={false} />}
              ListFooterComponentStyle={{
                marginBottom: 100,
              }}
            />
          </>
        )
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <StatusBar backgroundColor={AppColors.lightRed} />
    </View>
  )
}

export default MyVouchers

const Empty = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
      }}
    >
      <Image
        source={require('@assets/illustration/empty_voucher.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontFamily: AppFonts.semiBold,
          fontSize: 16,
        }}
      >
        No vouchers yet
      </Text>
    </View>
  )
}
