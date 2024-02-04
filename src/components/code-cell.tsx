import './code-cell.css'
import React, { useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'
import { useAction } from '../hooks/use-actions'
import { Cell } from '../state'
import { useTypedSelector } from '../hooks/use-typed-selector'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])

  // Collect content of cells before current cell
  const cumulativeCode = useTypedSelector((state) => {
    const data = state.cells.data
    const order = state.cells.order

    const orderedCells = order.map((id) => data[id])

    const cumulativeCode = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content)
      }
      if (c.id === cell.id) break
    }

    return cumulativeCode
  })

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'))
      return
    }

    const timer = setTimeout(async () => {
      try {
        createBundle(cell.id, cumulativeCode.join('\n'))
      } catch (error) {
        console.error(error)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [cumulativeCode.join('\n'), cell.id])

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
