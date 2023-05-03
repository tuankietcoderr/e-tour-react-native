import { IFollower } from '@schema/User/Notification'

export enum TouristsRouteType {
  COUNTRY = 'country',
  FOREIGN = 'foreign',
}

export interface TouristsRoute {
  _id: string
  reservationFee: number
  name: string
  description: string
  type: TouristsRouteType
  route: string[]
  images: string[]
  companyId: any
  rate: number
  num: number
  star: number
  followers: IFollower[]
}
