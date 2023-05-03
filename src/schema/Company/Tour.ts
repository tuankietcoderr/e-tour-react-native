import { TouristsRoute } from './TouristsRoute'

export enum TourType {
  NORMAL = 'normal',
  PROMOTION = 'promotion',
}

export interface Tour {
  _id?: any
  from: Date
  to: Date
  type: TourType
  image?: string
  touristRoute?: TouristsRoute
  price?: number
  name?: string
  createdAt?: Date
  updatedAt?: Date
}
