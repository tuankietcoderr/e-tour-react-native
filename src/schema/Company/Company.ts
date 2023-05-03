import { IFollower } from '@schema/User/Notification'

export interface Company {
  _id?: any
  isApproveToActive: boolean
  name: string
  email: string
  description: string
  image?: string
  previewImages?: string[]
  address: string
  phone: string
  createdAt?: Date
  updatedAt?: Date
  followers?: IFollower[] | IFollower
  followerNum?: number
  isFollowing?: boolean
}
