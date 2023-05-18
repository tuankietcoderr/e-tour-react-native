import { COMMON } from '@constants/common'
import useUserInformation from '@hooks/socket/useUserInformation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthenticationType, UserType } from '@schema/Credential'
import { ITicketVisitor } from '@schema/User/Ticket'
import { User } from '@schema/User/User'
import * as React from 'react'

export const UserContext = React.createContext({
  user: {} as User | null,
  setUser: (user: User | null) => {},
  visitors: [] as ITicketVisitor[],
  setVisitors: (visitors: ITicketVisitor[]) => {},
  information: {} as ITicketVisitor | null,
  setInformation: (information: ITicketVisitor | null) => {},
  specialRequest: {} as string,
  setSpecialRequest: (specialRequest: string) => {},
  pickupLocation: {} as string,
  setPickupLocation: (pickupLocation: string) => {},
  token: {} as string,
  setToken: (token: string) => {},
})

export const UserContextProvider = (props: any) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [information, setInformation] = React.useState<ITicketVisitor | null>(null)
  const [visitors, setVisitors] = React.useState<ITicketVisitor[]>([])
  const [specialRequest, setSpecialRequest] = React.useState<string>('')
  const [pickupLocation, setPickupLocation] = React.useState<string>('')
  const [token, setToken] = React.useState<string>('')

  React.useEffect(() => {
    setInformation((prev) => ({
      ...prev,
      name: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.email || '',
    }))
    ;(async () => {
      const token = await AsyncStorage.getItem(COMMON.ACCESS_TOKEN)
      setToken(token || '')
    })()
  }, [user])

  const value = {
    user,
    setUser,
    visitors,
    setVisitors,
    information,
    setInformation,
    specialRequest,
    setSpecialRequest,
    pickupLocation,
    setPickupLocation,
    token,
    setToken,
  }
  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}
