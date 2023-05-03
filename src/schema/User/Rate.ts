import { User } from './User'

export enum RateType {
  ROUTE = 'route',
  COMPANY = 'company',
  STAFF = 'staff',
}
export interface Rate {
  _id?: any
  star: number
  description: string
  userId?: User
  rateType?: RateType
  companyId?: any
  staffId?: any
  touristsRouteId?: any
  createdAt?: Date
  updatedAt?: Date
}
