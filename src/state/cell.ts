export type CellTypes = 'code' | 'text'

export interface Cell {
  id: string
  type: CellTypes,
  contents: string
  //   direction?: 'up' | 'down'
}
