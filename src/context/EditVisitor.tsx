import { ITicketVisitor } from '@schema/User/Ticket'
import React from 'react'

export const EditVisitorContext = React.createContext({
  visitors: {} as ITicketVisitor | undefined,
  setVisitors: (visitors: ITicketVisitor) => {},
})

export const EditVisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = React.useState<ITicketVisitor | undefined>()

  const value = {
    visitors,
    setVisitors,
  }

  return <EditVisitorContext.Provider value={value}>{children}</EditVisitorContext.Provider>
}
