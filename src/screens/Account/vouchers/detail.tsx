import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ExploreVoucher from '@components/ExploreVoucher'
import { AppColors } from '@assets/themes/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import VoucherCard from '@components/VoucherCard'
import { RouteProp, useRoute } from '@react-navigation/core'
import useVoucher from '@hooks/socket/useVoucher'
import { LinearGradient } from 'expo-linear-gradient'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { saveVoucherThunk, unsaveVoucherThunk } from '@store/features/saved/thunk'
import Toast from 'react-native-root-toast'
import { selectSavedVouchers } from '@store/features/saved/selector'
import { State } from '@constants/state'
import { Company } from '@schema/Company/Company'
import { companyStorage } from '@lib/converter'
import { ROUTES } from '@constants/route'
import CompanyCard from '@components/CompanyCard'

type ParamList = {
  VoucherDetail: {
    voucher_id: string
  }
}

const VoucherDetail = ({ navigation }: NativeStackScreenProps<any>) => {
  const { voucher_id } = useRoute<RouteProp<ParamList, 'VoucherDetail'>>().params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.secondary,
      },
      headerTintColor: AppColors.white,
      headerTitleAlign: 'center',
      title: 'Voucher detail',
    })
  }, [])
  const { getVoucherById } = useVoucher()
  const voucher = getVoucherById(voucher_id)

  const dispatch = useAppDispatch()
  const { status, data: savedVouchers } = useAppSelector(selectSavedVouchers)
  const isSaved = savedVouchers?.find((item) => item === voucher_id)
  const company: Company = voucher?.companyId ? (voucher?.companyId as Company) : ({} as Company)
  const handleOnPressSave = () => {
    isSaved
      ? dispatch(unsaveVoucherThunk(voucher_id))
          .then((res) => {
            if (res.payload) {
              Toast.show('Discarded', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: AppColors.success,
              })
            } else {
              Toast.show('Error during discard', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: AppColors.error,
              })
            }
          })
          .catch((err) => {
            Toast.show('Error during discard', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              backgroundColor: AppColors.error,
            })
          })
      : dispatch(saveVoucherThunk(voucher_id))
          .then((res) => {
            if (res.payload) {
              Toast.show('Saved', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: AppColors.success,
              })
            } else {
              Toast.show('Error during save', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                backgroundColor: AppColors.error,
              })
            }
          })
          .catch((err) => {
            Toast.show('Error during save', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              backgroundColor: AppColors.error,
            })
          })
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: 200,
        }}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={[AppColors.secondary, AppColors.blue]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.3, y: 0 }}
          style={{
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        {voucher ? (
          <View
            style={{
              paddingHorizontal: 20,
              transform: [{ translateY: 120 }],
            }}
          >
            <VoucherCard {...voucher} />
          </View>
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
      <View
        style={{
          transform: [{ translateY: 80 }],
          paddingHorizontal: 20,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.regular,
          }}
        >
          {voucher?.description || ''}
        </Text>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.bold,
              fontSize: AppFontSizes.body,
            }}
          >
            Expired at
          </Text>
          <Text
            style={{
              fontFamily: AppFonts.regular,
            }}
          >
            {moment(voucher?.expiredAt).format('ll') || ''}
          </Text>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.bold,
              fontSize: AppFontSizes.body,
            }}
          >
            Using condition
          </Text>
          <Text
            style={{
              fontFamily: AppFonts.regular,
            }}
          >
            {voucher?.usingCondition || 'No condition provided'}
          </Text>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.bold,
              fontSize: AppFontSizes.body,
            }}
          >
            Company
          </Text>
          <CompanyCard companyId={company._id as string} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: isSaved ? AppColors.white : AppColors.secondary,
            paddingVertical: 16,
            borderRadius: 6,
            opacity: status === State.LOADING ? 0.5 : 1,
            borderWidth: isSaved ? 1 : 0,
            borderColor: AppColors.lightRed,
          }}
          onPress={handleOnPressSave}
          disabled={status === State.LOADING}
        >
          {status === State.LOADING ? (
            <ActivityIndicator color={AppColors.white} />
          ) : (
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: isSaved ? AppColors.lightRed : AppColors.white,
                textAlign: 'center',
              }}
            >
              {isSaved ? 'Discard' : 'Save'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={AppColors.secondary} />
    </View>
  )
}

export default VoucherDetail
