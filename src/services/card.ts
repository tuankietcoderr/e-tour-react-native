import { CreditCard } from '@schema/User/Card'
import { deleteRequest, getRequest, postRequest, putRequest } from '@utils/api'
import moment from 'moment'

const getAllUserCards = async () => {
  try {
    const res = await getRequest('/user/card')
    return res
  } catch (err) {
    throw err
  }
}

const addNewCard = async (data: CreditCard) => {
  try {
    const res = await postRequest('/user/card', data)
    return res
  } catch (err) {
    throw err
  }
}

const updateCard = async (data: any) => {
  try {
    data.expiredDate = moment(data.expiredDate).format('YYYY-MM-DD') as string
    const id = data._id
    delete data._id
    const res = await putRequest(`/user/card/${id}`, data)
    return res.data
  } catch (err) {
    throw err
  }
}

const deleteCard = async (card_id: string) => {
  try {
    const res = await deleteRequest(`/user/card/${card_id}`)
    return res.data
  } catch (err) {
    throw err
  }
}

const getDefaultCard = async () => {
  try {
    const res = await getRequest(`/user/card/default`)
    if (res.data) return res.data
    throw new Error('No default card found')
  } catch (err) {
    throw err
  }
}

const changeDefaultCard = async (card_id: string) => {
  try {
    const res = await putRequest(`/user/card/default`, { cardId: card_id })
    return res.data
  } catch (err) {
    throw err
  }
}

export { getAllUserCards, addNewCard, updateCard, deleteCard, getDefaultCard, changeDefaultCard }
