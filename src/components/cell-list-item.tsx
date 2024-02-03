import { Cell } from '../state'
import CodeCell from './code-cell'
import TextEditor from './text-editor'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      {cell.type === 'code' && <CodeCell cell={cell} />}
      {cell.type === 'text' && <TextEditor cell={cell} />}
    </div>
  )
}

export default CellListItem
