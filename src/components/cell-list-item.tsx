import { Cell } from '../state'
import CodeCell from './code-cell'
import TextEditor from './text-editor'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell: { type } }) => {
  return (
    <div>
      {type === 'code' && <CodeCell />}
      {type === 'text' && <TextEditor />}
    </div>
  )
}

export default CellListItem
