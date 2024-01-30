import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'
import { produce } from 'immer'

interface CellsState {
  data: { [key: string]: Cell }
  loading: boolean
  error: string | null
  order: string[]
}

// Initial state
const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
}

// Reducer function
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      delete state.data[action.payload]
      state.order = state.order.filter((id) => id !== action.payload)

      return
    case ActionType.MOVE_CELL:
      return state
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload
      state.data[id].content = content

      return
    case ActionType.INSERT_CELL_BEFORE:
      return state
    default:
      return state
  }
})

export default reducer
