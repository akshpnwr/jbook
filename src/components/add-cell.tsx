import './add-cell.css'
import { useAction } from '../hooks/use-actions'

interface AddCellProps {
  previousCellId: string | null
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useAction()

  const addCellClass = forceVisible ? 'add-cell forceVisible' : 'add-cell'

  return (
    <div className={addCellClass}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"> </div>
    </div>
  )
}

export default AddCell
