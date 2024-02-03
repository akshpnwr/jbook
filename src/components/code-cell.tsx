import React, { useEffect, useState } from 'react'
import bundle from '../bundler'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'
import { useAction } from '../hooks/use-actions'
import { Cell } from '../state'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const { updateCell } = useAction()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const output = await bundle(cell.content)
        setCode(output.code)
        setErr(output.err)
      } catch (error) {
        console.error(error)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
