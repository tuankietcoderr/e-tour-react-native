import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectDefaultCard } from '@store/features/card/selector'
import { getDefaultCardThunk } from '@store/features/card/thunk'
import CardView from './CardView'
import { State } from '@constants/state'
import { CreditCard } from '@schema/User/Card'
import { AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@constants/route'

const DefaultCard = () => {
  const dispatch = useAppDispatch()
  const defaultCardSelector = useAppSelector(selectDefaultCard)
  const status = defaultCardSelector?.status || State.IDLE
  const navigation = useNavigation<any>()
  const handleOnPressCardView = () => {
    navigation.navigate(ROUTES.CARD_DETAIL, { cardId: defaultCardSelector?.data?._id })
  }

  if (!defaultCardSelector?.data && status === State.IDLE) {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: AppColors.white,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            textAlign: 'center',
          }}
        >
          You have no default card. Try to add one.
        </Text>
      </View>
    )
  }

  return (
    <View>
      {status === State.IDLE ? (
        <View
          style={{
            position: 'relative',
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.extraBold,
              position: 'absolute',
              zIndex: 1,
              paddingHorizontal: 40,
              paddingVertical: 4,
              backgroundColor: AppColors.white,
              color: AppColors.purple,
              borderTopLeftRadius: 16,
              borderBottomRightRadius: 8,
            }}
          >
            DEFAULT
          </Text>
          <TouchableOpacity onPress={handleOnPressCardView}>
            <CardView {...(defaultCardSelector?.data as CreditCard)} />
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}

export default DefaultCard
