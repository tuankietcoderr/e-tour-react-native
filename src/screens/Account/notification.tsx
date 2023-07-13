import { View, Text, StatusBar, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import useNotification from '@hooks/socket/useNotification'
import NotificationCard from '@components/NotificationCard'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { Notification, NotificationNavigation, NotificationType } from '@schema/User/Notification'
import { ROUTES } from '@constants/route'
import Toast from 'react-native-root-toast'
import { getNotificationPermission } from '@utils/notification'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectNotification } from '@store/features/global/selector'
import {
  getNotificationPermissionThunk,
  requestNotificationPermissionThunk,
} from '@store/features/global/thunk'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Notifications = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Notifications',
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])

  const { data, isError, readNotification, error } = useNotification()
  const types = ['All', 'Read', 'Unread']
  const [view, setView] = React.useState(types[0])
  const [filteredData, setFilteredData] = React.useState<Notification[] | null>(data)
  React.useEffect(() => {
    if (isError) {
      Toast.show((error as any).message, {
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.error,
      })
    }
  }, [data, isError, error])
  const markAsRead = (notification: Notification, isRead: boolean) => {
    const link = notification.link?.split('-')
    const navigateTo = link?.[0] as NotificationNavigation
    const navigateId = link?.[link.length - 1].split('/').shift()
    data && !isRead && readNotification([notification._id])
    console.log(link, navigateTo, navigateId)
    switch (navigateTo) {
      case NotificationNavigation.ROUTE:
        navigation.navigate(ROUTES.TOUR_DETAIL, { route_id: navigateId })
        break
      case NotificationNavigation.VOUCHER:
        navigation.navigate(ROUTES.VOUCHER_DETAIL, { voucher_id: navigateId })
        break
      default:
        break
    }
  }

  const onViewTypeChange = (newView: string) => {
    setView(newView)
  }
  React.useEffect(() => {
    if (data) {
      switch (view) {
        case 'All':
          setFilteredData(data)
          break
        case 'Read':
          setFilteredData(data?.filter((i) => i.isRead))
          break
        case 'Unread':
          setFilteredData(data?.filter((i) => !i.isRead))
      }
    }
  }, [view, data])

  const { permissionStatus, status } = useAppSelector(selectNotification)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getNotificationPermissionThunk())
  }, [])

  const handleTurnOnNotification = () => {
    dispatch(requestNotificationPermissionThunk())
      .then((res) => {
        if (res.payload) {
          Toast.show('Notification permission is granted', {
            position: Toast.positions.BOTTOM,
            backgroundColor: AppColors.success,
          })
        }
      })
      .catch((err) => {
        Toast.show('Notification permission is not granted', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.error,
        })
      })
  }

  if (!permissionStatus) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          transform: [{ translateY: -100 }],
          gap: 20,
        }}
      >
        <MaterialCommunityIcons name="bell-cancel-outline" size={200} color={AppColors.light} />
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            textAlign: 'center',
            color: AppColors.light,
          }}
        >
          Notification permission is not granted
        </Text>
        <TouchableOpacity
          onPress={handleTurnOnNotification}
          style={{
            backgroundColor: AppColors.blue,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
            }}
          >
            Turn on notification
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        {types.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => onViewTypeChange(item)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor:
                view.toLowerCase() === item.toLowerCase() ? AppColors.blue : AppColors.white,
              borderRadius: 100,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: AppColors.blue,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: view.toLowerCase() === item.toLowerCase() ? AppColors.white : AppColors.blue,
                fontSize: AppFontSizes.body,
              }}
            >
              {item.replaceAll('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {data ? (
        <FlatList
          data={filteredData}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                textAlign: 'center',
                color: AppColors.gray,
              }}
            >
              No notification to show
            </Text>
          )}
          contentContainerStyle={{
            padding: 20,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item._id}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onPress={() => markAsRead(item, item.isRead as boolean)}
            />
          )}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      <StatusBar backgroundColor={AppColors.blue} />
    </View>
  )
}

export default Notifications
