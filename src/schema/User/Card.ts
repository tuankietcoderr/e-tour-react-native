export interface CreditCard {
  _id?: string
  cardNumber: string
  name: string
  expiredDate: Date
  cvv: string
  type: string
  isDefault?: boolean
}

export interface CreditCardState {
  cvc: string
  expiry: string
  number: string
  name: string
}

export interface ICreditCard {
  cvc: string
  expiry: string
  number: string
  type: string
  name: string
}
export interface ICreditCardForm {
  status: CreditCardState
  valid: boolean
  values: ICreditCard
}
