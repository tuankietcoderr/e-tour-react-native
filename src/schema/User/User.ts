import { Credential } from '../Credential'

export interface User {
  _id?: any
  fullName?: string
  identity?: string
  isForeigner?: boolean
  email?: string
  image?: string
  address?: string
  phoneNumber?: string
  identityExpiredAt?: Date
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
  credential?: Credential
  createdAt?: Date
}
