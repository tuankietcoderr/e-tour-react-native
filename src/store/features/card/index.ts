import { State } from '@constants/state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreditCard } from '@schema/User/Card'
import { getAllUserCards } from '@services/card'
import {
  addNewCardThunk,
  changeDefaultCardThunk,
  deleteCardThunk,
  getAllUserCardsThunk,
  getDefaultCardThunk,
  updateCardThunk,
} from './thunk'

interface ICard {
  cards: {
    status: State
    data: CreditCard[]
  }
  defaultCard?: {
    status: State
    data?: CreditCard
  }
}

const initialState: ICard = {
  cards: {
    status: State.IDLE,
    data: [],
  },
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearCards: (state) => {
      state.cards = {
        status: State.IDLE,
        data: [],
      }
      state.defaultCard = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserCardsThunk.pending, (state) => {
        state.cards = {
          ...state.cards,
          status: State.LOADING,
        }
      })
      .addCase(getAllUserCardsThunk.fulfilled, (state, action) => {
        state.cards = {
          status: State.IDLE,
          data: action.payload,
        }
      })
      .addCase(getAllUserCardsThunk.rejected, (state) => {
        state.cards = {
          ...state.cards,
          status: State.IDLE,
        }
      })

    builder
      .addCase(addNewCardThunk.pending, (state) => {
        state.cards = {
          ...state.cards,
          status: State.LOADING,
        }
      })
      .addCase(addNewCardThunk.fulfilled, (state, action) => {
        state.cards.data.push(action.payload)
        state.cards = {
          status: State.IDLE,
          data: state.cards.data,
        }
      })
      .addCase(addNewCardThunk.rejected, (state) => {
        state.cards = {
          ...state.cards,
          status: State.IDLE,
        }
      })

    builder
      .addCase(updateCardThunk.pending, (state) => {
        state.cards = {
          ...state.cards,
          status: State.LOADING,
        }
      })
      .addCase(updateCardThunk.fulfilled, (state, action) => {
        if (state.defaultCard?.data?._id === action.payload._id) {
          state.defaultCard = {
            status: State.IDLE,
            data: {
              isDefault: true,
              ...action.payload,
            },
          }
        }
        state.cards = {
          status: State.IDLE,
          data: state.cards.data.map((card) => {
            if (card._id === action.payload._id) {
              return action.payload
            }
            return card
          }),
        }
      })
      .addCase(updateCardThunk.rejected, (state) => {
        state.cards = {
          ...state.cards,
          status: State.IDLE,
        }
      })

    builder
      .addCase(deleteCardThunk.pending, (state) => {
        state.cards = {
          ...state.cards,
          status: State.LOADING,
        }
      })
      .addCase(deleteCardThunk.fulfilled, (state, action) => {
        state.cards = {
          status: State.IDLE,
          data: state.cards.data.filter((card) => card._id !== action.payload.cardId) || [],
        }
        if (state.defaultCard?.data?._id === action.payload._id) {
          state.defaultCard = undefined
        }
      })
      .addCase(deleteCardThunk.rejected, (state) => {
        state.cards = {
          ...state.cards,
          status: State.IDLE,
        }
      })

    builder
      .addCase(getDefaultCardThunk.pending, (state) => {
        state.defaultCard = {
          ...state.defaultCard,
          status: State.LOADING,
        }
      })
      .addCase(getDefaultCardThunk.fulfilled, (state, action) => {
        state.defaultCard = {
          status: State.IDLE,
          data: action.payload,
        }
      })
      .addCase(getDefaultCardThunk.rejected, (state) => {
        state.defaultCard = {
          ...state.defaultCard,
          status: State.IDLE,
        }
      })

    builder
      .addCase(changeDefaultCardThunk.pending, (state) => {
        state.defaultCard = {
          ...state.defaultCard,
          status: State.LOADING,
        }
      })
      .addCase(changeDefaultCardThunk.fulfilled, (state, action) => {
        state.defaultCard = {
          status: State.IDLE,
          data: {
            isDefault: true,
            ...action.payload,
          },
        }
        state.cards = {
          ...state.cards,
          data: state.cards.data.map((card) => {
            if (card._id === action.payload._id) {
              return {
                ...card,
                isDefault: true,
              }
            }
            return {
              ...card,
              isDefault: false,
            }
          }),
        }
      })
      .addCase(changeDefaultCardThunk.rejected, (state) => {
        state.defaultCard = {
          ...state.defaultCard,
          status: State.IDLE,
        }
      })
  },
})

export default cardSlice.reducer

export const { clearCards } = cardSlice.actions
