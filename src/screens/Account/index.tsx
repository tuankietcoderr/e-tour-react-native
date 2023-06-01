import { AppColors } from '@assets/themes/colors'
import {
  BugIcon,
  HeadphoneIcon,
  SettingIcon,
  SwitchIcon,
  TicketIcon,
} from '@assets/themes/icons/outline'
import CreditCard from '@assets/themes/icons/outline/CreditCardIcon'
import LinkCard, { ILinkCard } from '@components/LinkCard'
import UserCard from '@components/UserCard'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import useSocketManager from '@hooks/socket/useSocketManager'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { signOut } from '@services/auth'
import { removeToken } from '@store/features/auth'
import { clearCards } from '@store/features/card'
import { clearSaved } from '@store/features/saved'
import { useAppDispatch } from '@store/hooks'
import React from 'react'
import { Alert, ScrollView, View, Text, Linking, Platform } from 'react-native'
import Toast from 'react-native-root-toast'

const Account = ({ navigation }: NativeStackScreenProps<any>) => {
  const sections: ILinkCard[] = [
    {
      title: 'My cards',
      subtitle: 'Manage your card',
      icon: <CreditCard viewBox="0 0 20 20" width={24} height={24} />,
      onPress: () => navigation.navigate(ROUTES.CARDS),
    },
    {
      title: 'My vouchers',
      subtitle: 'Manage your vouchers',
      icon: <TicketIcon viewBox="0 0 20 20" width={24} height={24} />,
      onPress: () => navigation.navigate(ROUTES.MY_VOUCHER),
    },
    // {
    //   title: 'Settings',
    //   subtitle: 'Customize your experiences',
    //   icon: <SettingIcon viewBox="0 0 20 20" width={24} height={24} />,
    //   onPress: () => navigation.navigate(ROUTES.SETTINGS),
    // },
    {
      title: 'Report an issue',
      subtitle: 'Help us improve your experiences',
      icon: <BugIcon viewBox="0 0 20 20" width={24} height={24} />,
      onPress: () => navigation.navigate(ROUTES.REPORT_ISSUE),
    },
    {
      title: 'Contact support',
      subtitle: "We're here to help",
      icon: <HeadphoneIcon viewBox="0 0 20 20" width={24} height={24} />,
      onPress: support,
    },
    {
      title: (
        <Text
          style={{
            color: AppColors.red,
          }}
        >
          Logout
        </Text>
      ),
      icon: <SwitchIcon viewBox="0 0 20 20" width={24} height={24} color={AppColors.red} />,
      onPress: handleSignOut,
    },
  ]
  const { setUser } = React.useContext(UserContext)
  const { disconnect } = useSocketManager()
  const dispatch = useAppDispatch()
  function handleSignOut() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await doSignOut()
              .then(() => {
                disconnect()
                dispatch(clearCards())
                dispatch(clearSaved())
              })
              .catch((err) => {
                Toast.show('Error', {
                  position: Toast.positions.BOTTOM,
                  backgroundColor: AppColors.red,
                })
              })
          },
        },
      ],
      { cancelable: false }
    )
    async function doSignOut() {
      await signOut()
        .then(() => {
          navigation.navigate(ROUTES.ONBOARDING)
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.ONBOARDING }],
          })
          setUser(null)
        })
        .catch((err) => {
          Alert.alert('Error', err.response.data.message)
        })
    }
  }

  const phone = '0348071412'
  function support() {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`)
    } else {
      Linking.openURL(`telprompt:${phone}`)
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
          gap: 12,
        }}
      >
        <UserCard navigation={navigation} />
        {sections.map((section) => (
          <LinkCard
            showBorder
            key={section.title as string}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            onPress={section.onPress}
            showShadow={false}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default Account
