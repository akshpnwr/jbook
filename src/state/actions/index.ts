import { ActionType } from '../action-types'
import { CellTypes } from '../cell'

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL
  payload: {
    id: string
  }
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL
  payload: {
    id: string
    direction: 'up' | 'down'
  }
}

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE
  payload: {
    id: string
    type: CellTypes
  }
}

export interface UpdateCellAction {
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
