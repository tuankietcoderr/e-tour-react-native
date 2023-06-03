import BottomTabs from '@components/BottomTabs'
import TopBar from '@components/TopBar'
import { UserContext } from '@context/UserContext'
import useGoogleSignIn from '@hooks/services/useGoogleSignIn'
import useUserInformation from '@hooks/socket/useUserInformation'
import { getAllUserCardsThunk, getDefaultCardThunk } from '@store/features/card/thunk'
import {
  getCurrentLocationThunk,
  getLocationPermissionThunk,
  getNotificationPermissionThunk,
} from '@store/features/global/thunk'
import { getAllSavedToursThunk, getAllSavedVouchersThunk } from '@store/features/saved/thunk'
import { useAppDispatch } from '@store/hooks'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AppProvider = () => {
  const { setUser } = React.useContext(UserContext)
  const { token } = useGoogleSignIn()
  const { data } = useUserInformation([token])
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    setUser(data)
    dispatch(getAllUserCardsThunk())
    dispatch(getDefaultCardThunk())
    dispatch(getAllSavedToursThunk())
    dispatch(getAllSavedVouchersThunk())
    dispatch(getNotificationPermissionThunk())
    dispatch(getLocationPermissionThunk()).then((res) => {
      if (res) {
        dispatch(getCurrentLocationThunk())
      }
    })
  }, [data, token])

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
        }}
      >
        <TopBar />
        <BottomTabs />
      </View>
    </SafeAreaView>
  )
}

export default AppProvider