import { RootState } from '@store/index'

export const selectCards = (state: RootState) => state.card.cards
export const selectCard = (state: RootState, card_id: string) =>
  state.card.cards.data.find((card) => card._id === card_id)
export const selectDefaultCard = (state: RootState) => state.card.defaultCard
