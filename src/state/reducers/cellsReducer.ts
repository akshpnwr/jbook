import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

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
const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      return state
    case ActionType.MOVE_CELL:
      return state
    case ActionType.UPDATE_CELL:
      return state
    case ActionType.INSERT_CELL_BEFORE:
      return state
    default:
      return state
  }
}

export default reducer
