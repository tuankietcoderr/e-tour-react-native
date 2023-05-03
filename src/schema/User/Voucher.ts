import { Company } from '@schema/Company/Company'

export enum VoucherType {
  DISCOUNT = 'discount',
  FREE = 'free',
  NORMAL = 'normal',
}

export interface IVoucher {
  _id?: string
  name: string
  companyId: string | Company
  expiredAt: Date
  type: VoucherType
  description: string
  image?: string
  usingCondition: string
  value: number
  num: number
}
