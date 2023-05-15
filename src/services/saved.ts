import { deleteRequest, getRequest, postRequest, putRequest } from '@utils/api'

const getAllSavedTours = async () => {
  try {
    const res = await getRequest('/touristRoute/saved')
    return res.data
  } catch (err) {
    throw err
  }
}

const saveTour = async (tourId: string) => {
  try {
    const res = await postRequest(`/touristRoute/saved/${tourId}`, {})
    return res.data
  } catch (err) {
    throw err
  }
}

const unsaveTour = async (tourId: string) => {
  try {
    const res = await deleteRequest(`/touristRoute/saved/${tourId}`)
    return res.data
  } catch (err) {
    throw err
  }
}

const getAllSavedVouchers = async () => {
  try {
    const res = await getRequest('/voucher/save')
    return res.data
  } catch (err) {
    throw err
  }
}

const saveVoucher = async (voucherId: string) => {
  try {
    const res = await putRequest(`/voucher/save`, { voucherId })
    return res.data
  } catch (err) {
    throw err
  }
}

const unsaveVoucher = async (voucherId: string) => {
  try {
    const res = await deleteRequest(`/voucher/save`, { data: { voucherId } })
    return res.data
  } catch (err) {
    throw err
  }
}

export { getAllSavedTours, getAllSavedVouchers, saveTour, unsaveTour, saveVoucher, unsaveVoucher }
