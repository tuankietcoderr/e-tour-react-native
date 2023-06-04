import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { ROUTES } from '@constants/route'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectCards, selectDefaultCard } from '@store/features/card/selector'
import { getAllUserCardsThunk } from '@store/features/card/thunk'
import { State } from '@constants/state'
import LinkCard from '@components/LinkCard'
import { CreditCard } from '@schema/User/Card'
import DefaultCard from '@components/DefaultCard'

const MyCards = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerTintColor: 'white',
      title: 'My Cards',
    })
  }, [])
  const cardSelector = useAppSelector(selectCards)
  const defaultCardSelector = useAppSelector(selectDefaultCard)
  const cardStatus = cardSelector.status
  const defaultCardStatus = defaultCardSelector?.status || State.IDLE

  const handleOnPressCard = (cardId: string) => {
    navigation.navigate(ROUTES.CARD_DETAIL, { cardId })
  }
  return (
    <View
      style={{
        paddingHorizontal: 20,
        gap: 20,
        minHeight: '100%',
      }}
    >
      <View
        style={{
          marginTop: 20,
        }}
      >
        <DefaultCard />
      </View>
      <View>
        {defaultCardStatus === State.IDLE && (
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              fontSize: AppFontSizes.h4,
            }}
          >
            Others
          </Text>
        )}
        {cardStatus === State.IDLE ? (
          <FlatList
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ListEmptyComponent={() => <Empty />}
            data={cardSelector.data.filter((card) => defaultCardSelector?.data?._id !== card._id)}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item: card, index }) => (
              <LinkCard
                title={card.cardNumber}
                subtitle={card.name}
                showShadow={false}
                style={{
                  borderColor: AppColors.primary,
                  borderWidth: 1,
                }}
                onPress={() => handleOnPressCard(card._id as string)}
              />
            )}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.primary,
          padding: 16,
          borderRadius: 6,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => navigation.navigate(ROUTES.ADD_CARD)}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            color: AppColors.white,
            textAlign: 'center',
          }}
        >
          Add credit card
        </Text>
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.primary} />
    </View>
  )
}

export default MyCards

export const Empty = () => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <Image
          source={require('@assets/illustration/empty_card.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginBottom: 40,
          }}
        />
        <Text
          style={{
            fontFamily: AppFonts.regular,
          }}
        >
          Save up to 3 cards and enjoy quick payments securely
        </Text>
      </View>
    </>
  )
}
