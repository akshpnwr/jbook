import './cell-list.css'
import { Fragment, useEffect } from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import AddCell from './add-cell'
import CellListItem from './cell-list-item'
import { useAction } from '../hooks/use-actions'

const CellList: React.FC = () => {
  // const cells = useTypedSelector(({ cells: { data, order } }) =>
  //   order.map((id) => data[id])
  // )
  const { fetchCells } = useAction()

  useEffect(() => {
    fetchCells()
  }, [])

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
