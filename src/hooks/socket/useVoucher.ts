import { IVoucher } from '@schema/User/Voucher'
import useSocket from './useSocket'
import React from 'react'

export default function useVoucher() {
  const [vouchers, setVouchers] = React.useState<IVoucher[]>([])
  const [error, setError] = React.useState(null)
  useSocket((socket) => {
    socket.on('new-voucher-list', (data) => {
      setVouchers(data.data)
    })
    socket.emit('view-new-voucher', { num: 100 })
    socket.on('error', (err) => {
      setError(err)
    })
  }, [])

  function getVoucherById(id: string) {
    return vouchers.find((voucher) => voucher._id === id)
  }

  return { vouchers, isError: error !== null, error, getVoucherById }
}
