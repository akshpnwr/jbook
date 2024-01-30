import { Dispatch } from 'redux'
import {
  Action,
  DeleteCellAction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
} from '../actions'
import { ActionType } from '../action-types'
import { CellTypes } from '../cell'

export const updateCell = (id: string, contents: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      contents,
    },
  }
}
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id,
    },
  }
}
export const moveCell = (
  id: string,
  direction: 'up' | 'down'
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  }
}
export const insertCellBefore = (
  id: string,
  type: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type,
    },
  }
}
