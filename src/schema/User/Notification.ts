import { User } from './User'

export interface Notification {
  _id: string
  title?: string
  content?: string
  image?: string
  isRead?: boolean
  link?: string
  createdAt?: Date
}

export enum NotificationNavigation {
  ROUTE = 'route',
  VOUCHER = 'voucher',
}

export interface IFollower {
  user: User | string
  notificationType: NotificationType
}

export enum NotificationType {
  ALL = 'all',
  ONLY_SPECIAL = 'only-special',
  NONE = 'none',
}

export interface PushNotification {
  appId: number
  appToken: string
  title: string
  body: string
  dateSent: string
  pushData?: any
  bigPictureURL?: string
}
