import { AuthenticationType, UserType } from '@schema/Credential'
import { User } from '@schema/User/User'
import * as React from 'react'

export const SignUpContext = React.createContext({
  signUpForm: {} as User,
  setSignUpForm: (form: User) => {},
})

export const SignUpProvider = (props: any) => {
  const [signUpForm, setSignUpForm] = React.useState<User>({
    _id: '',
    email: '',
    address: '',
    credential: {
      authenticationType: AuthenticationType.PASSWORD,
      userType: UserType.CLIENT,
      password: '',
      username: '',
      accessToken: '',
      refreshToken: '',
    },
    fullName: '',
    identity: '',
    phoneNumber: '',
    identityExpiredAt: new Date(),
    image: '',
    isEmailVerified: false,
    isPhoneVerified: false,
    isForeigner: false,
  })
  const value = {
    signUpForm,
    setSignUpForm,
  }
  return <SignUpContext.Provider value={value}>{props.children}</SignUpContext.Provider>
}
