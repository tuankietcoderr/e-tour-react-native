export interface IChatItem {
  _id?: string
  uid: string
  content: string
  createdAt?: Date
}

export interface IChat {
  _id?: string
  userId: string
  staffId: string
  routeId: string
  chats: IChatItem[]
}

export interface IAutoStaffChat {
  userId: string
  routeId: string
}

export interface ISendMessage {
  chatRoomId: string
  content: string
}
