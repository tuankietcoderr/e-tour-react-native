import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Ticket } from '@schema/User/Ticket'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { AppColors } from '@assets/themes/colors'
import useChat from '@hooks/socket/useChat'
import { IChat } from '@schema/User/Chat'
import { TouchableOpacity } from 'react-native'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { ROUTES } from '@constants/route'
import { UserContext } from '@context/UserContext'
import Toast from 'react-native-root-toast'
import moment from 'moment'

type ParamList = {
  ContactSupportRoomParams: {
    ticket: Ticket
  }
}

const ContactSupportRoom = ({ navigation }: NativeStackScreenProps<any>) => {
  const { ticket } = useRoute<RouteProp<ParamList, 'ContactSupportRoomParams'>>().params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Contact support for ' + ticket.tourId.name,
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
    })
  }, [])
  const { createChat, room, isError } = useChat()
  const { user } = React.useContext(UserContext)
  React.useEffect(() => {
    if (isError) {
      Toast.show('Error when creating chat room', {
        position: Toast.positions.CENTER,
        backgroundColor: AppColors.red,
      })
    }
  }, [isError])

  const [triggerCreate, setTriggerCreate] = React.useState(false)
  React.useEffect(() => {
    if (triggerCreate) {
      createChat({
        routeId: ticket.tourId.touristRoute?._id as string,
        userId: user?._id as string,
      })
      setTriggerCreate(false)
    }
  }, [triggerCreate])
  React.useEffect(() => {
    if (ticket.tourId.touristRoute) {
      if (room === undefined) {
        setTriggerCreate(true)
      }
    } else {
      Toast.show('Error when retrieve chat. Please report us.', {
        position: Toast.positions.CENTER,
        backgroundColor: AppColors.red,
      })
    }
  }, [room])

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: AppColors.white,
          borderBottomColor: AppColors.gray,
          borderBottomWidth: 0.5,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.bold,
            fontSize: AppFontSizes.body,
          }}
        >
          Current chat
        </Text>
      </View>
      {room ? (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderColor: AppColors.gray,
              }}
            />
          )}
          //   contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.body,
                textAlign: 'center',
                color: AppColors.gray,
                marginTop: 20,
              }}
            >
              No chat room found.{'\n'}Create new chat room to contact support
            </Text>
          )}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          data={[room]}
          renderItem={({ item }) => <ChatItem {...item} />}
          keyExtractor={(item) => item._id as string}
        />
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </View>
  )
}

export default ContactSupportRoom

const ChatItem = (item: IChat) => {
  const navigation = useNavigation<any>()
  const handleOnPress = () => {
    navigation.navigate(ROUTES.CONTACT_SUPPORT, { chatRoomId: item._id })
  }
  const { lastMessage } = useChat(item._id as string)
  const { user } = React.useContext(UserContext)
  const isUserMessage = lastMessage?.uid === user?._id
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        padding: 20,
      }}
      onPress={handleOnPress}
    >
      <Text
        style={{
          fontFamily: AppFonts.semiBold,
        }}
      >
        Staff ID: {item.staffId.slice(0, 6).toUpperCase()}
      </Text>
      {lastMessage && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: AppFonts.regular,
              color: AppColors.gray,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
              }}
            >
              {isUserMessage ? 'You: ' : 'Staff: '}
            </Text>
            {lastMessage?.content || 'No message yet'}
          </Text>
          <Text
            style={{
              fontFamily: AppFonts.regular,
              color: AppColors.gray,
              fontSize: AppFontSizes.small,
            }}
          >
            {moment(lastMessage?.createdAt).fromNow()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}
