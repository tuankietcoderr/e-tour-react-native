import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreditCard } from '@schema/User/Card'
import {
  addNewCard,
  changeDefaultCard,
  deleteCard,
  getAllUserCards,
  getDefaultCard,
  updateCard,
} from '@services/card'

export const getAllUserCardsThunk = createAsyncThunk(
  'card/getUserCards',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllUserCards()
      return res.data
    } catch (err) {
      throw err
    }
  }
)

export const addNewCardThunk = createAsyncThunk(
  'card/addNewCard',
  async (data: CreditCard, { rejectWithValue }) => {
    try {
      const res = await addNewCard(data)
      return res.data
    } catch (err) {
      throw err
    }
  }
)

export const updateCardThunk = createAsyncThunk(
  'card/updateCard',
  async (data: CreditCard, { rejectWithValue }) => {
    try {
      const res = await updateCard(data)
      return res
    } catch (err) {
      throw err
    }
  }
)

export const deleteCardThunk = createAsyncThunk(
  'card/deleteCard',
  async (card_id: string, { rejectWithValue }) => {
    try {
      const res = await deleteCard(card_id)
      return res
    } catch (err) {
      throw err
    }
  }
)

export const getDefaultCardThunk = createAsyncThunk(
  'card/getDefaultCard',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDefaultCard()
      return res
    } catch (err) {
      throw err
    }
  }
)

export const changeDefaultCardThunk = createAsyncThunk(
  'card/changeDefaultCard',
  async (card_id: string, { rejectWithValue }) => {
    try {
      const res = await changeDefaultCard(card_id)
      return res
    } catch (err) {
      throw err
    }
  }
)
