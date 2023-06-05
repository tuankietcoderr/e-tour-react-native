import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { State } from '@constants/state'
import { RouteProp, useRoute } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CreditCard, ICreditCardForm } from '@schema/User/Card'
import { selectCards } from '@store/features/card/selector'
import { addNewCardThunk, updateCardThunk } from '@store/features/card/thunk'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import moment from 'moment'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { CreditCardInput } from 'react-native-credit-card-input-plus'
import Toast from 'react-native-root-toast'

type ParamList = {
  EditCard: {
    card: CreditCard
  }
}

const EditCard = ({ navigation }: NativeStackScreenProps<any>) => {
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
      title: 'Edit Card',
      headerTitleAlign: 'center',
    })
  }, [])

  const params = useRoute<RouteProp<ParamList, 'EditCard'>>().params
  const { card } = params

  const [form, setForm] = React.useState<ICreditCardForm>({
    status: {
      cvc: 'valid',
      expiry: 'valid',
      number: 'valid',
      name: 'valid',
    },
    valid: true,
    values: {
      cvc: card.cvv,
      expiry: moment(card.expiredDate).format('MM/YY'),
      number: card.cardNumber,
      type: card.type,
      name: card.name,
    },
  })

  const dispatch = useAppDispatch()
  const cardSelector = useAppSelector(selectCards)
  const status = cardSelector.status
  const [cardState, setCardState] = React.useState<CreditCard>(card)
  const handlePressAddCard = () => {
    const isSame = Object.entries(cardState).toString() === Object.entries(card).toString()
    if (isSame) {
      Toast.show('Nothing changed', {
        position: Toast.positions.CENTER,
      })
      return
    }
    const { valid } = form
    if (!valid) {
      Toast.show('Please enter valid card information', {
        position: Toast.positions.CENTER,
      })
      return
    }
    const { values } = form
    const { cvc, expiry, number, name, type } = values
    const updatedCard: CreditCard = {
      cardNumber: number,
      cvv: cvc,
      expiredDate: moment(expiry, 'MM/YY').toDate(),
      name,
      type,
      _id: card._id,
    }
    dispatch(updateCardThunk(updatedCard)).then((res) => {
      if (res.payload) {
        Toast.show('Update card successfully', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.success,
        })
        navigation.goBack()
      } else {
        Toast.show('Update card failed', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.red,
        })
      }
    })
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
        gap: 10,
        marginTop: 100,
      }}
    >
      <CreditCardInput
        autoFocus
        requiresName
        requiresCVC
        cardScale={Math.abs(Dimensions.get('window').width - 20) / 300}
        cardFontFamily={AppFonts.semiBold}
        labelStyle={{
          fontFamily: AppFonts.regular,
        }}
        inputStyle={{
          fontFamily: AppFonts.regular,
        }}
        onChange={(form) => {
          setForm(form)
          setCardState((prev) => ({
            ...prev,
            cardNumber: form.values.number,
            cvv: form.values.cvc,
            expiredDate: moment(form.values.expiry, 'MM/YY').toDate(),
            name: form.values.name,
            type: form.values.type,
          }))
        }}
        allowScroll
        placeholders={{
          number: card.cardNumber,
          expiry: moment(card.expiredDate).format('MM/YY'),
          cvc: card.cvv,
          name: card.name,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.primary,
          paddingVertical: 16,
          borderRadius: 6,
          elevation: 5,
          opacity: status === State.LOADING ? 0.5 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handlePressAddCard}
        disabled={status === State.LOADING}
      >
        {status === State.LOADING && <ActivityIndicator />}
        {status === State.IDLE && (
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
              textAlign: 'center',
            }}
          >
            Update
          </Text>
        )}
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.primary} />
    </View>
  )
}

export default EditCard

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
    borderRadius: 6,
  },
})
