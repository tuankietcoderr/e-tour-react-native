import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { State } from '@constants/state'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CreditCard, ICreditCardForm } from '@schema/User/Card'
import { selectCards } from '@store/features/card/selector'
import { addNewCardThunk } from '@store/features/card/thunk'
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

const AddCard = ({ navigation }: NativeStackScreenProps<any>) => {
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
      title: 'Add Card',
      headerTitleAlign: 'center',
    })
  }, [])

  const [form, setForm] = React.useState<ICreditCardForm>({
    status: {
      cvc: '',
      expiry: '',
      number: '',
      name: '',
    },
    valid: false,
    values: {
      cvc: '',
      expiry: '',
      number: '',
      type: '',
      name: '',
    },
  })

  const dispatch = useAppDispatch()
  const cardSelector = useAppSelector(selectCards)
  const status = cardSelector.status
  const handlePressAddCard = () => {
    const { valid } = form
    if (!valid) {
      Toast.show('Please enter valid card information', {
        position: Toast.positions.CENTER,
      })
      return
    }
    const { values } = form
    const { cvc, expiry, number, name, type } = values
    const card: CreditCard = {
      cardNumber: number,
      cvv: cvc,
      expiredDate: moment(expiry, 'MM/YY').toDate(),
      name: name.toUpperCase(),
      type,
    }
    dispatch(addNewCardThunk(card)).then((res) => {
      if (res.payload) {
        Toast.show('Add new card successfully', {
          position: Toast.positions.CENTER,
          backgroundColor: AppColors.success,
        })
        navigation.goBack()
      } else {
        Toast.show('Add new card failed', {
          position: Toast.positions.CENTER,
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
        onChange={setForm}
        allowScroll
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
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.primary} />
    </View>
  )
}

export default AddCard

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
