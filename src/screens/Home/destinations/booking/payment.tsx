import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import BookingStep, { steps } from '@components/BookingStep'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import Line from '@components/Line'
import { CreditCardIcon, TicketIcon } from '@assets/themes/icons/outline'
import MoneyIcon from '@assets/themes/icons/outline/MoneyIcon'
import { ROUTES } from '@constants/route'
import { Tour } from '@schema/Company/Tour'
import { RouteProp, useRoute } from '@react-navigation/core'
import { toDot } from '@lib/converter'
import { UserContext } from '@context/UserContext'
import useTicket from '@hooks/socket/useTicket'
import Toast from 'react-native-root-toast'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectDefaultCard } from '@store/features/card/selector'
import DefaultCard from '@components/DefaultCard'
import { CreditCard } from '@schema/User/Card'
import CardView from '@components/CardView'
import { selectSavedVouchers } from '@store/features/saved/selector'
import { IVoucher } from '@schema/User/Voucher'
import { unsaveVoucherThunk } from '@store/features/saved/thunk'

type PaymentMethod = 'direct' | 'credit'

type ParamList = {
  Payment: {
    tour: Tour
    quantity: number
  }
}

const Payment = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'Payment'>>().params
  const { tour, quantity } = params
  const { information, visitors, specialRequest } = React.useContext(UserContext)
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Payment',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
      headerShadowVisible: false,
    })
  }, [])
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('direct')

  const handleOnPressChangeCreditCard = () => {
    navigation.navigate(ROUTES.TICKET_CHOOSE_CREDIT_CARD, {
      setNewCard: (card: CreditCard) => handleChangeCard(card),
      currentCardId: card?._id,
    })
  }
  const { bookTicket, data, isError, error } = useTicket()

  React.useEffect(() => {
    if (isError) {
      Toast.show((error as any).message, {
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.error,
      })
    }
    if (data) {
      console.log({ data })
    }
  }, [isError])

  const defaultCard = useAppSelector(selectDefaultCard)

  const [card, setCard] = React.useState<CreditCard | undefined>(defaultCard?.data)
  const handleChangeCard = (newCard: CreditCard) => {
    setCard(newCard)
  }
  const renderCard = React.useCallback(() => {
    if (card === undefined) {
      return (
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            textAlign: 'center',
            marginVertical: 20,
          }}
        >
          You have no card
        </Text>
      )
    }
    if (card?._id === defaultCard?.data?._id) {
      return <DefaultCard />
    }
    return <CardView {...card} />
  }, [card])

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if (data) {
      Toast.show('Book ticket successfully', {
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.success,
      })
      Promise.all([
        chosenVouchers.map((v) => {
          return dispatch(unsaveVoucherThunk(v._id as string))
        }),
      ])
      navigation.navigate(ROUTES.TICKET_PAYMENT_CONFIRM, {
        bookingResult: data,
        vouchers: chosenVouchers,
        tour,
        quantity,
      })
    }
  }, [data])

  const { data: savedVouchers } = useAppSelector(selectSavedVouchers)

  const handleOnPressPay = () => {
    bookTicket({
      ticketInfo: {
        fullName: information?.name,
        phoneNumber: information?.phoneNumber,
        pickupLocation: '',
        specialRequirement: specialRequest,
        tourId: tour._id,
        visitors,
      },
      voucherIds: chosenVouchers.map((v) => v._id),
    })
  }
  const [chosenVouchers, setChosenVouchers] = React.useState<IVoucher[]>([])

  const handlePickVoucher = (newVouchers: IVoucher[]) => {
    setChosenVouchers(newVouchers)
  }

  const handleChooseVoucher = () => {
    navigation.navigate(ROUTES.CHOOSE_VOUCHER, {
      pickVouchers: (v: IVoucher[]) => handlePickVoucher(v),
      currentPickedVouchers: chosenVouchers,
    })
  }
  return (
    <ScrollView>
      <View>
        <View
          style={{
            backgroundColor: AppColors.lightRed,
            paddingVertical: 20,
          }}
        >
          <BookingStep steps={steps} currentStep={1} stepsToShow={[0, 1, 2]} />
        </View>
        <View
          style={{
            padding: 20,
            gap: 16,
          }}
        >
          <View
            style={{
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.normal,
              }}
            >
              Choose payment method
            </Text>
            <View
              style={{
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.white,
                  paddingVertical: 16,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => setPaymentMethod('direct')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <MoneyIcon viewBox="0 0 10 10" width={20} height={20} />
                  <Text
                    style={{
                      fontFamily: AppFonts.semiBold,
                      fontSize: AppFontSizes.normal,
                    }}
                  >
                    Directly
                  </Text>
                </View>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor:
                      paymentMethod === 'direct' ? AppColors.lightRed : AppColors.white,
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: AppColors.white,
                  paddingVertical: 16,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => setPaymentMethod('credit')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <CreditCardIcon viewBox="0 0 20 20" width={20} height={20} />
                  <Text
                    style={{
                      fontFamily: AppFonts.semiBold,
                      fontSize: AppFontSizes.normal,
                    }}
                  >
                    Credit card
                  </Text>
                </View>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor:
                      paymentMethod === 'credit' ? AppColors.lightRed : AppColors.white,
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                display: paymentMethod === 'credit' ? 'flex' : 'none',
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Chosen
              </Text>
              <TouchableOpacity onPress={handleOnPressChangeCreditCard}>
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                    color: AppColors.secondary,
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            {paymentMethod === 'credit' && <View>{renderCard()}</View>}
            <View
              style={{
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Additional choices
              </Text>
              <View
                style={{
                  backgroundColor: AppColors.white,
                  borderRadius: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <TicketIcon viewBox="0 0 20 20" width={16} height={16} />
                    <Text
                      style={{
                        fontFamily: AppFonts.semiBold,
                        fontSize: AppFontSizes.body,
                      }}
                    >
                      Discount
                    </Text>
                  </View>
                  <TouchableOpacity onPress={handleChooseVoucher}>
                    <Text
                      style={{
                        fontFamily: AppFonts.semiBold,
                        fontSize: AppFontSizes.normal,
                        color: AppColors.secondary,
                      }}
                    >
                      Choose
                    </Text>
                  </TouchableOpacity>
                </View>
                <Line />
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      color: AppColors.gray,
                    }}
                  >
                    You have {savedVouchers.length} available discount
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    gap: 10,
                  }}
                >
                  {chosenVouchers.length !== 0 && (
                    <Text
                      style={{
                        fontFamily: AppFonts.bold,
                        color: AppColors.secondary,
                      }}
                    >
                      Chosen
                    </Text>
                  )}
                  {chosenVouchers.map((v) => (
                    <View
                      key={v._id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: AppFonts.semiBold,
                        }}
                      >
                        {v.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: AppFonts.semiBold,
                          color: AppColors.secondary,
                        }}
                      >
                        {v.value ? `${v.value * 100}%` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: AppColors.white,
                  borderRadius: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      fontSize: AppFontSizes.normal,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: AppFonts.extraBold,
                      fontSize: AppFontSizes.medium,
                    }}
                  >
                    VND {toDot(quantity * (tour.price || 0))}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: AppFonts.regular,
                      color: AppColors.gray,
                    }}
                  >
                    {tour.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: AppFonts.semiBold,
                    }}
                  >
                    VND {toDot(tour.price || 0)}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors.secondary,
                paddingVertical: 16,
                borderRadius: 6,
                alignItems: 'center',
              }}
              onPress={handleOnPressPay}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  color: AppColors.white,
                }}
              >
                Pay
              </Text>
            </TouchableOpacity>
          </View>
          <StatusBar backgroundColor={AppColors.lightRed} />
        </View>
      </View>
    </ScrollView>
  )
}

export default Payment
