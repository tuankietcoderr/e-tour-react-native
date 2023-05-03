import { Tour } from '@schema/Company/Tour'
import { TouristsRoute } from '@schema/Company/TouristsRoute'
import { User } from './User'
import { Rate } from './Rate'

export enum PaymentStatus {
  PENDING = 'pending',
  CHECKED_OUT = 'checked_out',
}

export interface ITicketVisitor {
  _id?: string
  name: string
  age?: number
  address?: string
  phoneNumber?: string
  request?: string
}

export interface Ticket {
  _id?: string
  userId: User
  tourId: Tour
  status: PaymentStatus
  fullName: string
  phoneNumber: string
  email: string
  visitors: ITicketVisitor[]
  specialRequirement: string
  pickupLocation: string
  price?: number
  createdAt?: Date
  updatedAt?: Date
  userRating?: {
    rate?: number
    comment?: string
  }
  totalRating?: {
    rate?: number
    num?: number
  }
  ratingComment?: Rate[]
}
