export enum AuthenticationType {
  PASSWORD = 'password',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum UserType {
  CLIENT = 'client',
  STAFF = 'staff',
}

export interface Credential {
  _id?: any
  authenticationType: AuthenticationType
  userType: UserType
  username?: string
  password?: string
  accessToken?: string
  refreshToken?: string
}
