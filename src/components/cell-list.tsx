import './cell-list.css'
import { Fragment } from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import AddCell from './add-cell'
import CellListItem from './cell-list-item'

const CellList: React.FC = () => {
  // const cells = useTypedSelector(({ cells: { data, order } }) =>
  //   order.map((id) => data[id])
  // )

  const { data, order } = useTypedSelector((state) => state.cells)

  const cells = order.map((id) => data[id])
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  )
}

export default CellList 
