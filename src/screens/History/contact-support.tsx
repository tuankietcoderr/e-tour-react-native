import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableHighlight,
  useWindowDimensions,
  ScrollView,
  Animated,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native'
import React, { memo } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { Ticket } from '@schema/User/Ticket'
import { RouteProp, useRoute } from '@react-navigation/core'
import { TextInput } from 'react-native'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'
import useChat from '@hooks/socket/useChat'
import { IChat, IChatItem } from '@schema/User/Chat'
import { UserContext } from '@context/UserContext'
import CheckedIcon from '@assets/themes/icons/outline/CheckedIcon'
import { User } from '@schema/User/User'

type ParamList = {
  ContactSupportParams: {
    chatRoomId: string
  }
}

const ContactSupport = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Staff',
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
    })
  }, [])
  const params = useRoute<RouteProp<ParamList, 'ContactSupportParams'>>().params
  const { chatRoomId } = params
  const { isError, sendMessage, error, messages } = useChat(chatRoomId)
  const { user } = React.useContext(UserContext)
  const flatListRef = React.useRef<FlatList<IChatItem>>(null)
  React.useEffect(() => {
    if (isError) {
    }
    if (messages !== undefined) {
      setMessagesState(messages || [])
    }
  }, [messages, isError])

  const [messagesState, setMessagesState] = React.useState<IChatItem[] | undefined>(undefined)
  const [message, setMessage] = React.useState<IChatItem>({
    uid: user?._id,
    content: '',
  })

  React.useEffect(() => {
    if (messagesState && messagesState.length > 0) {
      flatListRef.current?.scrollToEnd()
    }
  }, [messagesState, message])

  const handleOnPressSend = () => {
    if (message?.content === '') {
      return
    }
    setMessage((prev) => ({ ...prev, content: '' }))
    setMessagesState((prev) => [...(prev as IChatItem[]), message])

    sendMessage({
      chatRoomId,
      content: message.content,
    })
  }

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
      }}
    >
      <Chats
        flatListRef={flatListRef}
        messages={messages}
        messagesState={messagesState}
        user={user}
      />
      {messages && (
        <View
          style={{
            padding: 20,
            backgroundColor: AppColors.white,
            flexDirection: 'row',
            gap: 6,
            alignSelf: 'flex-end',
          }}
        >
          <TextInput
            style={{
              fontFamily: AppFonts.regular,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: AppColors.gray,
              padding: 10,
              flex: 5,
              minHeight: 40,
            }}
            value={message.content}
            onChangeText={(text) => setMessage((prev) => ({ ...prev, content: text }))}
            placeholder="Enter your message here..."
            multiline
            maxLength={300}
          />
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.blue,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              flex: 1,
              borderRadius: 6,
              maxHeight: 48,
              minHeight: 48,
              alignSelf: 'center',
              opacity: message.content !== '' ? 1 : 0.5,
            }}
            disabled={message.content === ''}
            onPress={message.content !== '' ? handleOnPressSend : () => {}}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                color: AppColors.white,
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor={AppColors.blue} />
    </View>
  )
}

export default ContactSupport

const Chats = memo(
  ({
    messagesState,
    flatListRef,
    messages,
    user,
  }: {
    messagesState: IChatItem[] | undefined
    flatListRef: React.RefObject<FlatList<IChatItem>>
    messages: IChatItem[] | undefined
    user: User | null
  }) => {
    const renderItem = React.useCallback(
      ({ item }: { item: IChatItem }) => {
        const isSent: boolean = !!messages?.find((m) => m._id === item._id)
        const isUserMessage: boolean = user?._id === item.uid
        return (
          <View
            style={{
              marginVertical: 4,
              marginRight: isUserMessage ? 10 : 0,
              marginLeft: isUserMessage ? 0 : 10,
              alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  padding: 10,
                  borderRadius: 6,
                  borderColor: AppColors.blue,
                  borderWidth: 0.5,
                  gap: 10,
                  backgroundColor: isUserMessage ? AppColors.blue : AppColors.white,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    color: isUserMessage ? AppColors.white : AppColors.dark,
                  }}
                >
                  {item.content}
                </Text>
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
                    fontSize: AppFontSizes.small,
                    color: isUserMessage ? AppColors.white : AppColors.gray,
                  }}
                >
                  {moment(item.createdAt).format('HH:mm DD/MM/YYYY')}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      },
      [messagesState]
    )
    return (
      <>
        {messagesState ? (
          <FlatList
            ref={flatListRef}
            onContentSizeChange={() => {
              if (messagesState && messagesState.length > 0) {
                flatListRef.current?.scrollToEnd()
              }
            }}
            maxToRenderPerBatch={200}
            data={messagesState}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View style={{ height: 20 }} />}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: AppFonts.regular,
                  marginTop: 20,
                  color: AppColors.gray,
                }}
              >
                No message
              </Text>
            }
            ListFooterComponent={<View style={{ height: 30 }} />}
            renderItem={({ item }) => renderItem({ item })}
            keyExtractor={(item, index) => item?._id?.toString() + Math.random().toString()}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
      </>
    )
  }
)
