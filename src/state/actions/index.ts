import { ActionType } from '../action-types'
import { CellTypes } from '../cell'

interface DeleteCellAction {
  type: ActionType.DELETE_CELL
  payload: {
    id: string
  }
}

interface MoveCellAction {
  type: ActionType.MOVE_CELL
  payload: {
    id: string
    direction: CellTypes
  }
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE
  payload: {
    id: string
    type: 'code' | 'text'
  }
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL
  payload: {
    id: string
    contents: string
  }
}

export type Action =
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | MoveCellAction
