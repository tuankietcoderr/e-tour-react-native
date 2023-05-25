import { IAutoStaffChat, IChat, IChatItem, ISendMessage } from '@schema/User/Chat'
import useSocket from './useSocket'
import React from 'react'

export default function useChat(chatRoomId?: string) {
  const [messages, setMessages] = React.useState<IChatItem[] | undefined>(undefined)
  const [rooms, setRooms] = React.useState<IChat[] | undefined>(undefined)
  const [room, setRoom] = React.useState<IChat | undefined>(undefined)
  const [error, setError] = React.useState()
  const [lastMessage, setLastMessage] = React.useState<IChatItem | undefined>(undefined)
  const socket = useSocket((socket) => {
    socket.emit('view-chat-room-list', {})
    socket.on('chat-room-list', (data) => {
      setRooms(data.data)
    })
    socket.on('create-chat-result', (data) => {
      setRoom(data.data)
    })
    socket.on('create-chat-message-result', (data) => {
      setMessages(data.data.chats)
      setLastMessage(data.data.chats.slice(-1)[0])
    })
    chatRoomId && socket.emit('view-chat-message', { chatRoomId: chatRoomId })
    socket.on('chat-message-list', (data) => {
      setMessages(data.data.messages)
      setLastMessage(data.data.messages.slice(-1)[0])
    })

    socket.on('new-chat-message', (data) => {
      setMessages((messages) => {
        if (messages) {
          return [...messages, data]
        }
        return [data]
      })
      setLastMessage(data)
    })

    socket.on('error', (err) => {
      setError(err)
    })
  }, [])

  function createChat(data: IAutoStaffChat) {
    socket?.emit('create-chat', data)
  }

  function sendMessage(data: ISendMessage) {
    socket?.emit('create-chat-message', data)
  }

  return {
    createChat,
    sendMessage,
    room,
    rooms,
    messages,
    error,
    isError: !!error,
    lastMessage,
  }
}
