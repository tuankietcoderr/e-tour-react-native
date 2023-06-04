import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CardView from '@components/CardView'
import { ROUTES } from '@constants/route'
import { State } from '@constants/state'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CreditCard } from '@schema/User/Card'
import { selectCard, selectDefaultCard } from '@store/features/card/selector'
import { changeDefaultCardThunk, deleteCardThunk } from '@store/features/card/thunk'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React from 'react'
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-root-toast'

type ParamList = {
  CardDetail: {
    cardId: string
  }
}

const CardDetail = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'CardDetail'>>().params
  const { cardId } = params
  const card = useAppSelector((state) => selectCard(state, cardId))
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        fontFamily: AppFonts.medium,
      },
      headerStyle: {
        backgroundColor: AppColors.purple,
      },
      headerTintColor: AppColors.white,
      title: 'Card detail',
    })
  }, [])
  const [isDefaultState, setIsDefaultState] = React.useState(card?.isDefault || false)
  const [deleteCardState, setDeleteCardState] = React.useState(false)
  const dispatch = useAppDispatch()

  const defaultCardSelector = useAppSelector(selectDefaultCard)
  const status = defaultCardSelector?.status || State.IDLE

  const handlePressEditCard = () => {
    navigation.navigate(ROUTES.EDIT_CARD, { card })
  }
  const handlePressSetDefaultCard = () => {
    dispatch(changeDefaultCardThunk(card?._id as string)).then((res) => {
      setIsDefaultState(true)
      Toast.show('Card set as default successfully', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.success,
      })
    })
  }
  const handlePressDeleteCard = () => {
    setDeleteCardState(true)
    dispatch(deleteCardThunk(card?._id as string))
      .then((res) => {
        Toast.show('Card deleted successfully', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.success,
        })
        navigation.goBack()
      })
      .catch((err) => {
        Toast.show('Card deleted failed', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.error,
        })
      })
      .finally(() => {
        setDeleteCardState(false)
      })
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <CardView {...(card as CreditCard)} />
      </View>
      <View
        style={{
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.purple,
            paddingVertical: 16,
            borderRadius: 6,
          }}
          onPress={handlePressEditCard}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
              textAlign: 'center',
            }}
          >
            Edit card
          </Text>
        </TouchableOpacity>
        {!isDefaultState && (
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.white,
              borderColor: AppColors.purple,
              borderWidth: 1,
              paddingVertical: 16,
              borderRadius: 6,
            }}
            onPress={handlePressSetDefaultCard}
          >
            {status === State.LOADING && <ActivityIndicator />}
            {status === State.IDLE && (
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  color: AppColors.purple,
                  textAlign: 'center',
                }}
              >
                Set as default
              </Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.white,
            borderColor: AppColors.red,
            borderWidth: 1,
            paddingVertical: 16,
            borderRadius: 6,
          }}
          onPress={handlePressDeleteCard}
        >
          {deleteCardState ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.red,
                textAlign: 'center',
              }}
            >
              Delete card
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={AppColors.purple} />
    </View>
  )
}

export default CardDetail
