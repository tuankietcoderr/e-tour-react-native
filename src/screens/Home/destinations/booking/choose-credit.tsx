import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import { ROUTES } from '@constants/route'
import { useAppSelector } from '@store/hooks'
import { selectCards } from '@store/features/card/selector'
import LinkCard from '@components/LinkCard'
import { Empty } from '@screens/Account/cards/my-cards'
import { FlatList } from 'react-native'
import { CreditCard } from '@schema/User/Card'
import { RouteProp, useRoute } from '@react-navigation/core'

type ParamList = {
  ChooseCredit: {
    setNewCard: (card: CreditCard) => void
    currentCardId: string
  }
}

const ChooseCredit = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Choose credit card',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const { setNewCard, currentCardId } = useRoute<RouteProp<ParamList, 'ChooseCredit'>>().params

  const handleOnPressCard = (cardId: string) => {
    navigation.navigate(ROUTES.CARD_DETAIL, { cardId })
  }

  const handleOnPressSelect = (card: CreditCard) => {
    setNewCard(card)
    navigation.canGoBack() && navigation.goBack()
  }

  const { data } = useAppSelector(selectCards)

  return (
    <View
      style={{
        padding: 20,
        gap: 20,
      }}
    >
      <FlatList
        ListHeaderComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => <Empty />}
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item: card, index }) => (
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <LinkCard
              title={card.cardNumber}
              subtitle={card.name}
              showShadow={false}
              style={{
                borderColor: AppColors.primary,
                borderWidth: 1,
                flex: 1,
              }}
              onPress={() => handleOnPressCard(card._id as string)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: currentCardId === card._id ? AppColors.primary : AppColors.white,
                padding: 10,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: currentCardId === card._id ? 0 : 1,
                borderColor: AppColors.primary,
              }}
              onPress={() => handleOnPressSelect(card)}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  color: currentCardId === card._id ? AppColors.white : AppColors.primary,
                }}
              >
                {currentCardId === card._id ? 'Selected' : 'Select'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View
        style={{
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 6,
            backgroundColor: AppColors.secondary,
            paddingVertical: 16,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate(ROUTES.ADD_CARD)}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
            }}
          >
            Add new card
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChooseCredit
