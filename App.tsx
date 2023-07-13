import { ROUTES } from '@constants/route'
import { SignUpProvider } from '@context/SignUpContext'
import { UserContextProvider } from '@context/UserContext'
import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/manrope'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddCard from '@screens/Account/cards/add-card'
import CardDetail from '@screens/Account/cards/card-detail'
import CardResult from '@screens/Account/cards/card-result'
import EditCard from '@screens/Account/cards/edit-card'
import MyCards from '@screens/Account/cards/my-cards'
import EditProfile from '@screens/Account/edit-profile'
import Notifications from '@screens/Account/notification'
import Profile from '@screens/Account/profile'
import Settings from '@screens/Account/settings'
import MyVouchers from '@screens/Account/vouchers'
import ContactSupport from '@screens/History/contact-support'
import ContactSupportRoom from '@screens/History/contact-support-room'
import HistoryTourDetail from '@screens/History/detail'
import EditVisitor from '@screens/History/edit-visitor'
import ReportTour from '@screens/History/report-tour'
import HistoryTab from '@screens/History/tab'
import VisitorsManagement from '@screens/History/visitors-management'
import ChooseCredit from '@screens/Home/destinations/booking/choose-credit'
import Confirm from '@screens/Home/destinations/booking/confirm'
import Contact from '@screens/Home/destinations/booking/contact'
import Discount from '@screens/Home/destinations/booking/discount'
import FillInformation from '@screens/Home/destinations/booking/fill-information'
import Payment from '@screens/Home/destinations/booking/payment'
import People from '@screens/Home/destinations/booking/people'
import Quantity from '@screens/Home/destinations/booking/quantity'
import RelativeTicket from '@screens/Home/destinations/booking/relative-ticket'
import SpecialRequest from '@screens/Home/destinations/booking/special-request'
import TourDetail from '@screens/Home/destinations/detail'
import DomesticDestinations from '@screens/Home/destinations/domestic'
import InternationalDestinations from '@screens/Home/destinations/international'
import RateTour from '@screens/Home/destinations/rate'
import ForYou from '@screens/Home/for-you'
import HotVouchers from '@screens/Home/hot-voucher'
import Popular from '@screens/Home/popular'
import AppProvider from '@screens/Init/AppProvider'
import Onboarding from '@screens/Init/Onboarding'
import Signin from '@screens/Init/Signin'
import SignUp from '@screens/Init/Signup'
import NextSignUp from '@screens/Init/Signup/next'
import SavedTours from '@screens/Saved/tours'
import SavedVouchers from '@screens/Saved/vouchers'
import 'expo-dev-client'
import * as SplashScreen from 'expo-splash-screen'
import registerNNPushToken from 'native-notify'
import React from 'react'
import { StyleSheet } from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import GoogleService from './android/app/google-services.json'
import { store } from './src/store'

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import ChooseVoucher from '@screens/Account/vouchers/choose-voucher'
import VoucherDetail from '@screens/Account/vouchers/detail'
import CompanyDetail from '@screens/Company/detail'
import SignupGoogle from '@screens/Init/Signup/signup-google'
import Map from '@screens/Map'
import ReportIssue from '@screens/Account/report-issue'
import Search from '@screens/Search'

SplashScreen.preventAutoHideAsync()

export const Stack = createNativeStackNavigator()
export default function App() {
  registerNNPushToken(8278, 'xhQlEeujCXadakfyUIlyRf')

  const [fontsLoaded] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  })

  if (!fontsLoaded) {
    return null
  } else {
    console.log('fontsLoaded')
  }

  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId: GoogleService.client[0].oauth_client[3].client_id,
  })
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <Provider store={store}>
          <SignUpProvider>
            <UserContextProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={ROUTES.ONBOARDING}
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  {/** Init **/}
                  <>
                    <Stack.Screen name={ROUTES.ONBOARDING} component={Onboarding} />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                      <Stack.Screen name={ROUTES.SIGNIN} component={Signin} />
                      <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
                      <Stack.Screen name={ROUTES.SIGNUP_GOOGLE} component={SignupGoogle} />
                      <Stack.Screen name={ROUTES.NEXT_SIGNUP} component={NextSignUp} />
                    </Stack.Group>
                  </>
                  {/** End Init **/}
                  {/** App **/}
                  <>
                    <Stack.Screen name={ROUTES.APP_PROVIDER} component={AppProvider} />
                    {/*** Home ***/}
                    <>
                      <Stack.Screen name={ROUTES.SEARCH} component={Search} />
                      <Stack.Screen name={ROUTES.FOR_YOU} component={ForYou} />
                      <Stack.Screen name={ROUTES.HOT_VOUCHERS} component={HotVouchers} />
                      <Stack.Screen name={ROUTES.POPULAR} component={Popular} />
                      <Stack.Screen name={ROUTES.DOMESTIC_TOURS} component={DomesticDestinations} />
                      <Stack.Screen
                        name={ROUTES.INTERNATIONAL_TOURS}
                        component={InternationalDestinations}
                      />
                      <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                          name={ROUTES.TOUR_DETAIL}
                          component={TourDetail}
                          options={{
                            headerShown: true,
                          }}
                        />
                        <Stack.Screen name={ROUTES.RELATIVE_TICKET} component={RelativeTicket} />
                        <Stack.Screen name={ROUTES.TICKET_QUANTITY} component={Quantity} />
                        <Stack.Group screenOptions={{ presentation: 'modal' }}>
                          <Stack.Screen
                            name={ROUTES.TICKET_FILL_INFO}
                            component={FillInformation}
                          />
                          <Stack.Screen name={ROUTES.TICKET_CONTACT} component={Contact} />
                          <Stack.Screen name={ROUTES.TICKET_PEOPLE} component={People} />
                          <Stack.Screen
                            name={ROUTES.TICKET_SPECIAL_REQUEST}
                            component={SpecialRequest}
                          />
                        </Stack.Group>
                        <Stack.Screen name={ROUTES.RATE_TOUR} component={RateTour} />
                        <Stack.Group
                          screenOptions={{ presentation: 'modal', headerShown: true }}
                          navigationKey="Payment"
                        >
                          <Stack.Screen name={ROUTES.TICKET_PAYMENT} component={Payment} />
                          <Stack.Screen
                            name={ROUTES.TICKET_CHOOSE_CREDIT_CARD}
                            component={ChooseCredit}
                          />
                          <Stack.Screen name={ROUTES.TICKET_DISCOUNT} component={Discount} />
                          <Stack.Screen name={ROUTES.TICKET_PAYMENT_CONFIRM} component={Confirm} />
                        </Stack.Group>
                      </Stack.Group>
                    </>
                    {/*** End Home ***/}
                    {/*** Saved ***/}
                    <>
                      <Stack.Screen name={ROUTES.SAVED_TOURS} component={SavedTours} />
                      <Stack.Screen name={ROUTES.SAVED_VOUCHERS} component={SavedVouchers} />
                      <Stack.Screen name={ROUTES.VOUCHER_DETAIL} component={VoucherDetail} />
                      <Stack.Screen name={ROUTES.CHOOSE_VOUCHER} component={ChooseVoucher} />
                    </>
                    {/*** End Saved ***/}
                    {/*** History ***/}
                    <>
                      <Stack.Screen name={ROUTES.HISTORY_TAB} component={HistoryTab} />
                      <Stack.Screen
                        name={ROUTES.VISITORS_MANAGEMENT}
                        component={VisitorsManagement}
                      />
                      <Stack.Screen name={ROUTES.REPORT_TOUR} component={ReportTour} />
                      <Stack.Screen name={ROUTES.CONTACT_SUPPORT} component={ContactSupport} />
                      <Stack.Screen
                        name={ROUTES.CONTACT_SUPPORT_ROOM}
                        component={ContactSupportRoom}
                      />
                      <Stack.Screen name={ROUTES.EDIT_VISITOR} component={EditVisitor} />
                      <Stack.Screen
                        name={ROUTES.BOOKING_HISTORY_DETAIL}
                        component={HistoryTourDetail}
                      />
                    </>
                    {/*** End History ***/}
                    {/*** Account ***/}
                    <>
                      <Stack.Screen name={ROUTES.NOTIFICATION} component={Notifications} />
                      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
                      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} />
                      <Stack.Screen name={ROUTES.CARDS} component={MyCards} />
                      <Stack.Screen name={ROUTES.ADD_CARD} component={AddCard} />
                      <Stack.Screen name={ROUTES.EDIT_CARD} component={EditCard} />
                      <Stack.Screen name={ROUTES.CARD_DETAIL} component={CardDetail} />
                      <Stack.Screen name={ROUTES.CARD_RESULT} component={CardResult} />
                      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
                      <Stack.Screen name={ROUTES.MY_VOUCHER} component={MyVouchers} />
                      <Stack.Screen name={ROUTES.REPORT_ISSUE} component={ReportIssue} />
                    </>
                    {/*** End Account ***/}
                    <>
                      <Stack.Screen name={ROUTES.COMPANY_DETAIL} component={CompanyDetail} />
                    </>
                    <>
                      <Stack.Screen name={'Map'} component={Map} />
                    </>
                    {/** End App **/}
                  </>
                </Stack.Navigator>
              </NavigationContainer>
            </UserContextProvider>
          </SignUpProvider>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
